import React, { useEffect, useState } from "react";
import axios from "axios";
import Catg from "./Catg";
import ShopCard from "./ShopCard";
import Sorting from "../../common/sort/sorting";
import "./style.css";
import "../../common/sort/sorting.css";
import { useProduct } from "../../context/ProductContext";
import { APIRoutes } from "../../constants/APIRoutes";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { CartItem, addToCart } = useProduct();

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(
      //   "http://localhost:8080/api/product/products"
      // );
      const url = `${APIRoutes.GET_PRODUCTS}`;
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section id="shop" className="shop background">
      <Sorting />
      <div className="container d_flex">
        {/* <Catg /> */}
        <div className="contentWidth">
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
