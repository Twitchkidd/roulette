import styled from 'styled-components';
import Link from './Link';

const FooterEl = styled.footer`
	display: grid;
	place-items: center;

	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 3;
	grid-row-end: span 1;

	background: #d0407d;
`;

const Footer = () => (
	<FooterEl>
		<Link href='https://github.com/twitchkidd/roulette' title='Source code!'>
			github.com/twitchkidd/roulette
		</Link>
	</FooterEl>
);

export default Footer;
