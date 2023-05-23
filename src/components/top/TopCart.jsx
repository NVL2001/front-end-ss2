import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { getProductsByCategory } from "../../api/products";
import { Item } from "../../utils/components/Item";
import { generateColorFromString } from "../../utils/generateColor";

function TopCart(props) {
  const history = useHistory();
  const handleCategoryClick = async (name) => {
    try {
      const response = await getProductsByCategory(name);
      history.push({
        pathname: `/category/${name}`,
        state: { products: response.data },
      });
    } catch (err) {
      toast.error("Something went wrong, try again later");
    }
  };
  const { data } = props;
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // };
  return (
    <div className="topCateContainer">
      {data.map((value) => (
        <div
          className="itemContainer"
          onClick={() => handleCategoryClick(value.name)}
        >
          <Link to>
            <Item
              color={generateColorFromString(value.name)}
              className="topCateItem"
            >
              {value.name}
            </Item>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TopCart;
// <Grid container spacing={2}>
//   {data.map((value) => (
//     <Grid
//       item
//       xs={2}
//       key={value.id}
//       onClick={() => handleCategoryClick(value.name)}
//       className="topCateContainer"
//     >
//       <Link to>
//         <Item
//           color={generateColorFromString(value.name)}
//           className="topCateItem"
//         >
//           {value.name}
//         </Item>
//       </Link>
//     </Grid>
//   ))}
// </Grid>
