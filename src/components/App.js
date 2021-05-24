import './App.css';
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'
import { selectResults } from '../store'

function App() {
  const results = useSelector(selectResults)
  return (
    <div className="App">
      <SearchBar />
      <table>
      <thead>
        <th>Name</th>
        <th>Sausages</th>
        <th>Ruffalos</th>
      </thead>
      {
        results.map(({name, sausages, ruffalos}) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{sausages}</td>
            <td>{ruffalos || "N/A"}</td>
          </tr>
        ))
      }
      </table>
    </div>
  );
}

export default App;
