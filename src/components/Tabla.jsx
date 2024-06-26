import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./Tabla.css";

function Tabla({ countries }) {
  const [sortedCountries, setSortedCountries] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);

  useEffect(() => {
    setSortedCountries(countries);
  }, [countries]);

  const handleSort = (key) => {
    let direction = 1;
    if (key === sortKey) {
      direction = sortDirection === 1 ? -1 : 1;
    }

    const sorted = [...sortedCountries].sort((a, b) => {
      if (
        key === "position" ||
        key === "matches_played" ||
        key === "won" ||
        key === "tied" ||
        key === "losses" ||
        key === "goal_difference" ||
        key === "points"
      ) {
        if (
          key === "points" &&
          parseInt(a["points"]) === parseInt(b["points"])
        ) {
          return (
            (parseInt(a["goal_difference"]) - parseInt(b["goal_difference"])) *
            direction
          );
        }
        return (parseInt(a[key]) - parseInt(b[key])) * direction;
      }

      if (a[key] < b[key]) return -direction;
      if (a[key] > b[key]) return direction;

      return 0;
    });

    setSortedCountries(sorted);
    setSortKey(key);
    setSortDirection(direction === 1 ? 1 : -1);
  };
  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("position")}
              className="filterable-header"
            >
              País
            </th>
            <th
              onClick={() => handleSort("matches_played")}
              className="filterable-header"
            >
              Jugados
            </th>
            <th onClick={() => handleSort("won")} className="filterable-header">
              Ganados
            </th>
            <th
              onClick={() => handleSort("tied")}
              className="filterable-header"
            >
              Empates
            </th>
            <th
              onClick={() => handleSort("losses")}
              className="filterable-header"
            >
              Perdidos
            </th>
            <th
              onClick={() => handleSort("goal_difference")}
              className="filterable-header"
            >
              Dif. Gol
            </th>
            <th
              onClick={() => handleSort("points")}
              className="filterable-header"
            >
              Puntos
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((data, index) => (
            <tr
              key={index}
              className={
                data.position < 7
                  ? "table-warning"
                  : data.position === 7
                  ? "table-primary"
                  : data.position >= 8 && data.position <= 10
                  ? ""
                  : "table-primary"
              }
            >
              <td
                id="iconos"
                className="text-start"
                style={{ backgroundImage: `url('/img/${data.country}.svg')` }}
              >
                {" "}
                {data.position} {data.country}
              </td>
              <td className="text-center align-middle">
                {data.matches_played}
              </td>
              <td className="text-center align-middle">{data.won}</td>
              <td className="text-center align-middle">{data.tied}</td>
              <td className="text-center align-middle">{data.losses}</td>
              <td className="text-center align-middle">
                {data.goal_difference}
              </td>
              <td className="text-center align-middle">{data.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tabla;
