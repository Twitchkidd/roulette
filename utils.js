import htmlColors from 'html-colors';

export const log = function () {
	const key = Object.keys(this)[0];
	const value = JSON.stringify(this[key], null, 2);
	console.log(`${key}: ${value}`);
};

const withColors = projects =>
	projects.map(project => ({ ...project, color: htmlColors.random() }));

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

export const getSlices = assignedProjects => {
	const totalSlices = getTotalSlices(assignedProjects);
	const degPerSlice = Math.ceil(360 / totalSlices);
	return Array(totalSlices)
		.fill()
		.map((n, i) => {
			const proj = assignedProjects.filter(project =>
				project.slots.includes(i)
			)[0];
			return {
				name: proj.name,
				color: proj.color,
				initialAngle: `${degPerSlice * (i + 1)}deg`,
			};
		});
};

export const getBackgroundImage = slice =>
	slice.initialAngle === '0deg'
		? `conic-gradient(${slice.color} ${slice.initialAngle} ${
				parseInt(slice.initialAngle, 10) + degPerSlice
		  }deg, transparent ${
				parseInt(slice.initialAngle, 10) + degPerSlice
		  }deg 360deg)`
		: `conic-gradient(transparent 0deg ${slice.initialAngle}, ${slice.color} ${
				slice.initialAngle
		  } ${parseInt(slice.initialAngle, 10) + degPerSlice}deg, transparent ${
				parseInt(slice.initialAngle, 10) + degPerSlice
		  }deg 360deg)`;
