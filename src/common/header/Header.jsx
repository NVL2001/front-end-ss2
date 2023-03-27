import React from 'react';
import './Header.css';
import Head from './Head';
import Search from './Search';
import Navbar from './Navbar';
import { useProduct } from '../../context/ProductContext';

function Header() {
  const { CartItem } = useProduct();
  return (
    <>
      <Head />
      <div className="headerAll">
        <Search CartItem={CartItem} />
        <Navbar />
      </div>
    </>
  );
}

export default Header;
