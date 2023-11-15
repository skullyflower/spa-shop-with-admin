import products from "../shared/shop/products.json";
// uses localStorage

export const getStoredCart = () => {
  const cartObject = localStorage.sf_cartData;
  return cartObject ? JSON.parse(cartObject) : {};
};

export const getCartProds = () => {
  const cartobj = getStoredCart();
  if (cartobj) {
    var cartTotal = 0;
    var cartUSShip = 0;
    var cartHandle = 0;
    let cart_products = [];
    let cartcount = 0;

    var cartids = Object.keys(cartobj);
    cartids = cartids.filter((cid) => cid.length > 0 && products[cid] && cartobj[cid] > 0);
    cartids.forEach((id) => {
      let product = products[id];
      let prodQTY = cartobj[id];
      let prodTot = prodQTY * product.price;
      cartTotal += prodTot;
      cartUSShip += product.weight > 0 ? prodTot * 0.2 + product.handling : 0;
      cartHandle += product.handling;
      cartcount += prodQTY;
      cart_products.push({ ...product, qty: prodQTY });
    });
    return {
      cart_details: {
        cart_products: cart_products,
        cart_total: cartTotal,
        shipping: cartUSShip,
        handling: cartHandle,
      },
      cart_count: cartcount,
      cartopen: false,
    };
  }
};

export const getCartCount = () => {
  const cart = getStoredCart();

  let vals = Object.values(cart);
  return vals.length > 0
    ? vals.reduce((total, num) => {
        return total + num;
      })
    : 0;
};

const updateCartStorage = (cart) => {
  localStorage.sf_cartData = JSON.stringify(filterCart(cart));
};

const filterCart = (cartobj) => {
  //getting rid of zeros.
  let cartids = Object.keys(cartobj);
  let filteredCart = {};
  for (let i = 0; i < cartids.length; i++) {
    let cid = cartids[i];
    if (cartobj[cid] > 0) {
      filteredCart[cid] = cartobj[cid];
    }
  }
  return filteredCart;
};

export const addToCart = (itemId, openCart) => {
  const product = products[itemId];
  var cartObj = getStoredCart();
  let itemcount = cartObj[itemId] || 0;
  // cart limited to 5, Original art limited to 1.
  if (itemcount < 5 && !(product["cat"].indexOf("original_art") !== -1 && itemcount === 1)) {
    cartObj[itemId] = itemcount + 1;
  }
  updateCartStorage(cartObj);
  const cartprods = getCartProds(cartObj);
  return {
    ...cartprods,
    cartopen: openCart,
  };
};

export const deleteFromCart = (itemId, openCart) => {
  var cartobj = getStoredCart();
  cartobj[itemId] = cartobj[itemId] ? cartobj[itemId] - 1 : 0;
  updateCartStorage(cartobj);
  const cartprods = getCartProds(cartobj);
  return {
    ...cartprods,
    cartopen: openCart,
  };
};

export const emptyCart = () => {
  const oldCart = getCartProds(getStoredCart());
  updateCartStorage({});
  return {
    cartobj: {},
    cart_details: oldCart.cart_details,
    cart_count: 0,
    cartopen: false,
  };
};

export const closeCart = () => {
  this.setState(() => ({
    cartopen: false,
  }));
  window.scrollTo(0, 0);
};
