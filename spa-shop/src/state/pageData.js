async function getPageData(page) {
  return await fetch(`/data/${page}-data.json`)
    .then((str) => str.json())
    .then((data) => data);
}
async function getPages() {
  return await fetch("/data/pages.json")
    .then((str) => str.json())
    .then((data) => {
      if (data.pages) return data.pages;
      else return [];
    });
}
export const siteData = await getPageData("site");
export const aboutData = await getPageData("about");
export const blogData = await getPageData("blog");
export const pages = await getPages();
