import { useCartStore } from "../state/cartData";

const SortBox = () => {
  const { prodsort, updateSort } = useCartStore();

  const updateSortValue = (e) => {
    const sort_string = e.target?.value || "-date";
    updateSort(sort_string);
  };

  return (
    <div id="sort-box">
      <label htmlFor="sort-box">Sort by: </label>
      <select
        name="sort-box"
        onChange={updateSortValue}
        defaultValue={prodsort}>
        <option value="-date">Newest</option>
        <option value="name">Name</option>
        <option value="price">Least Expensive</option>
        <option value="-price">Most Expensive</option>
      </select>
    </div>
  );
};
export default SortBox;
