// SEO for one page app
export default function updateHead(page_title: string, description: string | undefined) {
  const pageDescription = description
    ? description
    : "The Creepy Art and Comics of Dragon Messmer, your source for some of the most unique, creepy art, handmade gifts on the web. Come meet Skully Flower, see the creepy drawings, read funny comics about ghosts and monsters, and treat yourself to a little special something. ";

  document.getElementsByName("meta").forEach((ele) => {
    if (ele.getAttribute('name') === "description")
      ele.setAttribute("content", pageDescription.replace(
        /<[^>]*>/g,
        "",
      ));
  });

  const pageTitle = page_title.includes("SkullyFlower")
    ? page_title
    : `${page_title} - SkullyFlower`;
  document.title = `${pageTitle}`;
}