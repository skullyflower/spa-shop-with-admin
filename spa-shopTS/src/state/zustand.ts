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

    const allData = await Promise.all([
      get_cart_details,
      get_siteData,
      get_aboutData,
      get_blogData,
      get_products,
      get_categories,
      get_subjects,
      get_galleries
    ]);

    enum keys {
      cart = 0,
      site = 1,
      about = 2,
      blog = 3,
      prod = 4,
      cat = 5,
      sub = 6,
      gall = 7
    }

    set(() => ({
      siteData: allData[keys.site], cart_count: allData[keys.cart].cart_count || 0, cart_products: allData[keys.cart].cart_products || [], cart_total: allData[keys.cart].cart_total,
      shipping: allData[keys.cart].shipping,
      handling: allData[keys.cart].handling,
      aboutData: allData[keys.about],
      blogData: allData[keys.blog], products: allData[keys.prod], categories: allData[keys.cat], subjects: allData[keys.sub], galleries: allData[keys.gall]
    }))
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
