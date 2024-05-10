import React, { useState } from "react";

function Buscador({ countries, setFilteredCountries }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredCountries = countries.filter((country) =>
      country.country.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por País"
        className="form-control"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Buscador;