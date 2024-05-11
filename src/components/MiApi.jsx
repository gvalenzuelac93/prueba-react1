import React, { useState, useEffect } from "react";
import Tabla from "./Tabla";
import Header from "./Header";
import Footer from "./Footer";

function MiApi() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://conmebol-api.vercel.app/api/classification"
        );
        const data = await response.json();
        setCountries(data.results);
        setFilteredCountries(data.results);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleFilteredCountries = (filteredCountries) => {
    setFilteredCountries(filteredCountries);
  };

  return (
    <div>
      <Header
        countries={countries}
        setFilteredCountries={handleFilteredCountries}
      />
      <div id="contenido">
        <Tabla countries={filteredCountries} />
      </div>
      <Footer />
    </div>
  );
}

export default MiApi;
