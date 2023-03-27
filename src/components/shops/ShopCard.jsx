import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// spinner
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner-icon" />
    </div>
  );
}

// const ShopCard = ({ shopItems, addToCart }) => {
function ShopCard({ addToCart }) {
  // LIKE
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // fetch
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

  return (
    loading ? (
      <LoadingSpinner />
    ) : (
      <>
        {products.pageItems.map((pageItem) => (
          <div
            className="box"
            key={pageItem.id}
          >
            <div className="product mtop">
              <Link to={`/products/${pageItem.id}`}>
                {' '}
                <div className="img">
                  <span className="discount">
                    {pageItem.discount}
                    % Off
                  </span>

                  <img
                    src={`http://${pageItem.productImages[0]}`}
                    alt="..."
                  />

                  <div className="product-like">
                    <p>{count}</p>
                    {' '}
                    <br />
                    <i className="fas fa-heart" onClick={increment} />
                  </div>
                </div>
              </Link>
              <hr />
              <div className="product-details">
                <Link to={`/products/${pageItem.id}`}>
                  <h3>
                    {pageItem.name.length > 65
                      ? `${pageItem.name.slice(0, 65)}...`
                      : pageItem.name}
                  </h3>
                </Link>

                <div className="price">
                  <h4>
                    {pageItem.price

                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    {' '}
                    VND
                  </h4>

                  <button onClick={() => addToCart(pageItem)}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  );
}

export default ShopCard;
