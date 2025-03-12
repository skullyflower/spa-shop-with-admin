export enum themes {
  halloween = 'halloween',
  skullyflower = 'skullyflower'
}

export type site = {
  page_title: string
  page_description: string
  company_name: string
  live_site_url: string
  sitelogo: string,
  page_content: string
  newsitelogo?: string
}

export async function getSiteData(): Promise<site> {
  const response = await fetch(`/data/site-data.json`);
  if (response.ok) {
    const siteData: site = await response.json();
    return siteData
  }
  return {
    page_title: '',
    page_description: '',
    company_name: '',
    live_site_url: '',
    sitelogo: '',
    page_content: '',
  }
}

export type page = {
  page_title: string
  page_description: string
  page_content: string
}

export async function getAboutData(): Promise<page> {
  const response = await fetch(`/data/about-data.json`);
  if (response.ok) {
    const pageData: page = await response.json();
    return pageData
  }
  return {
    page_title: '',
    page_description: '',
    page_content: ''
  }
}

export type entry = {
  id: string
  date: string
  title: string
  imagelink: string
  image: string
  imagealt: string
  imgcaption: string
  heading: string
  text: string
  newImage?: FileList
}
export type blog = {
  page_title: string,
  page_description: string,
  page_content: string
  entries: entry[]
}
export async function getBlogData(): Promise<blog> {
  const response = await fetch(`/data/blog-data.json`);
  if (response.ok) {
    const blogData: blog = await response.json();
    return blogData;
  }
  return {
    page_title: '',
    page_description: '',
    page_content: '',
    entries: []
  }

}
