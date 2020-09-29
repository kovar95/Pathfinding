import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main } from './components/styled-components/MyStyledComponents';
import Game from './components/Game';
import Landing from './components/Landing';

const App = () => {
  return (
    <Main>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/game">
          <Game />
        </Route>
      </Switch>
    </Main>
  );
};

export default App;
