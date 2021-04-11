// Get a random color, but not a boring one, if possible
// Get random 0-255 for hue, then like 204-255 (80%) for saturation ...
// lightness though, do we want weighted to the middle or top 80%?

// Oh, wait, okay, here we go, hue is interpreted as degrees, so 0-359
// there actually, then saturation is a percent so 80-100%, and then
// lightness should be weighted towards the middle, SO:

export const randomHSL = dice => {
	if (typeof dice !== 'number') {
		return new Error('Number of dice must be number!');
	}
	function getRandomIntInclusive(min, max) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
	}
	function weightedRandom(max, numDice) {
		// https://stackoverflow.com/a/30495228/4984506
		let num = 0;
		for (let i = 0; i < numDice; i++) {
			num += Math.random() * (max / numDice);
		}
		return num;
	}
	const hue = getRandomIntInclusive(0, 255);
	const saturation = getRandomIntInclusive(80, 100);
	const lightness = weightedRandom(100, dice);
	return `${hue} ${saturation} ${Math.floor(lightness)}`;
};
