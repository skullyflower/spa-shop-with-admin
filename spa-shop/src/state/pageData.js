async function getPageData(page) {
  return await fetch(`/data/${page}-data.json`)
    .then((str) => str.json())
    .then((data) => data);
}

export const siteData = await getPageData("site");
export const aboutData = await getPageData("about");
