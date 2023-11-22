import { useCartStore } from "../state/cartData";

export default function SearchBox() {
  const { searchTerm, updateSearch } = useCartStore();

  const handleChange = (e) => {
    const filter = e?.target?.value || "";
    updateSearch(filter);
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
}
