import { log, getAssignedProjects } from './utils.js';

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
];

const init = () => {
	const assignedProjects = getAssignedProjects(projects);
	const totalSlices = assignedProjects.reduce(
		(acc, cur) => acc + cur.weight,
		0
	);
	const degreesPerSlice = Math.ceil(360 / totalSlices);
	const slices = Array(totalSlices)
		.fill()
		.map((n, i) => {
			const proj = assignedProjects.filter(project =>
				project.slots.includes(i)
			)[0];
			return {
				name: proj.name,
				color: proj.color,
				initialAngle: `${degreesPerSlice * (i + 1)}deg`,
			};
		});
	slices.forEach(slice => {
		const el = document.createElement('div');
		el.className = 'slice';
		if (slice.initialAngle === '0deg') {
			el.style.backgroundImage = `conic-gradient(${slice.color} ${
				slice.initialAngle
			} ${parseInt(slice.initialAngle, 10) + degreesPerSlice}deg, transparent ${
				parseInt(slice.initialAngle, 10) + degreesPerSlice
			}deg 360deg)`;
		} else {
			el.style.backgroundImage = `conic-gradient(transparent 0deg ${
				slice.initialAngle
			}, ${slice.color} ${slice.initialAngle} ${
				parseInt(slice.initialAngle, 10) + degreesPerSlice
			}deg, transparent ${
				parseInt(slice.initialAngle, 10) + degreesPerSlice
			}deg 360deg)`;
		}
		const projectName = document.createElement('span');
		projectName.innerHTML = slice.name;
		el.appendChild(projectName);
		document.getElementById('roulette').appendChild(el);
	});
};

init();
