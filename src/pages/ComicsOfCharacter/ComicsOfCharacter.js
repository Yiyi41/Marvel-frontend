import "./ComicsOfCharacter.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ComicsOfCharacter = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics/${id}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return <div>Hello</div>;
};

export default ComicsOfCharacter;
