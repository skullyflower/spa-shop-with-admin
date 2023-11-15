// SEO for one page app
export default function updateHead(page_title, description) {
  const pageDescription = description;
  document.getElementsByTagName("meta")["description"].content = pageDescription?.replaceAll(
    /<[^>]*>/g,
    "",
  );
  const pageTitle = page_title;
  document.title = `${pageTitle}`;
}
