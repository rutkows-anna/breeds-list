import { useState } from "react";
import Modal from "../Modal/Modal";

const BreedItem = ({ breed }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button className="breed__button" onClick={toggleModal}>
        {breed}
      </button>
      {showModal && <Modal breed={breed} onClose={toggleModal} />}
    </>
  );
};

export default BreedItem;
