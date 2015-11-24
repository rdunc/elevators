
var ElevatorController = (function() {

    /**
     * Elevator Controller Constructor.
     */
    function ElevatorController() {
        this.floors = 10;
        this.elevators = [];
        this.floorQueue = [];

        this.elvId = 0;
    }

    /**
     * Create an elevator.
     */
    ElevatorController.prototype.createElevator = function(floor, moving) {
        elevator = {
            'id': this.elvId,
            'currentFloor': floor,
            'destinationFloor': null,
            'speed': 1000,
            'doorOpen': true,
            'direction': "",
            'moving': moving,
            'occupied': false,
            'floorsVisited': 1,
            'maintenanceMode': false
        };

        this.elevators.push(elevator);
        this.elvId++;
        return elevator;
    }

    /**
     * Function to call the elevator to the specified floor.
     */
    ElevatorController.prototype.callElevator = function(floor) {
        console.log("Floor " + floor + " requested an elevator.");

        var elevatorFloor = [];
        for (var i = 0; i < this.elevators.length; i++) {
            if (!this.elevators[i].moving) {
                elevatorFloor.push(this.elevators[i].currentFloor);
            }
        }
        // console.log(elevatorFloor);

        var findClosestElevator = closest(floor, elevatorFloor);
        var closestElevatorIndex = findIndexByKeyValue(this.elevators, "currentFloor", findClosestElevator);
        // console.log(findClosestElevator);
        // console.log(closestElevatorIndex);

        var findElevator = this.elevators[closestElevatorIndex];
        // console.log(findElevator);

        if (typeof findElevator == "undefined") {
            // TODO: Add queue for when elevators are done devlivering
            console.log("No available elevators to respond to request.");
        }

        if (!findElevator.moving && !findElevator.occupied) {
            findElevator.moving = true;
            findElevator.occupied = true;
            findElevator.destinationFloor = floor;

            this.moveElevator(findElevator.id, findElevator.destinationFloor);
            console.log("Dispatched elevator " + findElevator.id + " to floor " + floor);
        }
    }

    /**
     * Move the specified elevator to the destination floor.
     */
    ElevatorController.prototype.moveElevator = function(elevatorId, destinationFloor) {
        var findElevator = this.elevators[elevatorId];
        // console.log(findElevator);
        // console.log(destinationFloor);

        if (findElevator.doorOpen) {
            console.log("Elevator " + findElevator.id + " has closed its door");
            findElevator.doorOpen = false;
        }

        setTimeout(function() {
            do {
                if (findElevator.currentFloor < destinationFloor) {
                    findElevator.currentFloor++;
                    console.log("Elevator " + findElevator.id + " moving to floor " + findElevator.currentFloor);
                } else {
                    findElevator.currentFloor = findElevator.currentFloor - 1;
                    console.log("Elevator " + findElevator.id + " moving to floor " + findElevator.currentFloor);
                }

                console.log("Elevator " + findElevator.id + " arrived at floor " + findElevator.currentFloor);
                sleep(findElevator.speed, function() {});
            } while (findElevator.currentFloor != destinationFloor);

            if (!findElevator.doorOpen && findElevator.currentFloor == destinationFloor) {
                console.log("Elevator " + findElevator.id + " has opened its door");
                findElevator.doorOpen = true;
                findElevator.moving = false;
                findElevator.occupied = false;
            }
            // console.log(findElevator);
        }, 100);
    }

    /**
     * Basic sleep function.
     */
    function sleep(time, callback) {
        var stop = new Date().getTime();
        while(new Date().getTime() < stop + time) {
            ;
        }
        callback();
    }

    /**
     * Function to find index by key,value pair in array.
     */
    function findIndexByKeyValue(arr, key, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) {
                return i;
            }
        }
    }

    /**
     * Function to check which number in array is closest to the specified number.
     */
    function closest(num, arr) {
        var curr = arr[0];
        var diff = Math.abs(num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs(num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }

    return ElevatorController;
})();


var elevCtrl = new ElevatorController();
var elev1 = elevCtrl.createElevator(1, false);
var elev2 = elevCtrl.createElevator(9, false);


setTimeout(function() {
    elevCtrl.callElevator(7)
}, 4000);

setTimeout(function() {
    elevCtrl.callElevator(4)
}, 2000);

setTimeout(function() {
    elevCtrl.callElevator(10)
}, 1000);

setTimeout(function() {
    elevCtrl.callElevator(1)
}, 5000);

setTimeout(function() {
    elevCtrl.callElevator(5)
}, 15000);
