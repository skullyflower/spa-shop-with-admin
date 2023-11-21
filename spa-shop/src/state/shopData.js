import arraySort from "array-sort";

// this data doesn't change often
const getAllProducts = async () => {
  return await fetch("/data/products.json")
    .then((str) => str.json())
    .then((data) => data.products);
};
export const getAllCategories = async () => {
  return await fetch("/data/categories.json")
    .then((str) => str.json())
    .then((data) => data.categories);
};
export const getSaleRunning = async () => {
  return await fetch("/data/sale.json")
    .then((str) => str.json())
    .then((data) => data.sale);
};
export const products = await getAllProducts();
export const categories = await getAllCategories();
export const sale = await getSaleRunning();

export const getCategory = async (catid) => {
  const filteredCats = categories.filter((cat) => cat.id === catid);
  return filteredCats[0] ?? categories[0];
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
