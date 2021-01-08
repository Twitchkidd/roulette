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
