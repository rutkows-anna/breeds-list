import { useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const initialState = {
  loading: true,
  error: false,
  image: "",
};

const reducerImage = (state, action) => {
  switch (action.type) {
    case "FETCH_IMAGES":
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    case "FETCH_IMAGES_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const Modal = ({ breed, onClose }) => {
  const [state, dispatch] = useReducer(reducerImage, initialState);

  const getRandomImage = (images) => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];
    return image;
  };

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return dispatch({ type: "FETCH_IMAGES_ERROR" });
        }
      })
      .then((images) => {
        dispatch({
          type: "FETCH_IMAGES",
          payload: getRandomImage(images.message),
        });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_IMAGES_ERROR" });
      });
  }, [breed]);

  const modal = (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__button" onClick={onClose}>
          X
        </button>
        <Loader loading={state.loading} />
        {state.image && (
          <img src={state.image} alt="dog" className="modal__image" />
        )}
        {state.error && <Error />}
        <h1 className="modal__title">{breed}</h1>
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal-root"));
};

export default Modal;
