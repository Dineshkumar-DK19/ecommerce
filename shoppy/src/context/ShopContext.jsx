import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const addToCart = async (itemId, sizes) => {
    if (!sizes  || sizes === "undefined") {
      toast.error("Select Product sizes");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][sizes]) {
        cartData[itemId][sizes] += 1;
      } else {
        cartData[itemId][sizes] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][sizes] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, sizes },
          { headers: { token } }
        );
        //console.log(backendUrl);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          //console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, sizes, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][sizes] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, sizes, quantity },
          { headers: { token ,  "Content-Type": "application/json"} }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          //console.log(error.message);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      // should log http://localhost:4000

      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        //console.log("Fetched products:", response.data.product);
        setProducts(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //console.log(error.message);
      toast.error(error.message);
    }
  };

const getUserCart = async () => {
  try {
    //console.log("📦 Fetching user cart...");
    //console.log("🔑 Token being sent:", token || "(no token found)");

    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {},
      { headers: { token } }
    );

    //console.log("📥 Raw response data:", response.data);

    if (response.data.success) {
      //console.log("✅ Cart data received:", response.data.cartData);
      setCartItems(response.data.cartData);
    } else {
      //console.warn("⚠️ Backend returned an error:", response.data.message);
    }
  } catch (error) {
    //console.error("❌ Error fetching cart:", error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    getProductsData();
    // or setProducts response
  }, []);



  useEffect(() => {
  if (token) {
    getUserCart();
  }
}, [token])


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    getUserCart
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
