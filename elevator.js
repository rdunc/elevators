var ElevatorController = (function() {

    /**
     * Elevactor Controller Constructor.
     */
    function ElevatorController() {
        this.floors = [1, 2, 3, 4, 5];
        this.speed = 2000; // Elevator Speed in milliseconds
        this.currentFloor = 1;
        this.floorQueue = [];
        this.callbacks = [];
        this.maintenanceMode = false;
    }

    /**
     * Add Callback.
     */
    ElevatorController.prototype.addCallback = function(callback) {
        this.callbacks.push(callback);
        return this;
    };

    /**
     * Remove Callback.
     */
    ElevatorController.prototype.removeCallback = function(callback) {};

    /**
     * Simulate the press of the elevator button.
     */
    ElevatorController.prototype.press = function(floor) {
        // Find the index for the floor that we need to goto.
        var index = this.floors.indexOf(floor);
        if (index < 0) return; // Ignore invalid indexes

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

    return ElevatorController;
})();

var elevator1 = new ElevatorController();
console.log(elevator1);

while (true) {
    console.log(elevator1.currentFloor);
}
