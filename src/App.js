import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header/Header";
import axios from "axios";
import pokeball from "./images/pokeball.png";
import { FaRunning } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [encounter, setEncounter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [pokebox, setPokebox] = useState([]);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 1007) + 1);

  useEffect(() => {
    getPokemonLists();
    getRandomEncounter();
  }, [randomNum]);

  // Fetch pokemon lists
  const getPokemonLists = () => {
    axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=1279",
    })
      .then(function (response) {
        setPokemon(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Fetch random encounter
  const getRandomEncounter = () => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${randomNum}`,
    })
      .then(function (response) {
        setEncounter(response.data);
        setIsLoading(false);
        console.log(encounter);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Change randomNum when Run button is pressed
  const handleRunBtn = () => {
    setRandomNum(Math.floor(Math.random() * 1007) + 1);
  };

  return (
    <>
      <div className="body-bg">
        <Header />
        {!isLoading ? (
          <div className={`encounter-field field-${encounter.types[0].type.name}`}>
            <img src={encounter.sprites.front_default} className="pokemon-img" alt="" />
          </div>
        ) : null}
        <p className="pokemon-text">
          You have encountered a wild <br />{" "}
          <span className="pokemon-name">
            {encounter.name} #{encounter.id}
          </span>
        </p>
        <div className="pokemon-types">
          {!isLoading
            ? encounter.types.map((e, i) => {
                return (
                  <div key={i} className={`btn-type ${e.type.name}`}>
                    {e.type.name}
                  </div>
                );
              })
            : null}
        </div>
        <div className="btn-group">
          <button className="btn-item" onClick={handleRunBtn}>
            Run <FaRunning />
          </button>
          <button className="btn-item">
            Catch <TbPokeball />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
