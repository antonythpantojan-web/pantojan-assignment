// patternsModule.js
import { capAtZero } from './compositionModule.js';


export class EventEmitter {
    constructor() {
        this.events = {}; 
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}



export const VehicleState = (() => {
    let speed = 0; 
    let fuel = 100; 
    let distance = 0; 

    const MAX_FUEL = 100;

    return { 
        getSpeed: () => speed,
        getFuel: () => fuel,
        getDistance: () => distance,

        
        setSpeed(newSpeed) {
            speed = capAtZero(newSpeed); 
        },

        setFuel(amount) {
            fuel = Math.min(MAX_FUEL, fuel + amount);
        },

        
        setDistance(newDistance) {
            distance = newDistance;
        },
        
        consumeFuel(amount) {
            fuel = capAtZero(fuel - amount);
            if (fuel === 0) {
                console.log("Out of fuel! Speed reduced to 0.");
                speed = 0;
            }
        },

        
        resetTrip() {
            distance = 0;
            console.log("Trip reset.");
        }
    };
})();



export function createDisplay(elementId, unit) {
    const element = document.getElementById(elementId);
    
    
    return {
        update(value) {
            element.textContent = `${value.toFixed(1)} ${unit}`;
        }
    };
}
