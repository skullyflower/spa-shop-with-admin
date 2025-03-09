import { getAllProducts, productType } from "@/state/shopData";
// uses localStorage

const getStoredCart = () => {
  const cartHash = localStorage.spa_cartData;
  return cartHash ? JSON.parse(cartHash) : {};
};

export type cartObj = {
  cart_products: productType[],
  cart_total: number,
  shipping: number,
  handling: number,
  cart_count: number,
  cartopen: boolean,
}
type cartHashType = { [key: string]: number }

const emptyCartObj = {
  cart_products: [],
  cart_total: 0,
  shipping: 0,
  handling: 0,
  cart_count: 0,
  cartopen: false,
}

export const getCartProds = async (): Promise<cartObj> => {
  const products = await getAllProducts();
  const cartHash: cartHashType = getStoredCart();
  if (cartHash) {
    let cartTotal = 0;
    let cartUSShip = 0;
    let cartHandle = 0;
    const cart_products = [] as productType[];
    let cartcount = 0;

    Object.keys(cartHash)
      .filter(
        //remove discontinued products and zero quantities.
        (pid) =>
          pid.length > 0 &&
          products.length > 0 &&
          cartHash[pid] > 0 &&
          products.find((prod) => prod.id === pid) !== undefined,
      )
      .forEach((id) => {
        const product: productType | undefined = products.find((prod) => prod.id === id);
        if (product) {
          const prodQTY: number = cartHash[id];
          const prodTot = prodQTY * (product.price | 0);
          cartTotal += prodTot;
          cartUSShip += product.weight > 0 ? prodTot * 0.2 + product.handling : 0;
          cartHandle += product.handling;
          cartcount += prodQTY;
          cart_products.push({ ...product, qty: prodQTY });
        }
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
  return emptyCartObj
};

export const updateCartStorage = (cartHash: cartHashType) => {
  if (localStorage) {
    localStorage.spa_cartData = JSON.stringify(filterCart(cartHash));
  }
};

export const filterCart = (cartHash: cartHashType) => {
  //getting rid of zeros.
  const cartids = Object.keys(cartHash);
  const filteredHash: cartHashType = {};
  for (let i = 0; i < cartids.length; i++) {
    const cid = cartids[i];
    if (cartHash[cid] > 0) {
      filteredHash[cid] = cartHash[cid];
    }
  }
  return filteredHash;
};

export const addToCart = async (itemId: string, openCart: boolean): Promise<cartObj> => {
  const cartHash = getStoredCart();
  const itemcount = cartHash[itemId] || 0;
  cartHash[itemId] = itemcount + 1;
  updateCartStorage(cartHash);
  const cartprods = await getCartProds();
  if (cartprods) {
    return {
      cart_count: cartprods.cart_count,
      cart_products: cartprods.cart_products,
      cart_total: cartprods.cart_total,
      shipping: cartprods.shipping,
      handling: cartprods.handling,
      cartopen: openCart,
    };
  }
  return emptyCartObj
};

export const deleteFromCart = async (itemId: string, openCart: boolean): Promise<cartObj> => {
  const cartHash = getStoredCart();
  cartHash[itemId] = cartHash[itemId] ? cartHash[itemId] - 1 : 0;
  updateCartStorage(cartHash);
  const cartprods = await getCartProds();
  if (cartprods)
    return {
      cart_count: cartprods.cart_count,
      cart_products: cartprods.cart_products,
      cart_total: cartprods.cart_total,
      shipping: cartprods.shipping,
      handling: cartprods.handling,
      cartopen: openCart,
    };
  return emptyCartObj
};

export const emptyCart = (): cartObj => {
  updateCartStorage({});
  return emptyCartObj;
};
