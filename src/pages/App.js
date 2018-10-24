import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Loading from './Loading';

const AsyncMemoGame = importedComponent(() => import('./MemoGame'), { LoadingComponent: Loading });
const AsyncNoMatch = importedComponent(() => import('./NoMatch'), { LoadingComponent: Loading });

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AsyncMemoGame} />
        <Route component={AsyncNoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
