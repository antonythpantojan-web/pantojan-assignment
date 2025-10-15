export function registerDashboardEvents(eventBus) {
    const accelerateBtn = document.getElementById('btnAccelerate');
    const brakeBtn = document.getElementById('btnBrake');
    const refuelBtn = document.getElementById('btnRefuel');
    const newTripBtn = document.getElementById('btnNewTrip');

    
    accelerateBtn.addEventListener('click', () => {
        eventBus.emit('accelerate', 10); 
    });

    brakeBtn.addEventListener('click', () => {
        eventBus.emit('brake', 5); 
    });

    refuelBtn.addEventListener('click', () => {
        eventBus.emit('refuel', 25); 
    });

    newTripBtn.addEventListener('click', () => {
        eventBus.emit('newTrip'); 
    });
}
