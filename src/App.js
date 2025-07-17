import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Favourites from './pages/Favourites';
import AppNavbar from './components/AppNavbar';

const App = () => (
  <Router>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </Router>
);

export default App;

