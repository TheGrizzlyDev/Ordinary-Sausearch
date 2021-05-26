import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store'
import ReactGA from 'react-ga';

const renderApp = () => render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

const isDev = process.env.NODE_ENV !== 'production'

if (isDev && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()

ReactGA.initialize('G-8S3Z9M64CQ', {
  debug: isDev
});
ReactGA.pageview(window.location.pathname + window.location.search);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
