import styled from 'styled-components';

const HeaderEl = styled.header`
	display: grid;
	place-items: center;

	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 1;
	grid-row-end: span 1;

	& h1 {
		padding: 8px;

		color: #fddfec;
		font-size: 36px;
		font-variation-settings: 'slnt' -10;
		font-variation-settings: 'GRAD' -0.3;
		font-stretch: 150%;

		border-bottom: 2px dotted #d0407d;
		border-right: 1px dotted #d0407d;
		border-top: 1px dotted #fddfec;
		border-left: 2px dotted #fddfec;
		border-radius: 8px;
	}
`;

const Header = ({ children }) => (
	<HeaderEl>
		<h1>{children}</h1>
	</HeaderEl>
);

export default Header;
