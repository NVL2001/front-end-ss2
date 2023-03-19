// import React, { useEffect, useRef, useState } from "react";
// import {
//   Stack,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   styled,
//   Button,
//   Box,
//   Skeleton,
//   TextField,
// } from "@mui/material";
// import { useProduct } from "../context/ProductContext";

// export const ProductDetailsPage = () => {
//   const { productDetail, addToCart } = useProduct();
//   const [productQuantity, setProductQuantity] = useState(1);
//   const productQuantityRef = useRef(1);

//   useEffect(() => {
//     productQuantityRef.current = productQuantity;
//   }, [productQuantity]);

//   if (!productDetail) {
//     return (
//       <Stack maxWidth={400} py={8} sx={{ margin: "0 auto" }}>
//         <Skeleton />
//         <Skeleton height={200} />
//         <Skeleton />
//         <Skeleton height={200} />
//       </Stack>
//     );
//   }

//   const handleAddToCart = () => {
//     addToCart(productDetail, productQuantity);
//   };

//   const handleProductQuantity = (quantity) => {
//     if (quantity <= 1) {
//       setProductQuantity(1);
//     } else {
//       setProductQuantity(quantity);
//     }
//   };

//   return (
//     <Stack direction={"row"} py={8} spacing={4} justifyContent={"center"}>
//       <CardMedia
//         sx={{ width: 350, height: 400 }}
//         component={"img"}
//         image={"public/images/shops/A1.jpg"}
//         title={productDetail.name}
//       />
//       <Card variant={"outlined"} className={"product"}>
//         <CardContent>
//           <Stack rowGap={2} pb={2}>
//             <Typography variant={"h4"}>{productDetail.name}</Typography>
//             <Stack direction={"row"} columnGap={0.5} className={"rate"}>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//               <i className="fa fa-star"></i>
//             </Stack>
//             <Typography className={"price"} variant={"h5"}>
//               ${productDetail.price}.00
//             </Typography>
//             <Typography maxWidth={400}>{productDetail.describe}</Typography>
//             <Stack direction={"row"} columnGap={1}>
//               <StyledIconButton
//                 variant={"contained"}
//                 onClick={() => handleProductQuantity(productQuantity - 1)}
//               >
//                 <i className="fa-solid fa-minus"></i>
//               </StyledIconButton>
//               <StyledBox alignItems={"center"} justifyContent={"center"}>
//                 <Typography>{productQuantity}</Typography>
//               </StyledBox>
//               <StyledIconButton
//                 variant={"contained"}
//                 onClick={() => handleProductQuantity(productQuantity + 1)}
//               >
//                 <i className="fa-solid fa-plus"></i>
//               </StyledIconButton>
//             </Stack>
//           </Stack>
//           <AddToCartButton variant={"contained"} onClick={handleAddToCart}>
//             Add To Cart
//           </AddToCartButton>
//         </CardContent>
//       </Card>
//     </Stack>
//   );
// };

// const StyledIconButton = styled(Button)(() => ({
//   width: 40,
//   height: 40,
//   borderRadius: 8,
//   background: "#F6F6F6",
//   color: "#2B2B2B",
//   boxShadow: "none",
//   "&:hover": {
//     background: "#eaeaea",
//     boxShadow: "none",
//   },
// }));

// const AddToCartButton = styled(Button)(() => ({
//   background: "#6C5CE7",
//   borderRadius: 8,
//   minWidth: 220,
//   height: 40,
//   boxShadow: "none",
//   "&:hover": {
//     background: "#6152d3",
//     boxShadow: "none",
//   },
// }));

// const StyledBox = styled(Stack)(() => ({
//   width: 64,
//   height: 40,
//   borderRadius: 8,
//   border: "1px solid #EDEDED",
// }));
// use dynamic data to generate single detail product
 import React, { useEffect, useRef, useState } from "react";
  import {
    Stack,
    Card,
    CardContent,
    Typography,
    CardMedia,
    styled,
    Button,
    Box,
    Skeleton,
    TextField,
  } from "@mui/material";
  import { useProduct } from "../context/ProductContext";
  export const ProductDetailsPage = () => {
    const { productDetail, addToCart } = useProduct();
    const [productQuantity, setProductQuantity] = useState(1);
    const productQuantityRef = useRef(1);
    useEffect(() => {
      productQuantityRef.current = productQuantity;
    }, [productQuantity]);
    if (!productDetail) {
      return (
        <Stack maxWidth={400} py={8} sx={{ margin: "0 auto" }}>
          <Skeleton />
          <Skeleton height={200} />
          <Skeleton />
          <Skeleton height={200} />
        </Stack>
      );
    }
    const handleAddToCart = () => {
      addToCart(productDetail, productQuantity);
    };
    const handleProductQuantity = (quantity) => {
      if (quantity <= 1) {
        setProductQuantity(1);
      } else {
        setProductQuantity(quantity);
      }
    };
    return (
      <Stack direction={"row"} py={8} spacing={4} justifyContent={"center"}>
        <CardMedia
          sx={{ width: 350, height: 400 }}
          component={"img"}
          image={"public/images/shops/A1.jpg"}
          title={productDetail.name}
        />
        <Card variant={"outlined"} className={"product"}>
          <CardContent>
            <Stack rowGap={2} pb={2}>
              <Typography variant={"h4"}>{productDetail.name}</Typography>
              <Stack direction={"row"} columnGap={0.5} className={"rate"}>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </Stack>
              <Typography className={"price"} variant={"h5"}>
                ${productDetail.price}.00
              </Typography>
              <Typography maxWidth={400}>{productDetail.describe}</Typography>
              <Stack direction={"row"} columnGap={1}>
                <StyledIconButton
                  variant={"contained"}
                  onClick={() => handleProductQuantity(productQuantity - 1)}
                >
                  <i className="fa-solid fa-minus"></i>
                </StyledIconButton>
                <StyledBox alignItems={"center"} justifyContent={"center"}>
                  <Typography>{productQuantity}</Typography>
                </StyledBox>
                <StyledIconButton
                  variant={"contained"}
                  onClick={() => handleProductQuantity(productQuantity + 1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </StyledIconButton>
              </Stack>
            </Stack>
            <AddToCartButton variant={"contained"} onClick={handleAddToCart}>
              Add To Cart
            </AddToCartButton>
          </CardContent>
        </Card>
      </Stack>
    );
  };
  const StyledIconButton = styled(Button)(() => ({
    width: 40,
    height: 40,
    borderRadius: 8,
    background: "#F6F6F6",
    color: "#2B2B2B",
    boxShadow: "none",
    "&:hover": {
      background: "#eaeaea",
      boxShadow: "none",
    },
  }));
  const AddToCartButton = styled(Button)(() => ({
    background: "#6C5CE7",
    borderRadius: 8,
    minWidth: 220,
    height: 40,
    boxShadow: "none",
    "&:hover": {
      background: "#6152d3",
      boxShadow: "none",
    },
  }));
  const StyledBox = styled(Stack)(() => ({
    width: 64,
    height: 40,
    borderRadius: 8,
    border: "1px solid #EDEDED",
  }));