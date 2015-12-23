// The MIT License (MIT)
// Copyright (c) 2015 rdunc <hello@ryanduncan.me>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
// whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var ElevatorController = (function() {

    /**
     * Elevator Controller Constructor.
     */
    function ElevatorController() {
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
            'floorsVisited': 0,
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
        if (floor > 10 || floor < 1) {
            console.log("[ELEVATOR]: Elevators cannot go above the tenth or below the first floor.");
            return;
        }

        console.log("[ELEVATOR]: Elevator requested on floor " + floor + ".");

        var elevatorFloor = [];
        for (var i = 0; i < this.elevators.length; i++) {
            if (!this.elevators[i].moving && !this.elevators[i].maintenanceMode) {
                elevatorFloor.push(this.elevators[i].currentFloor);
            }
        }
        // console.log(elevatorFloor);

        var findClosestElevator = closest(floor, elevatorFloor);
        var closestElevatorIndex = findIndexByKeyValue(this.elevators, "currentFloor", findClosestElevator);
        // console.log(findClosestElevator);
        // console.log(closestElevatorIndex);

        var findElevator = this.elevators[closestElevatorIndex];
        console.log(findElevator);

        if (typeof findElevator == "undefined" || findElevator.maintenanceMode) {
            // TODO: Add queue for when elevators are done delivering
            console.log("[ELEVATOR]: All elevators are busy. Cannot respond to request.");
            return;
        }

        if (!findElevator.moving && !findElevator.occupied && !findElevator.maintenanceMode) {
            findElevator.moving = true;
            findElevator.occupied = true;
            findElevator.destinationFloor = floor;

            this.moveElevator(findElevator.id, findElevator.destinationFloor);
            console.log("[ELEVATOR " + findElevator.id + "]: Has done " + findElevator.floorsVisited + " trips.");
            console.log("[ELEVATOR " + findElevator.id + "]: Dispatched to floor " + floor + ".");
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
            findElevator.doorOpen = false;
            console.log("[ELEVATOR " + findElevator.id + "]: Has closed it's doors.");
        }

        setTimeout(function() {
            do {
                if (findElevator.floorsVisited >= 5) {
                    findElevator.maintenanceMode = true;
                    console.log("[ELEVATOR " + findElevator.id + "]: Has went into maintenance mode.");
                    break;
                }

                if (findElevator.currentFloor < destinationFloor) {
                    findElevator.currentFloor++;
                    console.log("[ELEVATOR " + findElevator.id + "]: Moving up to floor " + findElevator.currentFloor + ".");
                } else {
                    findElevator.currentFloor = findElevator.currentFloor - 1;
                    console.log("[ELEVATOR " + findElevator.id + "]: Moving down to floor " + findElevator.currentFloor + ".");
                }

                sleep(findElevator.speed, function() {});
            } while (findElevator.currentFloor != destinationFloor);

            if (!findElevator.doorOpen && findElevator.currentFloor == destinationFloor) {
                findElevator.doorOpen = true;
                findElevator.moving = false;
                findElevator.occupied = false;
                findElevator.floorsVisited++;
                console.log("[ELEVATOR " + findElevator.id + "]: Has arrived at destination floor " + destinationFloor + ".");
                console.log("[ELEVATOR " + findElevator.id + "]: Has opened it's doors.");
            }
        }, 500);
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
     * This works by getting the differences between each number in the array and returns the one with
     * the least difference.
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
var elev2 = elevCtrl.createElevator(2, false);
var elev3 = elevCtrl.createElevator(3, false);
var elev4 = elevCtrl.createElevator(4, false);
var elev5 = elevCtrl.createElevator(5, false);

function testingElevator() {
    setTimeout(function() {
        var randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        elevCtrl.callElevator(randomNumber);

        testingElevator();
    }, 1000);
}

testingElevator();
