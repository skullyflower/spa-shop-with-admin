import arraySort from "array-sort";

export const initializeShop = async () => {
  return await fetch("/data/shop.json")
    .then((data) => data.json())
    .then((shopdata) => {
      let all_products = {};
      let old_products = {};
      shopdata.products.forEach((prod) => {
        all_products[prod.id] = prod;
        if (prod.oldId) old_products[prod.oldId] = prod;
      });
      return {
        products: { ...all_products, oldProds: old_products },
        categories: shopdata.categories,
        designs: shopdata.designs,
        sale: shopdata.sale,
      };
    });
};

export const getCategory = async (catid) => {
  let allcats = await getAllCategories();
  if (allcats[catid]) {
    return allcats[catid];
  }
  return allcats["special"];
};

export const getDesign = async (catid) => {
  let designs = await getAllDesigns();
  let allcats = designs;
  if (allcats[catid]) {
    return allcats[catid];
  }
  return allcats["special"];
};

export const getSubCatIdList = (masterCat, cat) => {
  let catlist = ["special"];
  if (cat && masterCat) {
    catlist = masterCat.subcat;
    if (catlist.length > 0) {
      return catlist;
    }
    return [cat];
  }
  return catlist;
};

export const getAllCategories = async () => {
  return await fetch("/data/shop.json")
    .then((str) => str.json())
    .then((data) => data.categories);
};

export const getAllCatIds = async () => {
  return await getAllCategories().then((data) => Object.keys(data));
};

export const getAllDesigns = async () => {
  return await fetch("/data/shop.json")
    .then((str) => str.json())
    .then((data) => data.designs);
};

export const getSuperCats = (catsobj) => {
  if (catsobj) {
    let cats = arraySort(Object.keys(catsobj), "name");
    let newcats = [];
    newcats = cats.map((cat) => {
      return catsobj[cat].subcat.length > 0 ? catsobj[cat] : null;
    });
    return newcats.filter((ncat) => ncat != null);
  }
};
export const getRegularCats = (catsobj) => {
  if (catsobj) {
    let cats = arraySort(Object.keys(catsobj), "name");
    let newcats = [];
    newcats = cats.map((cat) => {
      return catsobj[cat].subcat.length === 0 ? catsobj[cat] : null;
    });
    return newcats.filter((ncat) => ncat != null);
  }
};

export const saleRunning = async () => {
  return await fetch("/data/shop.json")
    .then((str) => str.json())
    .then((data) => data.sale);
};
export const stateSetter = (context) => {
  var cancelled = false;
  return {
    cancel: function () {
      cancelled = true;
    },
    setState(newState) {
      if (!cancelled) {
        context.setState(newState);
      }
    },
  };
};
const sortList = (listOprods, sortby) => {
  switch (sortby) {
    case "name":
      return arraySort(listOprods, "name");
    case "date":
      return arraySort(listOprods, "date");
    case "-date":
      return arraySort(listOprods, "date", { reverse: true });
    case "price":
      return arraySort(listOprods, "price");
    case "-price":
      return arraySort(listOprods, "price", { reverse: true });
    default:
      return arraySort(listOprods, "date", { reverse: true });
  }
};
const getRandomSlice = (list) => {
  var random = (Math.random() * 3).toFixed(1) * 10;
  var maxrand = list.length - 3;
  return random <= maxrand ? list.slice(random, random + 3) : list.slice(0, 3);
};
export const filterRandomResults = (prods, limited, pid, sortby) => {
  const prods_minus_prod = pid ? prods.filter((prod) => prod.id !== pid) : prods;
  const prod_list = limited ? getRandomSlice(prods_minus_prod) : prods_minus_prod;
  return sortList(prod_list, sortby);
};
