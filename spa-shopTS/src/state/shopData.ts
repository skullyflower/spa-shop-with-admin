import arraySort from "array-sort";

export type productType = {
  id: string;
  date: string;
  name: string;
  soldout: boolean
  price: number
  img: string
  desc: string
  desc_long: string
  weight: number
  handling: number
  altimgs: string[]
  special: boolean
  cats: string[]
  subjects: string[]
  qty?: number
  externalLink?: string
}

// this data doesn't change often
export const getAllProducts = async (): Promise<productType[]> => {
  const result = await fetch("/data/products.json")
    .then((str) => str.json())
    .then((data) => data.products);
  return await result;
};

export type categoryType = {
  id: string
  name: string
  img?: string
  description: string
  subcat?: string[]
}
export type categoriesType = categoryType[]

export const getAllCategories = async (): Promise<categoriesType> => {
  return await fetch("/data/categories.json")
    .then((str) => str.json())
    .then((data) => data.categories);
};
export const getAllSubjects = async (): Promise<categoriesType> => {
  return await fetch("/data/subjects.json")
    .then((str) => str.json())
    .then((data) => data.subjects);
};

export const getSaleRunning = async (): Promise<number> => {
  return await fetch("/data/sale.json")
    .then((str) => str.json())
    .then((data) => data);
};

const sortList = (listOprods: productType[], sortby: string) => {
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

const getRandomSlice = (list: productType[]) => {
  const random = (Math.random() * 3) * 10;
  const maxrand = list.length - 3;
  return random <= maxrand ? list.slice(random, random + 3) : list.slice(0, 3);
};

export const filterRandomResults = (prods: productType[], limited: boolean, pid: string, sortby: string) => {
  const prods_minus_prod = pid ? prods.filter((prod) => prod.id !== pid) : prods;
  const prod_list = limited ? getRandomSlice(prods_minus_prod) : prods_minus_prod;
  return sortList(prod_list, sortby);
};
