import styled from 'styled-components';

// * Thank you for creating sanity here!
// ! Todo

const Wrapper = styled.div`
	display: grid;
	place-items: center;

	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 2;
	grid-row-end: span 1;
`;

const RouletteEl = styled.div`
	position: relative;

	height: 600px;
	width: 600px;

	border-radius: 50%;
	box-shadow: -4.08px -4.08px 12.25px #f7b1ce, 6.125px 6.125px 12.25px #d0407d66,
		inset 0px 0px 0px 1px #d0407d66;
`;

const Center = styled.div`
	position: absolute;
	top: 292px;
	left: 292px;
	z-index: 9001;

	height: 16px;
	width: 16px;

	border-radius: 50%;
`;

const Slice = styled.div`
	display: grid;
	place-items: center;

	position: absolute;
	top: 0;
	left: 0;

	height: 592px;
	width: 592px;
	border: 4px solid ${props => props.borderColor};
	z-index: ${props => props.zIndex};

	border-radius: 50%;

	& > span {
		font-size: 24px;
	}

	& > span::after,
	& > span::before {
		content: '~';

		margin: 4px;
	}
`;

const ProjectName = styled.span`
	transform: translate(
			${props => props.abscissa}px,
			${props => props.ordinate * -1}px
		)
		rotate(
			${props => parseInt(slice.initialAngle, 10) + 0.5 * degPerSlice - 90}deg
		);
`;

const Button = styled.button`
	height: 8vh;
	width: 12vh;
	border: none;
	background: #ee86b2;

	color: #f7b1ce;
	font-size: larger;
	font-variation-settings: 'GRAD' 0.3;

	border-radius: 24px;
	box-shadow: -4.08px -4.08px 12.25px #f7b1ce, 6.125px 6.125px 12.25px #d0407d66,
		inset 0px 0px 0px 1px #d0407d66;

	&::active {
		box-shadow: inset -4.08px -4.08px 4.08px #f7b1ce,
			inset 6.125px 6.125px 4.08px #d0407d66;
	}
`;

const Roulette = ({ data }) => {
	const { projects, days } = data;
	const projectsWithWeight = projects.map(p => ({
		...p,
		weight: 1,
	}));
	const withColors = projects =>
		projects.map(project =>
			project.org === 'Sun Bear Software'
				? {
						...project,
						color: '#044487',
						borderColor: '#3782CF',
				  }
				: project.org === 'HupPup'
				? {
						...project,
						color: '#6170C2',
						borderColor: '#B9C2EE',
				  }
				: project.org === 'HupDog'
				? {
						...project,
						color: '#803030',
						borderColor: '#C67A7A',
				  }
				: project.org === 'RunClub'
				? {
						...project,
						color: '#004800',
						borderColor: '#299E29',
				  }
				: project.org === 'The Sweepers'
				? {
						...project,
						color: '#936F4F',
						borderColor: '#FAE9D9',
				  }
				: null
		);
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
	const getTotalSlices = assignedProjects =>
		assignedProjects.reduce((acc, cur) => acc + cur.weight, 0);
	const getDegPerSlice = totalSlices => Math.ceil(360 / totalSlices);
	let calculatedDegPerSlice;
	const getSlices = assignedProjects => {
		const totalSlices = getTotalSlices(assignedProjects);
		const degPerSlice = getDegPerSlice(totalSlices);
		calculatedDegPerSlice = degPerSlice;
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
	const getBackgroundImage = ({ assignedProjects, slice }) => {
		const totalSlices = getTotalSlices(assignedProjects);
		const degPerSlice = getDegPerSlice(totalSlices);
		if (slice.initialAngle === '0deg') {
			return `conic-gradient(${slice.color} ${
				parseInt(slice.initialAngle, 10) + degPerSlice
			}deg, ${slice.color} ${
				parseInt(slice.initialAngle, 10) + degPerSlice
			}deg ${
				parseInt(slice.initialAngle, 10) + degPerSlice + 1
			}deg transparent ${
				parseInt(slice.initialAngle, 10) + degPerSlice + 1
			}deg 360deg)`;
		} else {
			return `conic-gradient(transparent ${slice.initialAngle}, ${
				slice.color
			} ${slice.initialAngle} ${
				parseInt(slice.initialAngle, 10) + degPerSlice
			}deg, ${slice.color} ${
				parseInt(slice.initialAngle, 10) + degPerSlice
			}deg ${
				parseInt(slice.initialAngle, 10) + degPerSlice + 1
			}deg, transparent ${
				parseInt(slice.initialAngle, 10) + degPerSlice + 1
			}deg 360deg)`;
		}
	};
	const assignedProjects = withSlots(withColors(projects));
	const slices = getSlices(withSlots(withColors(projectsWithWeight)));
	return (
		<Wrapper>
			<RouletteEl>
				<Center />
				{slices.map(slice => {
					const radToDeg = rad => (rad * Math.PI) / 180;
					const abscissa = Math.round(
						Math.sin(
							radToDeg(
								parseInt(slice.initialAngle, 10) + calculatedDegPerSlice * 0.5
							)
						) * 170
					);
					const ordinate = Math.round(
						Math.cos(
							radToDeg(
								parseInt(slice.initialAngle, 10) + calculatedDegPerSlice * 0.5
							)
						) * 170
					);
					return (
						<Slice
							id={s.key}
							key={s.key}
							zIndex={s.key}
							borderColor={slice.borderColor}
							slice={slice}
							assignedProjects={assignedProjects}>
							<ProjectName
								ordinate={ordinate}
								abscissa={abscissa}
								initialAngle={slice.initialAngle}>
								{slice.name}
							</ProjectName>
						</Slice>
					);
				})}
			</RouletteEl>
			<Button>Spin</Button>
		</Wrapper>
	);
};

export default Roulette;
