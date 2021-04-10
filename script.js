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

// ToDo: Two Main Goals:
// ? 1) Create other lists of tech.
// 		` put the stack in Stack Roulette `
// ? 2) ~~*~~*~~ Abstraction! ~~*~~*~~
// 		`	         ^^^^^^^^^^^^           `

// * 1) ~ Lists! ~
// * 			- Projects
// * 			- JS Frameworks/Vanilla
// * 			- Backend Solutions
// * 			- Individual Technologies
// * 			- Design Tools
// * 			- Career-y Stuff

// "projects"
// const projects = [
// 	{
// 		name: 'SM64',
// 		weight: 2,
// 	},
// 	{
// 		name: 'Zelda OoT',
// 		weight: 2,
// 	},
// 	{
// 		name: 'Zelda MM',
// 		weight: 1,
// 	},
// 	{
// 		name: 'Agar.io',
// 		weight: 1,
// 	},
// ];
// const projects = [
// 	{
// 		name: 'gmod',
// 		weight: 2,
// 	},
// 	{
// 		name: 'chickydoo',
// 		weight: 2,
// 	},
// 	{
// 		name: 'playps',
// 		weight: 2,
// 	},
// ];
// const projects = [
// 	{
// 		name: 'Stack Roulette',
// 		weight: 1,
// 	},
// 	{
// 		name: '`dot-eater`',
// 		weight: 1,
// 	},
// 	{
// 		name: 'dawaTracker3M',
// 		weight: 1
// 	},
// 	{
// 		name: '`master-blaster`',
// 		weight: 1,
// 	},
// 	{
// 		name: 'garethfield.com',
// 		weight: 1,
// 	},
// 	{
// 		name: 'garethfield.web',
// 		weight: 1,
// 	},
// 	{
// 		name: 'HupPup',
// 		weight: 1,
// 	},
// 	{
// 		name: 'Polar Pairs',
// 		weight: 1,
// 	},
// 	{
// 		name: 'Pom',
// 		weight: 1,
// 	},
// 	{
// 		name: 'GarethTracker2000',
// 		weight: 1,
// 	},
// 	{
// 		name: 'Coding podcast!',
// 		weight: 1,
// 	},
// ];
// const projects = [
// 	{
// 		name: 'Super Mario 64',
// 		weight: 3,
// 	},
// 	{
// 		name: 'Legend of Zelda: OoT',
// 		weight: 2,
// 	},
// 	{
// 		name: 'Legend of Zelda: MM',
// 		weight: 2,
// 	},
// 	{
// 		name: 'Worms - Armegeddon',
// 		weight: 1,
// 	},
// ];
// const projects = [
// 	{
// 		name: 'pong',
// 		weight: 1,
// 	},
// 	{
// 		name: 'space invaders',
// 		weight: 1,
// 	},
// 	{
// 		name: 'super mario bros',
// 		weight: 1,
// 	},
// 	{
// 		name: 'asteroids',
// 		weight: 1,
// 	},
// 	{
// 		name: 'frogger',
// 		weight: 1,
// 	},
// 	{
// 		name: 'legend of zelda',
// 		weight: 1,
// 	},
// ];

const init = () => {
	// * Add colors and random position ˇˇˇ * //
	const assignedProjects = getAssignedProjects(projects);
	// * Split out the projects object into individual roulette pieces ˇˇˇ * //
	const slices = getSlices(assignedProjects);
	// * Populate the DOM, may it flourish ˇˇˇ * //
	slices.forEach(slice => {
		const el = document.createElement('div');
		el.id = slice.key;
		el.className = 'slice';
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
		document.getElementById('roulette').appendChild(el);
	});
	document.getElementById('roulette').style.background = slices[0].color;
	document.getElementById('center').style.background =
		slices[slices.length - 1].borderColor;
	// Add event listener(s) ˇˇˇ
	const button = document.getElementById('spinButton');
	button.addEventListener('click', spin);
};

init();
