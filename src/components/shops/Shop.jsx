import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Catg from "./Catg";
import ShopCard from './ShopCard';
import './style.css';
// import { useHistory, useParams } from "react-router-dom";
// import { getAllProduct } from "../../api/apiAllProduct";

// const Shop = ({ addToCart, shopItems }) => {
function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://localhost:8080/api/product/products',
      );
      setProducts(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);
  const [sortCriteria, setSortCriteria] = useState('name');

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  let sortedProducts = [];

  if (Array.isArray(products)) {
    sortedProducts = [...products].sort((a, b) => {
      if (sortCriteria === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortCriteria === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortCriteria === 'price-low-to-high') {
        return a.price - b.price;
      }
      if (sortCriteria === 'price-high-to-low') {
        return b.price - a.price;
      }
      if (sortCriteria === 'newest') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      if (sortCriteria === 'oldest') {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      }
      return 0;
    });
  }
  return (
    <section id="shop" className="shop background">
      <div className="container d_flex">
        {/* <Catg /> */}

        <div className="contentWidth">
          <div className="heading d_flex">
            <div className="heading-left row  f_flex">
              {/* <h1>
                  Danh mục<i className="fa-solid fa-down"></i>
                </h1> */}
            </div>
            <div className="heading-right row ">
              <div className="collection-sorting-wrapper">
                <div className="form-horizontal not-filter">
                  <select
                    name="SortBy"
                    id="SortBy"
                    value={sortCriteria}
                    onChange={handleSortChange}
                  >
                    <option value="name-asc">Tên: A-Z</option>
                    <option value="name-desc">Tên: Z-A</option>
                    <option value="price-low-to-high">Giá: Tăng dần</option>
                    <option value="price-high-to-low">Giá: Giảm dần</option>
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

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
