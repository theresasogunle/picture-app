import { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import PhotoModal from "../PhotoModal/PhotoModal";
import "./Photos.scss";
import Loader from "../Loader/Loader";

const Photos = memo(({ isLoading, photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handleCloseModal = useCallback(() => setSelectedPhoto(null), []);

  return (
    <div className="container">
      {!isLoading ? (
        <div className="images">
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{ gridRowEnd: `span ${photo.spanLength}` }}
              className="images__item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.urls.small} alt={photo?.description || "Photo"} />
              <div className="overlay" />
              <div className="info">
                <h3 className="info__name">
                  {photo.user.first_name} {photo.user.last_name}
                </h3>
                <p className="info__location">{photo.user.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="images">
          <Loader />
        </div>
      )}
      <PhotoModal onClose={handleCloseModal} data={selectedPhoto} />
    </div>
  );
});

Photos.propTypes = {
  isLoading: PropTypes.bool,
  photos: PropTypes.array,
};

export default Photos;
