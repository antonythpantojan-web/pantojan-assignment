// main.js
import { EventEmitter, VehicleState, createDisplay } from './patternsModule.js';
import { registerDashboardEvents } from './eventModule.js';
import { getNextDistance } from './compositionModule.js';


const eventBus = new EventEmitter();


const speedDisplay = createDisplay('speed-display', 'km/h');
const fuelDisplay = createDisplay('fuel-display', 'L');
const distanceDisplay = createDisplay('distance-display', 'km');


speedDisplay.update(VehicleState.getSpeed());
fuelDisplay.update(VehicleState.getFuel());
distanceDisplay.update(VehicleState.getDistance());




eventBus.on('accelerate', (increase) => {
    const currentSpeed = VehicleState.getSpeed();
    if (VehicleState.getFuel() > 0) {
        VehicleState.setSpeed(currentSpeed + increase);
        speedDisplay.update(VehicleState.getSpeed());
        console.log(`Accelerating to ${VehicleState.getSpeed()} km/h.`);
    } else {
        console.log("Can't accelerate: Out of fuel.");
    }
});

eventBus.on('brake', (decrease) => {
    const currentSpeed = VehicleState.getSpeed();
    VehicleState.setSpeed(currentSpeed - decrease);
    speedDisplay.update(VehicleState.getSpeed());
    console.log(`Braking to ${VehicleState.getSpeed()} km/h.`);
});

eventBus.on('refuel', (amount) => {
    VehicleState.setFuel(amount);
    fuelDisplay.update(VehicleState.getFuel());
    console.log(`Refueled by ${amount}L. Current fuel: ${VehicleState.getFuel()}L.`);
});

eventBus.on('newTrip', () => {
    VehicleState.resetTrip();
    distanceDisplay.update(VehicleState.getDistance());
});


const intervalId = setInterval(() => {
    const currentSpeed = VehicleState.getSpeed();
    

    const newDistance = getNextDistance(VehicleState.getDistance(), currentSpeed);
    VehicleState.setDistance(newDistance);
    distanceDisplay.update(VehicleState.getDistance());

    if (currentSpeed > 0) {
        const fuelConsumption = currentSpeed / 100; 
        VehicleState.consumeFuel(fuelConsumption);
        fuelDisplay.update(VehicleState.getFuel());
    }

    
    if (VehicleState.getFuel() === 0 && VehicleState.getSpeed() === 0) {
        clearInterval(intervalId); 
    }
}, 1000); 


document.addEventListener('DOMContentLoaded', () => {
    
    registerDashboardEvents(eventBus); 
});
