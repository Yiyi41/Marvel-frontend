import "./Characters.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        // console.log(response.data.results[0]); //recois bien la data
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
      <div className="charactersContainer">
        {data.results.map((character, index) => {
          return (
            <Link key={character._id} to={"/comics/:id"}>
              <div>
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
                <div>{character.name}</div>
              ) : (
                <div>Non Renseigné</div>
              )}
              {character.description ? (
                <div>{character.description}</div>
              ) : (
                <div>Description non Renseigné</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
