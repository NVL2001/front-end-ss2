import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { APIRoutes } from "../../constants/APIRoutes";
import formatMoney from "../../utils/formatMoney";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      const url = `${APIRoutes.GET_PRODUCTS}`;
      const response = await axios.get(url);
      setProducts(response.data.pageItems);
      setMaxPage(response.data.totalPages);
      setLoading(false);
    };

    fetchData();
  }, []);
  const fetchNextPage = async () => {
    const nextPage = currentPage + 1;
    const url = `${APIRoutes.GET_PRODUCTS}?page=${nextPage}`;
    setLoadingMore(true);

    try {
      const response = await axios.get(url);
      const newItems = response.data.pageItems;
      setProducts((prevProducts) => [...prevProducts, ...newItems]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {}, [currentPage]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      {products.map((item) => (
        <div className="box" key={item.id}>
          <div className="product mtop">
            <Link to={`/product/${item.id}`}>
              {" "}
              <div className="img">
                <span className="discount">
                  {item?.discount ? item.discount.discountPercent : 0}% Off
                </span>
                <img
                  src={`${axios.defaults.baseURL + item.productImages[0]}`}
                  alt="..."
                />
                {/* mua ngay */}
                <div className="buy-now">
                  {" "}
                  <button onClick={() => addToCart(item)}>
                    {" "}
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart" /> Mua ngay{" "}
                    </Link>
                  </button>{" "}
                </div>{" "}
              </div>
            </Link>
            <hr />
            <div className="product-details">
              <Link to={`/product/${item.id}`}>
                <h3>
                  {item.name.length > 50
                    ? `${item.name.slice(0, 50)}...`
                    : item.name}
                </h3>
              </Link>

              <div className="price">
                <h4>
                  {item.discount ? (
                    <div>
                      <p style={{ textDecoration: "line-through" }}>
                        {formatMoney(item.price)}
                      </p>
                      <p>{formatMoney(item.discountPrice)}</p>
                    </div>
                  ) : (
                    <p>{formatMoney(item.price)}</p>
                  )}
                </h4>

                <button className="incCart" onClick={() => addToCart(item)}>
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {loadingMore ? (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        currentPage + 1 < maxPage && (
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary" onClick={fetchNextPage}>
              Tải thêm
            </Button>
          </Box>
        )
      )}
    </>
  );
}

export default ShopCard;
