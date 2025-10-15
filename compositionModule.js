export function capAtZero(value) {
    return Math.max(0, value);
}


export function calculateDistance(speed, timeInHours) {
    return speed * timeInHours;
}


export function getNextDistance(currentDistance, currentSpeed) {
    const timeStep = 0.1; 
    const distanceGained = calculateDistance(currentSpeed, timeStep);
    return currentDistance + distanceGained;
}
