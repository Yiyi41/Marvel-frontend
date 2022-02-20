import "./Characters-Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const limit = 100;
  const [pageNumber, setPageNumber] = useState(1);
  const [torefresh, setToRefresh] = useState(false);

  const isInFavoriteCharacters = (id) => {
    let favoriteCharactersStr = "";
    favoriteCharactersStr = Cookies.get("favoriteCharacters");
    if (favoriteCharactersStr === undefined) return false;
    let tabFavoriteCharacters = [];
    tabFavoriteCharacters = favoriteCharactersStr.split("^^");
    for (let i = 0; i < tabFavoriteCharacters.length; i++) {
      if (tabFavoriteCharacters[i] === id) return true;
    }
    return false;
  };

  const addToFavoriteCharacters = (id) => {
    let favoriteCharactersStr = "";
    favoriteCharactersStr = Cookies.get("favoriteCharacters");
    if (favoriteCharactersStr === undefined) favoriteCharactersStr = "";
    let tabFavoriteCharacters = favoriteCharactersStr.split("^^");
    for (let i = 0; i < tabFavoriteCharacters.length; i++) {
      if (tabFavoriteCharacters[i] === id) return;
    }
    if (favoriteCharactersStr !== "") {
      favoriteCharactersStr += "^^";
    }
    favoriteCharactersStr += id;
    Cookies.set("favoriteCharacters", favoriteCharactersStr);
    setToRefresh(!torefresh);
  };

  const removeFromFavoriteCharacters = (id) => {
    let favoriteCharactersStr = "";
    favoriteCharactersStr = Cookies.get("favoriteCharacters");
    if (favoriteCharactersStr === undefined) return false;
    let tabFavoriteCharacters = favoriteCharactersStr.split("^^");
    let newTabFavoriteCharacters = "";
    for (let i = 0; i < tabFavoriteCharacters.length; i++) {
      if (tabFavoriteCharacters[i] !== id) {
        if (newTabFavoriteCharacters !== "") {
          newTabFavoriteCharacters += "^^";
        }
        newTabFavoriteCharacters += tabFavoriteCharacters[i];
      }
    }
    Cookies.set("favoriteCharacters", newTabFavoriteCharacters);
    setToRefresh(!torefresh);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-marvel-backend-project.herokuapp.com/characters?name=${search}&page=${pageNumber}&limit=${limit}`
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
            <div className="characterCard" key={character._id}>
              <Link to={"/comics/" + character._id}>
                <div className="characterImg-container">
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
              </Link>

              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className={
                  isInFavoriteCharacters(character._id)
                    ? "favStar"
                    : "nonFavStar"
                }
                onClick={() => {
                  isInFavoriteCharacters(character._id)
                    ? removeFromFavoriteCharacters(character._id)
                    : addToFavoriteCharacters(character._id);
                }}
              />
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
            </div>
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
