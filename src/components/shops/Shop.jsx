import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../common/sort/sorting.css';

import Catg from './Catg';
import ShopCard from './ShopCard';
import Sorting from '../../common/sort/sorting';
import './style.css';
// const Shop = ({ addToCart, shopItems }) => {
function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/product/products'
      );
      setProducts(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section id="shop" className="shop background">
      <div className="container d_flex">
        <Catg />

        <div className="contentWidth">
          <Sorting />
          <div className="product-content  grid1">
            {/* <ShopCard addToCart={addToCart} shopItems={shopItems} /> */}
            <ShopCard addToCart={addToCart} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
