import { getAssignedProjects, getSlices, getBackgroundImage } from './utils.js';

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
		const projectName = document.createElement('span');
		el.className = 'slice';
		el.style.backgroundImage = getBackgroundImage(slice);
		projectName.innerHTML = slice.name;
		el.appendChild(projectName);
		document.getElementById('roulette').appendChild(el);
	});
};

init();
