/* @flow weak */
export const EPOCH_DURATION = 60;

export function date(y, m, d, hh, mm, ss) {
	const dt = new Date(y, m-1, d, hh, mm, ss);
	return Math.floor(dt.getTime() / 1000);
}

export function epochToTime(epoch, baseTime) {
	const time = baseTime + epoch * EPOCH_DURATION;
	return new Date(time * 1000);
}

export function formatTime(t) {
	const date = t.toLocaleDateString();
	const time = t.toLocaleTimeString().slice(0, 5);
	return `${date} — ${time}`;
}

export function nextEpoch(epoch=0) {
	return epoch + 1;
}

export function toWorldTime(world, epoch) {
	return epochToTime(epoch, world.baseTime);
}

export function getCurrentTime(world) {
	return toWorldTime(world, world.epoch);
}

export function getTimeOfDay(time) {
	const hours = time.getHours();
	switch (true) {
	case hours >= 23: return 'night';
	case hours >= 19: return 'evening';
	case hours >= 18: return 'sunset';
	case hours >= 12: return 'noon';
	case hours >= 7:  return 'morning';
	case hours >= 4:  return 'dawn';
	case hours >= 0:  return 'night';
	}
}
