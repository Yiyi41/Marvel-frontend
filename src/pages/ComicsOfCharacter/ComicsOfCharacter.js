import "./ComicsOfCharacter.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ComicsOfCharacter = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //j'envoie ma requête à vers serveur local avec l'id que j'ai récupéré ici avec useParams
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        // console.log(id);
        // console.log(response.data.comics);
        setData(response.data.comics);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="container">
      <div className="listComicsOfCharacterContainer">
        {data.map((comic, index) => {
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
              {comic.title ? (
                <div className="comic-title">{comic.title}</div>
              ) : (
                <div>Non Renseigné</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsOfCharacter;
