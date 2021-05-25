import './App.css';
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <>
    <CssBaseline />
    <SearchBar />
    <Container>
      <SearchResults />
    </Container>
    </>
  );
}

export default App;
