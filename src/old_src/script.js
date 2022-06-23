import { projects } from './data.js';
import { hslToHex } from './hslToHex.js';
import { randomHSL } from './randomHsl.js';
import {
	dontPickBackgroundColor,
	getAssignedProjects,
	getSlices,
	getBackgroundImage,
	standardize_color,
	getDegPerSlice,
	spin,
} from './utils.js';

const init = () => {
	const assignedProjects = getAssignedProjects(projects);
	const slices = getSlices(assignedProjects);
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
	const button = document.getElementById('spinButton');
	button.addEventListener('click', spin);
};

init();
