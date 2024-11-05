// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import Header from './components/Header';


const Home = () => <h2 className="text-xl font-semibold">Home Page</h2>;
const ProductList = () => <h2 className="text-xl font-semibold">Product List Page</h2>;

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/add-product" element={<ItemList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
