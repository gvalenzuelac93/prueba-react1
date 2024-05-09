import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import './Tabla.css'; // Importar el archivo de estilos CSS personalizados

const Argentina = "./flags/Argentina.png"


function Tabla({ countries }) {
  const [sortedCountries, setSortedCountries] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(1); // 1 para ascender, -1 para descender

  useEffect(() => {
    setSortedCountries(countries);
  }, [countries]);

  const handleSort = (key) => {
    let direction = 1;
    if (key === sortKey) {
      direction = sortDirection === 1 ? -1 : 1;
    }

    const sorted = [...sortedCountries].sort((a, b) => {
      // Convierte posiciones en números para clasificación numérica
      if (key === 'position' || key === 'matches_played' || key === 'won' || key === 'tied' || key === 'losses' || key === 'goal_difference' || key === 'points') {
        if (key === 'points' && parseInt(a['points']) === parseInt(b['points'])) {  // Si estamos ordenando por puntos y los puntos son iguales, ordenar por diferencia de goles.
          return (parseInt(a['goal_difference']) - parseInt(b['goal_difference'])) * direction;
        }
        return (parseInt(a[key]) - parseInt(b[key])) * direction;
      }

      // Para otras keys, utiliza la comparación de strings.
      if (a[key] < b[key]) return -direction;
      if (a[key] > b[key]) return direction;

      

      return 0;
    });

    setSortedCountries(sorted);
    setSortKey(key);
    setSortDirection(direction === 1 ? 1 : -1); // Invertir la dirección si ya estaba ordenada por la misma clave
  };
  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('position')} className="filterable-header">País</th>
            <th onClick={() => handleSort('matches_played')} className="filterable-header">Jugados</th>
            <th onClick={() => handleSort('won')} className="filterable-header">Ganados</th>
            <th onClick={() => handleSort('tied')} className="filterable-header">Empates</th>
            <th onClick={() => handleSort('losses')} className="filterable-header">Perdidos</th>
            <th onClick={() => handleSort('goal_difference')} className="filterable-header">Dif. Gol</th>
            <th onClick={() => handleSort('points')} className="filterable-header">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((data, index) => (
            <tr key={index} className={data.position < 7 ? 'table-warning' : data.position === 7 ? 'table-primary' : (data.position >= 8 && data.position <= 10) ? '' : 'table-primary'}>
              <td className="text-start"><img src={`..assets/flags/${data.country}.svg`} alt={data.country} /> {data.position} {data.country}</td>
              <td>{data.matches_played}</td>
              <td>{data.won}</td>
              <td>{data.tied}</td>
              <td>{data.losses}</td>
              <td>{data.goal_difference}</td>
              <td>{data.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tabla;