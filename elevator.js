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

    };

    return ElevatorController;
})();

var elevator1 = new ElevatorController();
console.log(elevator1);

while (true) {

}
