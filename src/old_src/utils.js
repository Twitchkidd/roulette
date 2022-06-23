// export const log = function () {
// 	const key = Object.keys(this)[0];
// 	const value = JSON.stringify(this[key], null, 2);
// 	console.log(`${key}: ${value}`);
// };

export const dontPickBackgroundColor = color =>
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
