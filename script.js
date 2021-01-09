import {
	log,
	getAssignedProjects,
	getSlices,
	getBackgroundImage,
	getTextColor,
	standardize_color,
	getDegPerSlice,
} from './utils.js';

const projects = [
	{
		name: 'master-blaster',
		weight: 2,
	},
	{
		name: 'garethfield.com',
		weight: 2,
	},
	{
		name: 'MultiBounce',
		weight: 1,
	},
	{
		name: 'HupPupApp',
		weight: 2,
	},
	{
		name: 'Java MOOC',
		weight: 1,
	},
	{
		name: 'GarethTracker2000',
		weight: 1,
	},
	{
		name: 'DawaTracker3000000',
		weight: 2,
	},
];

const init = () => {
	// Add colors and random position ˇˇˇ
	const assignedProjects = getAssignedProjects(projects);
	// Split out the projects object into individual roulette pieces ˇˇˇ
	const slices = getSlices(assignedProjects);
	// Populate the DOM, may it flourish ˇˇˇ
	slices.forEach(slice => {
		const el = document.createElement('div');
		el.className = 'slice';
		el.style.backgroundImage = getBackgroundImage({ assignedProjects, slice });
		el.style.border = `4px solid ${slice.borderColor}`;
		const projectName = document.createElement('span');
		projectName.innerHTML = slice.name;
		const sliceColorHex = standardize_color(slice.color);
		projectName.style.color = getTextColor(sliceColorHex, '#fefefe', '#14141d');
		if (getTextColor(sliceColorHex, '#fefefe', '#14141d') !== '#14141d')
			projectName.style['font-variation-settings'] = `"GRAD" 0.95`;
		const degPerSlice = getDegPerSlice(slices.length);
		const radToDeg = rad => (rad * Math.PI) / 180;
		const abscissa = Math.round(
			Math.sin(radToDeg(parseInt(slice.initialAngle, 10) + degPerSlice * 0.5)) *
				170
		);
		const ordinate = Math.round(
			Math.cos(radToDeg(parseInt(slice.initialAngle, 10) + degPerSlice * 0.5)) *
				170
		);
		projectName.style.transform = `translate(${abscissa}px, ${
			ordinate * -1
		}px) rotate(${
			parseInt(slice.initialAngle, 10) + 0.5 * degPerSlice - 90
		}deg)`;
		el.appendChild(projectName);
		document.getElementById('roulette').appendChild(el);
	});
};

init();
