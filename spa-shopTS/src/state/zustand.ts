import { create } from "zustand";
import { addToCart, deleteFromCart, emptyCart, getCartProds } from "@/state/cartData";
import { getSiteData, getAboutData, getBlogData, site, page, blog, themes } from "@/state/pageData";
import { categoriesType, getAllCategories, getAllProducts, getAllSubjects, productType } from "@/state/shopData";
import { GalleryObject, setgalleries } from "@/state/galleryData";


type StoreState = {
  siteData: site
  aboutData: page
  blogData: blog | undefined
  products: productType[]
  categories: categoriesType
  subjects: categoriesType
  cart_count: number
  cart_products: productType[]
  cart_total: number
  shipping: number
  handling: number
  cartopen: boolean
  prodsort: string
  updateSort: (sort: string) => void
  searchTerm?: string
  updateSearch: (term: string) => void
  addToCart: (pid: string, opencart: boolean) => void
  deleteFromCart: (itemId: string, openCart: boolean) => void
  emptyCart: () => void
  closeCart: () => void
  galleries: GalleryObject
  topnavexpanded: boolean
  shopnavevisible: boolean
  createStoreFromData: () => void
  changeTopNavVisible: (onoff: boolean) => void
  changeShopNavVisible: (onoff: boolean) => void
  setTheme: (theme: themes) => void
}

const emptySite = {
  page_title: '',
  page_description: '',
  company_name: '',
  live_site_url: '',
  sitelogo: '',
  page_content: '',
  newsitelogo: '',
  site_theme: themes.skullyflower
}
const emptyPage = {
  page_title: '',
  page_description: '',
  page_content: ''
}

const useSiteStore = create<StoreState>((set, get) => ({
  siteData: emptySite,
  aboutData: emptyPage,
  blogData: undefined,
  products: [],
  categories: [],
  subjects: [],
  cart_count: 0,
  cart_products: [],
  cart_total: 0,
  shipping: 0,
  handling: 0,
  cartopen: false,
  prodsort: "-date",
  searchTerm: "",
  galleries: undefined,

  createStoreFromData: async () => {
    const get_cart_details = getCartProds();
    const get_siteData = getSiteData();
    const get_aboutData = getAboutData();
    const get_blogData = getBlogData();
    const get_products = getAllProducts();
    const get_categories = getAllCategories();
    const get_subjects = getAllSubjects();
    const get_galleries = setgalleries();

    const allData = await Promise.allSettled([
      get_cart_details,
      get_siteData,
      get_aboutData,
      get_blogData,
      get_products,
      get_categories,
      get_subjects,
      get_galleries
    ])
    const hasError = allData.some(result => result.status === 'rejected');
    if (hasError) {
      console.error("Error fetching data", ...allData);
      return;
    }
    const [
      cartDetailsResult,
      siteDataResult,
      aboutDataResult,
      blogDataResult,
      productsResult,
      categoriesResult,
      subjectsResult,
      galleriesResult
    ] = allData;

    set(() => ({
      siteData: siteDataResult.status === 'fulfilled' ? siteDataResult.value : emptySite,
      cart_count: cartDetailsResult.status === 'fulfilled' ? cartDetailsResult.value.cart_count : 0,
      cart_products: cartDetailsResult.status === 'fulfilled' ? cartDetailsResult.value.cart_products : [],
      cart_total: cartDetailsResult.status === 'fulfilled' ? cartDetailsResult.value.cart_total : 0,
      shipping: cartDetailsResult.status === 'fulfilled' ? cartDetailsResult.value.shipping : 0,
      handling: cartDetailsResult.status === 'fulfilled' ? cartDetailsResult.value.handling : 0,
      aboutData: aboutDataResult.status === 'fulfilled' ? aboutDataResult.value : emptyPage,
      blogData: blogDataResult.status === 'fulfilled' ? blogDataResult.value : undefined,
      products: productsResult.status === 'fulfilled' ? productsResult.value : [],
      categories: categoriesResult.status === 'fulfilled' ? categoriesResult.value : [],
      subjects: subjectsResult.status === 'fulfilled' ? subjectsResult.value : [],
      galleries: galleriesResult.status === 'fulfilled' ? galleriesResult.value : {}
    }));

  },

  updateSort: (sort: string) => set(() => ({ prodsort: sort })),
  updateSearch: (term: string) => set(() => ({ searchTerm: term })),
  addToCart: async (pid: string, opencart: boolean) => {
    const newCart = await addToCart(pid, opencart)
    set(({
      ...newCart
    }))
  },
  deleteFromCart: async (itemId: string, openCart: boolean) => {
    const newCart = await deleteFromCart(itemId, openCart)
    set(({ ...newCart }))
  },
  emptyCart: () => set(() => ({ ...emptyCart() })),
  closeCart: () => set(() => ({ cartopen: false })),
  topnavexpanded: false,
  shopnavevisible: false,
  changeTopNavVisible: (onoff: boolean) => set(() => ({ topnavexpanded: onoff })),
  changeShopNavVisible: (onoff: boolean) => set(() => ({ shopnavevisible: onoff })),
  setTheme: (theme: themes) => {
    const oldSite = get().siteData || emptySite;
    return set(() => ({ siteData: ({ ...oldSite, site_theme: theme }) }))
  }
})
);

export default useSiteStore;
