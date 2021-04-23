import { projects } from './data';
import { hslToHex } from './utils/hslToHex';
import { randomHsl } from './utils/randomHsl';
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
	// * This introduces the 'slots' or pieces of the wheel.
	// * Resulting object has randomized positions and colors.
	const assignedProjects = getAssignedProjects(projects);
	// * This adds degrees ... I'm not sure what the deal is.
	const slices = getSlices(assignedProjects);
	slices.forEach(slice => {
		// * Prepare a dom element for each piece of the wheel
		const el = document.createElement('div');
		el.id = slice.key;
		el.className = 'slice';
		el.style.border = `4px solid ${slice.borderColor}`;
		el.style.zIndex = slice.key;
		// * Just musing here, but wouldn't this be best as a select?
		const projectName = document.createElement('span');
		projectName.innerHTML = slice.name;
		// * This is here because they were random named web colors
		const sliceColorHex = standardize_color(slice.color);
		// * Light or dark text based on hex
		projectName.style.color = getTextColor(sliceColorHex, '#fefefe', '#14141d');
		// * Uses variable font to make dark font bolder without increasing the
		// * paint size, meaning it can be animated without a reflow
		const sliceGrad = 1.0;
		if (getTextColor(sliceColorHex, '#fefefe', '#14141d') === '#fefefe')
			projectName.style['font-variation-settings'] = `"GRAD" 0.95`;
		// * WTF, this is a constant
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
		// * Oh, place the NAME ...
		projectName.style.transform = `translate(${abscissa}px, ${
			ordinate * -1
		}px) rotate(${
			parseInt(slice.initialAngle, 10) + 0.5 * degPerSlice - 90
		}deg)`;
		// * Glue it together
		el.appendChild(projectName);
		// * Returns css for a slice of a conic gradient
		el.style.backgroundImage = getBackgroundImage({ assignedProjects, slice });
		// * Add it to the wheel
		document.getElementById('roulette').appendChild(el);
	});
	// * Style the wheel based on the slice colors
	document.getElementById('roulette').style.background = slices[0].color;
	document.getElementById('center').style.background =
		slices[slices.length - 1].borderColor;
	// * Hook up the spin button
	const button = document.getElementById('spinButton');
	button.addEventListener('click', spin);
};

init();
