
import { useGlobalContext } from "./GlobalContext";

const SearchForm = () => {
  const { isDarkTheme,setSearchTerm } = useGlobalContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
    console.log(searchValue);
  };
  
  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h1>unsplash images</h1>
      <form className="form">
        <input type="text" name="search" placeholder="cat" className={isDarkTheme?'dark-theme-input':''}/>
        <button className="submit-btn">Search</button>
      </form>
    </div>
  );
};
export default SearchForm;
