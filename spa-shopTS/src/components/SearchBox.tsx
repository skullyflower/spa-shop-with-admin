import useSiteStore from "@/state/zustand";
import { ChangeEvent } from "react";

export const SearchBox = () => {
  const { updateSearch, searchTerm } = useSiteStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filter = e?.target?.value || "";
    updateSearch(filter);
  };

  return (
    <div id="search-box">
      <label htmlFor="search-box">Search:</label>
      <input
        name="search-box"
        onChange={handleChange}
        value={searchTerm}
      />
      <span
        onClick={() => updateSearch("")}
        title="clear search">
        x
      </span>
    </div>
  );
};
