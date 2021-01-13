import htmlColors from 'html-colors';
import {
	dontPickBackgroundColor,
	getAssignedProjects,
	getSlices,
	getBackgroundImage,
	getTextColor,
	standardize_color,
	getDegPerSlice,
	spin,
} from './utils.js';

const projects = [
	{
		name: 'tech-resume',
		weight: 0,
	},
	{
		name: 'non-tech-resume',
		weight: 0,
	},
	{
		name: 'garethfield.com',
		weight: 1,
	},
	{
		name: 'master-blaster',
		weight: 1,
	},
	{
		name: 'HupPupApp',
		weight: 2,
	},
	{
		name: 'DawaTracker3M',
		weight: 1,
	},
	{
		name: 'polar-pairs',
		weight: 1,
	},
	{
		name: 'dot-eater',
		weight: 1,
	},
	{
		name: 'MultiBounce',
		weight: 1,
	},
	{
		name: 'houdini.how',
		weight: 1,
	},
	{
		name: 'Java MOOC',
		weight: 0,
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
		el.id = slice.key;
		el.className = 'slice';
		console.log(getBackgroundImage({ assignedProjects, slice }));
		el.style.border = `4px solid ${slice.borderColor}`;
		el.style.zIndex = slice.key;
		const projectName = document.createElement('span');
		projectName.innerHTML = slice.name;
		const sliceColorHex = standardize_color(slice.color);
		projectName.style.color = getTextColor(sliceColorHex, '#fefefe', '#14141d');
		const sliceGrad = 1.0;
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
		el.style.backgroundImage = getBackgroundImage({ assignedProjects, slice });
		document.getElementById(
			'roulette'
		).style.background = dontPickBackgroundColor(htmlColors.random());
		document.getElementById('roulette').appendChild(el);
		document.getElementById('center').style.background =
			slices[slices.length - 1].borderColor;
	});
	// Add event listener(s) ˇˇˇ
	const button = document.getElementById('spinButton');
	button.addEventListener('click', spin);
};

init();

// const projects = [
// 	{
// 		name: 'gta',
// 		weight: 2,
// 	},
// 	{
// 		name: 'ttt',
// 		weight: 2,
// 	},
// 	{
// 		name: 'worms',
// 		weight: 1,
// 	},
// 	{
// 		name: 'chicky-d00',
// 		weight: 2,
// 	},
// 	{
// 		name: 'playps',
// 		weight: 1,
// 	},
// 	{
// 		name: 'rainbox-secvn',
// 		weight: 1,
// 	},
// ];
