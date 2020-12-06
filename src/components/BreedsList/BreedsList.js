import { useEffect, useReducer } from "react";
import BreedItem from "../BreedItem/BreedItem";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Search from "../Search/Search";

const initialState = {
  loading: true,
  error: false,
  breeds: [],
  searchValue: "",
};

const reducerBreeds = (state, action) => {
  switch (action.type) {
    case "FETCH_BREEDS":
      return {
        ...state,
        loading: false,
        breeds: action.payload,
      };
    case "FETCH_BREEDS_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

const BreedsList = () => {
  /* const [searchValue, setSearchValue] = useState(""); */
  const [state, dispatch] = useReducer(reducerBreeds, initialState);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return dispatch({ type: "FETCH_BREEDS_ERROR" });
        }
      })
      .then((breeds) => {
        dispatch({
          type: "FETCH_BREEDS",
          payload: Object.keys(breeds.message),
        });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_BREEDS_ERROR" });
      });
  }, []);

  const handleOnSearchChange = (searchValue) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue });
    /* console.log(state.searchValue) */
  };

  return (
    <div className="wrapper">
      <Search
        searchValue={state.searchValue}
        onSearchChange={handleOnSearchChange}
      />
      <Loader loading={state.loading} />
      <div className="container">
        {state.breeds.length > 0 &&
          state.breeds
            .filter((breed) => {
              return breed
                .toLowerCase()
                .includes(state.searchValue.toLowerCase());
            })
            .map((breed) => {
              return <BreedItem key={breed} breed={breed} />;
            })}
      </div>
      {state.error && <Error />}
    </div>
  );
};

export default BreedsList;