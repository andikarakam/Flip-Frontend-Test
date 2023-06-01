import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TransactionList} />
        <Route path="/transaction/:id" component={TransactionDetail} />
      </Switch>
    </Router>
  );
};

export default App;
