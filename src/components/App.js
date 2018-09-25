import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Home from './Home';
import Loading from './Loading';
import MemoGame from './MemoGame';

const AsyncMemoGame = importedComponent(() => import('./MemoGame'), { LoadingComponent: Loading });
const AsyncNoMatch = importedComponent(() => import('./NoMatch'), { LoadingComponent: Loading });

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MemoGame} />
        {
          //<Route exact path="/memogame" component={AsyncMemoGame} />
        }
        <Route component={AsyncNoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
