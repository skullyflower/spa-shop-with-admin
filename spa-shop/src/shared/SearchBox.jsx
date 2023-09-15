import { updateSearch } from "../data/searchSlice";
import { useSelector, useDispatch } from "react-redux";

export const SearchBox = () => {
  // need to convert to useContext
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.search_filter);

  const handleChange = (e) => {
    const filter = e?.target?.value || "";
    dispatch(updateSearch({ search_filter: filter }));
  };

  return (
    <div id="search-box">
      <label htmlFor="search-box">Search:</label>{" "}
      <input
        name="search-box"
        onChange={handleChange}
        value={searchTerm}
      />
      <span
        onClick={handleChange}
        title="clear search">
        x
      </span>
    </div>
  );
};
