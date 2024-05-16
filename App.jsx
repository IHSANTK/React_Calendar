

import { Provider } from 'react-redux';
import store from './store';
import Calendar from './Calendar';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Calendar</h1>
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
