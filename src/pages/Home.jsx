import { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Main from "./Main/Main";
import Photos from "../components/Photos/Photos";
import generateSpan from "../utils/generateSpan";
import { ReactComponent as SearchIcon } from "../assets/svgs/search.svg";

const Home = ({ history }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}search/photos?query=African`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
        },
      }
    );
    data?.results.map((photo) => {
      photo.spanLength = generateSpan();
      return photo;
    });

    setPhotos(data?.results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const searchPhoto = useCallback(
    (event) => {
      if (event.key === "Enter") {
        history.push(`/search`, {
          search: event.target.value,
        });
      }
    },
    [history]
  );

  return (
    <Main>
      <header className="header">
        <div className="container">
          <div className="header__searchBox">
            <div className="header__searchBox__icon">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search for photo"
              onKeyUp={searchPhoto}
            />
          </div>
        </div>
      </header>
      <Photos isLoading={isLoading} photos={photos} />
    </Main>
  );
};

Home.propTypes = {
  history: PropTypes.object,
};
export default Home;
