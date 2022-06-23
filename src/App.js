import Container from './components/Container';
import Header from './components/Header';
import Roulette from './components/Roulette';
import Footer from './components/Footer';
import data from './data';

const App = () => (
	<Container>
		<Header>Schedule Roulette!</Header>
		<Roulette data={data} />
		<Footer />
	</Container>
);

export default App;
