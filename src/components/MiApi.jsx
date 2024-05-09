import React, { useState, useEffect } from "react";
import Tabla from './Tabla';
import Buscador from './Buscador';

function MiApi() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://conmebol-api.vercel.app/api/classification");
        const data = await response.json();
        setCountries(data.results);
        setFilteredCountries(data.results); // Inicialmente, mostrar todos los países
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
      <Buscador countries={countries} setFilteredCountries={handleFilteredCountries} />
      <Tabla countries={filteredCountries} />
      </div>
  );
}

export default MiApi;