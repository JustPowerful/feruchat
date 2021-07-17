import Chat from './Chat'
import Index from './Index'
import './css/App.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <Index/>
        </Route>

        <Route path="/room/:roomname" component={Chat} exact/>

      </Switch>
    </Router>
  );
}

export default App;
