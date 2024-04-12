const FilterSection = ({ handleCategoryChange, handleSearchChange }) => {
  return (
    <section className="filter-section">
      <div className="categories-filter">
        <label htmlFor="category-select">Choose a category:</label>

        <select
          name="catagories"
          id="category-select"
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <div className="search-box">
        <input type="search" id="search-box" onChange={handleSearchChange} />
      </div>
    </section>
  );
};

export default FilterSection;
