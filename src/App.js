import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
