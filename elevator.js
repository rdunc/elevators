var ElevatorController = (function() {

    /**
     * Elevator Controller Constructor.
     */
    function ElevatorController() {
        this.floors = [1, 2, 3, 4, 5];
        this.speed = 2000; // Elevator Speed in milliseconds
        this.currentFloor = 1;
        this.floorQueue = [];
        this.motion = 0; // -1 is downward, 0 is stopped, 1 is upward
        this.occupied = false;
        this.numberOfFloors = 0; // Number
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
        if (checkPriority(floor)) {

        }
    };

    /**
     * Calls the elevator to the floor the button was pressed on.
     */
    ElevatorController.prototype.callElevator = function(floor) {
        // Find the index for the floor that we need to goto.
        var index = this.floors.indexOf(floor);
        if (index < 0) return; // Ignore invalid indexes

        // Priority check
        if (checkPriority(floor)) {

        }

        this.floorQueue.push(index);
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

        } else if (event === "down") {

        }
    }

    function checkPriority(floor) {
        if (this.floors.length > 0) {
            // Check motion of elevator
            if (between(floor, this.currentFloor, this.floorQueue[0])) {

            }
        }
    }

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    return ElevatorController;
})();

var elevator1 = new ElevatorController();
console.log(elevator1);

elevator1.press(5);

// while (true) {
//     console.log(elevator1.currentFloor);
// }
