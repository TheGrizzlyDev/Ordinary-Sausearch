import styles from './App.module.css';
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'
import { selectResults } from '../store'

const SausageRating = ({ sausages }) => {
  return (
    <span>{new Array(parseInt(sausages || 0)).fill().map((item) => '🌭')}</span>
  )
}

const ResultsContainer = () => {
  const results = useSelector(selectResults)

  return (
    <div className={styles.ResultsContainer}>
      <table>
        <thead>
          <th>Name</th>
          <th>Sausages</th>
          <th>Ruffalos</th>
        </thead>

        <tbody>
          {
            results.map(({ name, sausages, ruffalos }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{<SausageRating sausages={sausages} /> || "N/A"}</td>
                <td>{ruffalos || "N/A"}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Logo}>
        Sausearch
      </div>

      <SearchBar />

      <ResultsContainer />
    </div>
  );
}

export default App;
