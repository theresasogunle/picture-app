import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Photos from "../components/Photos/Photos";
import generateSpan from "../utils/generateSpan";
import Main from "./Main/Main";

const Search = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const search = location.state.search;

  const fetchPhotos = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}search/photos?query=${search}`,
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
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <Main>
      <header class="header">
        <div class="container">
          <h1 class="header__title">
            {loading
              ? "Searching "
              : photos.length === 0
              ? "No results "
              : "Search Results "}
            for{" "}
            <span class="header__title__search">
              "{search.charAt(0).toUpperCase() + search.slice(1)}"
            </span>
          </h1>
        </div>
      </header>
      <Photos isLoading={loading} photos={photos} />
    </Main>
  );
};

Search.propTypes = {
  location: PropTypes.object,
};
export default Search;
