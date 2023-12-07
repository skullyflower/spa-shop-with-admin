import { siteData } from "../state/pageData";

// SEO for one page app
export default function useUpdateHead(new_title, new_description) {
  //defauts
  const { company_name, page_title, page_description } = siteData;
  //update title
  const workingTitle = new_title ? new_title : page_title;
  const fullPageTitle = workingTitle.includes(company_name)
    ? workingTitle
    : `${workingTitle} - ${company_name}`;
  const currentPageTitle = document.title;
  if (currentPageTitle !== fullPageTitle) document.title = `${fullPageTitle}`;
  // update description
  const workingDescription = new_description ? new_description : page_description;
  const cleanDescription = workingDescription.replaceAll(/<[^>]*>/g, "");
  const currentDescription = document.getElementsByTagName("meta")["description"].content;
  if (currentDescription !== cleanDescription) {
    document.getElementsByTagName("meta")["description"].content = cleanDescription;
  }
}
