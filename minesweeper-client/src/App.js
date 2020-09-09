import React from 'react';
import './App.css';
import GameView from './views/Game'
import {HashRouter as Router,Switch,Route} from 'react-router-dom';
import MainView from './views/main';
import {StateProvider} from  './context/index'

function App() {
  return (
      <StateProvider>
          <Router>
              <Switch>
                <Route exact path="/" ><MainView /></Route>
                <Route exact path="/game" ><GameView /></Route>
              </Switch>
          </Router>
      </StateProvider>
  );
}

export default App;
