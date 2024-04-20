import { csrfFetch } from "./csrf";

//Action Variables
const LOAD_SPOTS = "spots/LOAD_SPOTS"


//Actions
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}



//Thunks
export const allSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok){
    let spots = await res.json()
    spots = spots.Spots;
    dispatch(loadSpots(spots));
    return spots;
  }
}



//Reducer

const initState = { allSpots: {}, singleSpot: {}};

const spotReducer = (state = initState, action) => {
  switch(action.type){
    case LOAD_SPOTS: {
      const newState = { ...state };
      const allSpots = {}
      action.spots.forEach(spot => allSpots[spot.id] = { ...spot });
      newState.allSpots = allSpots
      return newState
    }
    default:
      return state;
  }
}

export default spotReducer;
