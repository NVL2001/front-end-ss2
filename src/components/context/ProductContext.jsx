import React, {useContext, useEffect, useMemo, useState} from "react"
import Data from "../Data";
import Sdata from "../shops/Sdata";

export const ProductContext = React.createContext({})

export const useProduct = () => {
    return useContext(ProductContext)
}

export const ProductContextProvider = ({children}) => {
    const [productDetail, setProductDetail] = useState()
    const [CartItem, setCartItem] = useState([])

    const { productItems } = Data
    const { shopItems } = Sdata

    const addToCart = (product, quantity) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item.id === product.id)
        // if productExit chai alredy exit in cart then will run fun() => setCartItem
        // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
        // gayara check garxa if item.id ra product.id chai match bhayo bhane
        // productExit product chai display garxa
        // ani increase  exits product QTY by 1
        // if item and product doesnt match then will add new items
        if (productExit) {
            setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: quantity ? productExit.qty + quantity : productExit.qty + 1 } : item)))
        } else {
            // but if the product doesnt exit in the cart that mean if card is empty
            // then new product is added in cart  and its qty is initalize to 1
            setCartItem([...CartItem, { ...product, qty: quantity ? quantity : 1 }])
        }
    }

    const decreaseQty = (product) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item.id === product.id)

        // if product is exit and its qty is 1 then we will run a fun  setCartItem
        // inside  setCartItem we will run filter to check if item.id is match to product.id
        // if the item.id is doesnt match to product.id then that items are display in cart
        // else
        if (productExit.qty === 1) {
            setCartItem(CartItem.filter((item) => item.id !== product.id))
        } else {
            // if product is exit and qty  of that produt is not equal to 1
            // then will run function call setCartItem
            // inside setCartItem we will run map method
            // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
            setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
        }
    }

    useEffect(() => {
        if (productDetail) {
            localStorage.setItem("productDetail", JSON.stringify(productDetail))
        }
        if (CartItem.length > 0) {
            localStorage.setItem("cartItem", JSON.stringify(CartItem))
        } else {
            localStorage.setItem("cartItem", JSON.stringify([]))
        }
    }, [productDetail, CartItem])

    useEffect(() => {
        const productDetail = JSON.parse(localStorage.getItem("productDetail"))
        const cartItems = JSON.parse(localStorage.getItem("cartItem"))
        if (productDetail) {
            setProductDetail(productDetail)
        }
        if (cartItems) {
            setCartItem(cartItems)
        }
    }, [])

    const value = useMemo(() => ({
        productDetail,
        setProductDetail,
        productItems,
        shopItems,
        addToCart,
        decreaseQty,
        CartItem
    }), [productDetail, CartItem, shopItems, productItems])

    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
}