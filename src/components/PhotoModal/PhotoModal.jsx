import { useEffect, useCallback, memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as CloseIcon } from "../../assets/svgs/close.svg";
import "./PhotoModal.scss";
import sleep from "../../utils/sleep";

const PhotoModal = memo(({ data, onClose }) => {
  const node = useRef();
  const [photo, setPhoto] = useState(null);
  const togglePhoto = useCallback(async () => {
    const photoModal = document.getElementById("photo-modal");
    const photoModalBody = document.getElementById("photo-modal-body");

    if (data) {
      setPhoto(data);
      document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
      photoModal.style.display = "flex";
      await sleep(100);
      photoModal.style.opacity = 1;
      photoModalBody.style.transform = "translateY(0)";
    } else {
      photoModalBody.style.transform = "translateY(120px)";
      photoModal.style.opacity = 0;
      await sleep(400);
      photoModal.style.display = "none";
      document.getElementsByTagName("BODY")[0].style.overflow = "unset";
    }
  }, [data]);

  useEffect(() => {
    togglePhoto();
  }, [togglePhoto]);

  const handleClickOutside = useCallback(
    (e) => {
      if (node.current?.contains(e.target)) {
        return;
      }
      // outside click
      onClose();
    },
    [node, onClose]
  );
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="modal" id="photo-modal">
      <div onClick={onClose} className="modal__close">
        <CloseIcon />
      </div>
      <div id="photo-modal-body" ref={node} className="modal__body">
        <img src={photo?.urls?.regular} alt={photo?.description || "Photo"} />
        <div className="footer">
          <h3 className="name">
            {photo?.user?.first_name} {photo?.user?.last_name}
          </h3>
          <p className="location">{photo?.user?.location}</p>
        </div>
      </div>
    </div>
  );
});

PhotoModal.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export default PhotoModal;
