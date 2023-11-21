import { create } from "zustand";
import { products } from "./shopData";
// uses localStorage

const getStoredCart = () => {
  const cartHash = localStorage.sf_cartData;
  return cartHash ? JSON.parse(cartHash) : {};
};

const getCartProds = () => {
  const cartHash = getStoredCart();
  if (cartHash) {
    var cartTotal = 0;
    var cartUSShip = 0;
    var cartHandle = 0;
    let cart_products = [];
    let cartcount = 0;

    var cartids = Object.keys(cartHash);
    cartids = cartids.filter(
      //remove discontinued products and zero quantities.
      (cid) =>
        cid.length > 0 &&
        products.length > 0 &&
        cartHash[cid] > 0 &&
        products.find((prod) => prod.cat.includes(cid)) !== undefined,
    );
    cartids.forEach((id) => {
      let product = products.find((prod) => prod.id === id);
      let prodQTY = cartHash[id];
      let prodTot = prodQTY * product.price;
      cartTotal += prodTot;
      cartUSShip += product.weight > 0 ? prodTot * 0.2 + product.handling : 0;
      cartHandle += product.handling;
      cartcount += prodQTY;
      cart_products.push({ ...product, qty: prodQTY });
    });
    return {
      cart_products: cart_products,
      cart_total: cartTotal,
      shipping: cartUSShip,
      handling: cartHandle,
      cart_count: cartcount,
      cartopen: false,
    };
  }
};

const getCartCount = (cartHash) => {
  let vals = Object.values(cartHash);
  return vals.length > 0
    ? vals.reduce((total, num) => {
        return total + num;
      })
    : 0;
};

const updateCartStorage = (cartHash) => {
  if (localStorage) {
    localStorage.sf_cartData = JSON.stringify(filterCart(cartHash));
  }
};

const filterCart = (cartHash) => {
  //getting rid of zeros.
  let cartids = Object.keys(cartHash);
  let filteredHash = {};
  for (let i = 0; i < cartids.length; i++) {
    let cid = cartids[i];
    if (cartHash[cid] > 0) {
      filteredHash[cid] = cartHash[cid];
    }
  }
  return filteredHash;
};

const addToCart = (itemId, openCart) => {
  var cartHash = getStoredCart();
  let itemcount = cartHash[itemId] || 0;
  cartHash[itemId] = itemcount + 1;
  updateCartStorage(cartHash);
  const cartprods = getCartProds(cartHash);
  return {
    ...cartprods,
    cartopen: openCart,
  };
};

const deleteFromCart = (itemId, openCart) => {
  var cartHash = getStoredCart();
  cartHash[itemId] = cartHash[itemId] ? cartHash[itemId] - 1 : 0;
  updateCartStorage(cartHash);
  const cartprods = getCartProds(cartHash);
  return {
    ...cartprods,
    cartopen: openCart,
  };
};

const emptyCart = () => {
  const oldCart = getCartProds(getStoredCart());
  updateCartStorage({});
  return {
    cartobj: {},
    ...oldCart.cart_details,
    cart_count: 0,
    cartopen: false,
  };
};

const cart_details = getCartProds();

export const useCartStore = create((set) => ({
  ...cart_details,
  cartopen: false,
  prodsort: "-date",
  updateSort: (sort) => set((state) => ({ prodshort: sort })),
  searchTerm: "",
  updateSearch: (term) => set((state) => ({ searchTerm: term })),
  addToCart: (pid, opencart) => set((state) => addToCart(pid, opencart)),
  deleteFromCart: (itemId, openCart) => set((state) => deleteFromCart(itemId, openCart)),
  emptyCart: () => set((state) => emptyCart()),
  closeCart: () => set((state) => ({ cartopen: false })),
}));
