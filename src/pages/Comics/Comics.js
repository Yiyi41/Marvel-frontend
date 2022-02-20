import "../Characters/Characters-Comics.css";
import "./Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const limit = 100;
  const [pageNumber, setPageNumber] = useState(1);
  const [torefresh, setToRefresh] = useState(false);

  const isInFavoriteComics = (id) => {
    let favoriteComicsStr = "";
    favoriteComicsStr = Cookies.get("favoriteComics");
    if (favoriteComicsStr === undefined) return false;
    let tabFavoriteComics = [];
    tabFavoriteComics = favoriteComicsStr.split("^^");
    for (let i = 0; i < tabFavoriteComics.length; i++) {
      if (tabFavoriteComics[i] === id) return true;
    }
    return false;
  };
  const addToFavoriteComics = (id) => {
    let favoriteComicsStr = "";
    favoriteComicsStr = Cookies.get("favoriteComics");
    if (favoriteComicsStr === undefined) favoriteComicsStr = "";
    let tabFavoriteComics = favoriteComicsStr.split("^^");
    for (let i = 0; i < tabFavoriteComics.length; i++) {
      if (tabFavoriteComics[i] === id) return;
    }
    if (favoriteComicsStr !== "") {
      favoriteComicsStr += "^^";
    }
    favoriteComicsStr += id;
    Cookies.set("favoriteComics", favoriteComicsStr);
    setToRefresh(!torefresh);
  };
  const removeFromFavoriteComics = (id) => {
    let favoriteComicsStr = "";
    favoriteComicsStr = Cookies.get("favoriteComics");
    if (favoriteComicsStr === undefined) return false;
    let tabFavoriteComics = favoriteComicsStr.split("^^");
    let newTabFavoriteComics = "";
    for (let i = 0; i < tabFavoriteComics.length; i++) {
      if (tabFavoriteComics[i] !== id) {
        if (newTabFavoriteComics !== "") {
          newTabFavoriteComics += "^^";
        }
        newTabFavoriteComics += tabFavoriteComics[i];
      }
    }
    Cookies.set("favoriteComics", newTabFavoriteComics);
    setToRefresh(!torefresh);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-marvel-backend-project.herokuapp.com/comics?title=${search}&page=${pageNumber}&limit=${limit}`
        );
        // console.log(response.data);
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
          placeholder="Recherche"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="comicsContainer">
        {data.results.map((comic, index) => {
          return (
            <div key={comic._id} className="comicCard">
              <div className="comicImg-container">
                {comic.thumbnail.path ? (
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                ) : (
                  <p>No picture</p>
                )}
              </div>

              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className={
                  isInFavoriteComics(comic._id) ? "favStar" : "nonFavStar"
                }
                onClick={() => {
                  isInFavoriteComics(comic._id)
                    ? removeFromFavoriteComics(comic._id)
                    : addToFavoriteComics(comic._id);
                }}
              />
              {comic.title ? (
                <div className="comic-title">{comic.title}</div>
              ) : (
                <p>Non renseigné</p>
              )}
              {comic.description ? (
                <div className="description-container">{comic.description}</div>
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

export default Comics;
