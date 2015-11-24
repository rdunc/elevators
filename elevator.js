var ElevatorController = (function() {

    /**
     * Elevator Controller Constructor.
     */
    function ElevatorController() {
        this.floors = [1, 2, 3, 4, 5];
        this.speed = 2000; // Elevator Speed in milliseconds
        this.currentFloor = 1;
        this.floorQueue = [];
        this.direction = "";
        this.stopped = true;
        this.occupied = false;
        this.numberOfFloors = 0; // Number of floors the elevator has been to
        this.maintenanceMode = false;
    }

    /**
     * Goes to the floor for the specified button was pressed on.
     */
    ElevatorController.prototype.goToFloor = function(floor) {
        // Find the index for the floor that we need to goto.
        var index = this.floors.indexOf(floor);
        if (index < 0) return; // Ignore invalid indexes

        // Priority check
        checkPriority(floor);

        runElevator(this);
        return this;
    };

    /**
     * Calls the elevator to the floor the button was pressed on.
     */
    ElevatorController.prototype.callElevator = function(floor) {
        // Find the index for the floor that we need to goto.
        var index = this.floors.indexOf(floor);
        if (index < 0) return; // Ignore invalid indexes

        // Priority check
        checkPriority(floor);

        runElevator(this);
        return this;
    };

    function runElevator(ctrl) {
        // Check if the queue is empty.
        if (ctrl.floorQueue.length == 0) return;

        // Since it isn't empty, we can now process the queue.
        if (ctrl.currentFloor == ctrl.floorQueue[0]) {
            fireDebug(ctrl, "arrived");
        }
    }

    function fireDebug(ctrl, event) {
        if (event === "arrived") {
            console.log(ctrl.name + " has arrived at floor " + ctrl.currentFloor);
        } else if (event === "up") {
            console.log(ctrl.name + " going up to floor " + ctrl.floorQueue[0]);
        } else if (event === "down") {
            console.log(ctrl.name + " going down to floor " + ctrl.floorQueue[0]);
        }
    }
    
    function checkPriority(floor) {
        if (this.floorQueue.length > 0) {
            // Check the direction
            if (this.direction == "up") {
                // Check if floor is before the destination floor
                if (floor >= this.currentFloor && floor <= this.floorQueue[0]) {
                    // Added floor to the beginning of the queue
                    this.floorQueue.unshift(floor);
                } else {
                    // Added floor to the end of the queue
                    this.floorQueue.push(floor);
                }
            } else if (this.direction == "down") {
                if (floor >= this.floorQueue[0] && floor <= this.currentFloor) {
                    this.floorQueue.unshift(floor);
                } else {
                    this.floorQueue.push(floor);
                }
            }
        } else {
            this.floorQueue.push(floor);
        }
    }

    return ElevatorController;
})();

var elevator1 = new ElevatorController();
console.log(elevator1);

elevator1.press(5);

// while (true) {
//     console.log(elevator1.currentFloor);
// }
