import "./Characters-Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const limit = 100;
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${search}&page=${pageNumber}&limit=${limit}`
        );
        // console.log(response.data.results[0]); //recois bien la data
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, pageNumber, limit]);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="RECHERCHE"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="charactersContainer">
        {data.results.map((character, index) => {
          return (
            //le chemin: comics/:id, il attend id du personnage, ici je lui passe à chaque tour de .map
            <Link
              className="characterCard"
              key={character._id}
              to={"/comics/" + character._id}
            >
              <div className="characterImg-container">
                {/* <i class="fa-regular fa-heart"></i> */}
                {character.thumbnail.path ? (
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                ) : (
                  <p>No picture</p>
                )}
              </div>
              {character.name ? (
                <div className="character-name">{character.name}</div>
              ) : (
                <div>Non Renseigné</div>
              )}
              {character.description ? (
                <div className="description-container">
                  {character.description}
                </div>
              ) : (
                <div className="description-container">
                  Description non Renseigné
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div className="pagination-container">
        <button
          onClick={() => {
            pageNumber > 1 && setPageNumber(pageNumber - 1);
          }}
        >
          Précédent
        </button>
        <p>{pageNumber}</p>
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Characters;
