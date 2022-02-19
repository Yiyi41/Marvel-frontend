import "./Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="container">
      <input
        type="text"
        placeholder="Recherche"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div className="comicsContainer">
        {data.results.map((comic, index) => {
          return (
            <div key={comic._id} className="comicCard">
              <div>
                {comic.thumbnail.path ? (
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                ) : (
                  <p>No picture</p>
                )}
              </div>
              {comic.title ? <p>{comic.title}</p> : <p>Non renseigné</p>}
              {comic.description ? (
                <p>{comic.description}</p>
              ) : (
                // <button
                //   onClick={() => {
                //     <p>{comic.description}</p>;
                //   }}
                // >
                //   Description
                // </button>
                <p>Non renseigné</p>
              )}
            </div>
          );
        })}
      </div>
      <button>Page suivante</button>
      <button>Page précédente</button>
    </div>
  );
};

export default Comics;
