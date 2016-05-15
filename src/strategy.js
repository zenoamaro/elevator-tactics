/* @flow weak */
export default `
var direction = state.direction || 1;
var lastOpenFloor = state.lastOpenFloor || null;

if (elevator.open) {
  return { action:'close' };
}

var elevation = elevator.elevation;
var floor = elevator.floor;
var calls = Object.assign({}, elevator.calls, elevator.requests);

if (calls[floor.id] && lastOpenFloor !== floor.id) {
  return {
    action: 'open',
    lastOpenFloor: floor.id,
  };
}

var nextDirection = direction;

function floorFilter(f) {
  return (f.elevation*nextDirection) > (elevation*nextDirection);
}

var targets = Object.values(calls).filter(floorFilter);

if (!targets.length) {
  nextDirection *= -1;
  targets = Object.values(calls).filter(floorFilter);
}

if (targets.length) {
  return {
    action: nextDirection > 0 ? 'climb' : 'descend',
    direction: nextDirection,
  };
}

return { action:'sleep' };
`.trim();
