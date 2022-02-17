import "./Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="container">
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
    </div>
  );
};

export default Comics;
