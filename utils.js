import htmlColors from 'html-colors';

export const log = function () {
	const key = Object.keys(this)[0];
	const value = JSON.stringify(this[key], null, 2);
	console.log(`${key}: ${value}`);
};

const dontPickBackgroundColor = color =>
	[
		'pink',
		'lightpink',
		'hotpink',
		'deeppink',
		'palevioletred',
		'mediumvioletred',
		'lightcoral',
	].includes(color)
		? dontPickBackgroundColor(htmlColors.random())
		: color;

const withColors = projects =>
	projects.map(project => ({
		...project,
		color: dontPickBackgroundColor(htmlColors.random()),
		borderColor: dontPickBackgroundColor(htmlColors.random()),
	}));

const withSlots = projects => {
	const totalSlices = projects.reduce((acc, cur) => acc + cur.weight, 0);
	let slots = [...Array(totalSlices).keys()];
	return projects.map(project => {
		let projectSlots = [];
		for (let i = project.weight; i > 0; i--) {
			const slotIndex = Math.floor(Math.random() * slots.length);
			projectSlots.push(slots[slotIndex]);
			slots.splice(slotIndex, 1);
		}
		return { ...project, slots: projectSlots };
	});
};

export const getAssignedProjects = projects => withSlots(withColors(projects));

const getTotalSlices = assignedProjects =>
	assignedProjects.reduce((acc, cur) => acc + cur.weight, 0);

export const getDegPerSlice = totalSlices => Math.ceil(360 / totalSlices);

export const getSlices = assignedProjects => {
	const totalSlices = getTotalSlices(assignedProjects);
	const degPerSlice = getDegPerSlice(totalSlices);
	return Array(totalSlices)
		.fill()
		.map((n, i) => {
			const proj = assignedProjects.filter(project =>
				project.slots.includes(i)
			)[0];
			return {
				key: i,
				name: proj.name,
				color: proj.color,
				borderColor: proj.borderColor,
				initialAngle: `${degPerSlice * i}deg`,
			};
		});
};

export const getBackgroundImage = ({ assignedProjects, slice }) => {
	const totalSlices = getTotalSlices(assignedProjects);
	const degPerSlice = getDegPerSlice(totalSlices);
	if (slice.initialAngle === '0deg') {
		return `conic-gradient(${slice.color} ${
			parseInt(slice.initialAngle, 10) + degPerSlice
		}deg, ${slice.color} ${parseInt(slice.initialAngle, 10) + degPerSlice}deg ${
			parseInt(slice.initialAngle, 10) + degPerSlice + 1
		}deg transparent ${
			parseInt(slice.initialAngle, 10) + degPerSlice + 1
		}deg 360deg)`;
	} else {
		return `conic-gradient(transparent ${slice.initialAngle}, ${slice.color} ${
			slice.initialAngle
		} ${parseInt(slice.initialAngle, 10) + degPerSlice}deg, ${slice.color} ${
			parseInt(slice.initialAngle, 10) + degPerSlice
		}deg ${
			parseInt(slice.initialAngle, 10) + degPerSlice + 1
		}deg, transparent ${
			parseInt(slice.initialAngle, 10) + degPerSlice + 1
		}deg 360deg)`;
	}
};

export const getTextColor = (bgColor, lightColor, darkColor) => {
	// https://stackoverflow.com/a/41491220/4984506
	// Thanks Mark Ransom, Alx, chetstone, and SudoPlz!
	var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
	var r = parseInt(color.substring(0, 2), 16); // hexToR
	var g = parseInt(color.substring(2, 4), 16); // hexToG
	var b = parseInt(color.substring(4, 6), 16); // hexToB
	var uicolors = [r / 255, g / 255, b / 255];
	var c = uicolors.map(col => {
		if (col <= 0.03928) {
			return col / 12.92;
		}
		return Math.pow((col + 0.055) / 1.055, 2.4);
	});
	var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	return L > 0.179 ? darkColor : lightColor;
};

export const standardize_color = str => {
	// https://stackoverflow.com/a/47355187/4984506
	// Thanks JayB!
	var ctx = document.createElement('canvas').getContext('2d');
	ctx.fillStyle = str;
	return ctx.fillStyle;
};

let totalDegrees = 0;

export const spin = () => {
	const roulette = document.getElementById('roulette');
	roulette.style.transition = `transform 5s ease-in-out`;
	const degrees = Math.ceil(Math.random() * 360) + 15 * 360 + totalDegrees;
	totalDegrees += degrees;
	roulette.style.transform = `rotate(-${degrees}deg)`;
};
