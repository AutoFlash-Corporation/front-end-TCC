import React, { useState } from "react";
import styles from "../styles/searchbar.module.css"; // Estilo do componente, se necessário

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Envia a pesquisa para a função pai
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Pesquisar..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L18.0319 16.6177Z"
            fill="#6F767E"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
