import { create } from "zustand";
import { products } from "./shopData";
// uses localStorage

const getStoredCart = () => {
  const cartHash = localStorage.spa_cartData;
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

    const cartids = Object.keys(cartHash)
      .filter(
        //remove discontinued products and zero quantities.
        (pid) =>
          pid.length > 0 &&
          products.length > 0 &&
          cartHash[pid] > 0 &&
          products.find((prod) => prod.id === pid) !== undefined,
      )
      .forEach((id) => {
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

const updateCartStorage = (cartHash) => {
  if (localStorage) {
    localStorage.spa_cartData = JSON.stringify(filterCart(cartHash));
  }
};

const filterCart = (cartHash) => {
  //getting rid of zeros.
  const cartids = Object.keys(cartHash);
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
  const cartHash = getStoredCart();
  let itemcount = cartHash[itemId] || 0;
  cartHash[itemId] = itemcount + 1;
  updateCartStorage(cartHash);
  const cartprods = getCartProds(cartHash);
  return {
    cart_count: cartprods.cart_count,
    cart_products: cartprods.cart_products,
    cart_total: cartprods.cart_total,
    shipping: cartprods.shipping,
    handling: cartprods.handling,
    cartopen: openCart,
  };
};

const deleteFromCart = (itemId, openCart) => {
  var cartHash = getStoredCart();
  cartHash[itemId] = cartHash[itemId] ? cartHash[itemId] - 1 : 0;
  updateCartStorage(cartHash);
  const cartprods = getCartProds(cartHash);
  return {
    cart_count: cartprods.cart_count,
    cart_products: cartprods.cart_products,
    cart_total: cartprods.cart_total,
    shipping: cartprods.shipping,
    handling: cartprods.handling,
    cartopen: openCart,
  };
};

const emptyCart = () => {
  const oldCart = getCartProds(getStoredCart());
  updateCartStorage({});
  return {
    cart_count: 0,
    cart_products: [],
    cart_total: 0,
    shipping: 0,
    handling: 0,
    cartopen: false,
  };
};

const cart_details = getCartProds();

export const useCartStore = create((set) => ({
  cart_count: cart_details.cart_count,
  cart_products: cart_details.cart_products,
  cart_total: cart_details.cart_total,
  shipping: cart_details.shipping,
  handling: cart_details.handling,
  cartopen: false,
  prodsort: "-date",
  updateSort: (sort) => set((state) => ({ prodshort: sort })),
  searchTerm: "",
  updateSearch: (term) => set((state) => ({ searchTerm: term })),
  addToCart: (pid, opencart) => set((state) => ({ ...addToCart(pid, opencart) })),
  deleteFromCart: (itemId, openCart) => set((state) => ({ ...deleteFromCart(itemId, openCart) })),
  emptyCart: () => set((state) => ({ ...emptyCart() })),
  closeCart: () => set((state) => ({ cartopen: false })),
  topnavexpanded: true,
  shopnavevisible: true,
  changeTopNavVisible: (onoff) => set((state) => ({ topnavexpanded: onoff })),
}));
