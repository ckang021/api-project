import { csrfFetch } from "./csrf";

//Action Variables
const LOAD_SPOTS = "spots/LOAD_SPOTS"
const SINGLE_SPOT = "spots/SINGLE_SPOTS"


//Actions
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}

const singleSpot = (spotId) => {
  return {
    type: SINGLE_SPOT,
    spotId
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

export const soloSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok){
    let spot = await res.json()
    dispatch(singleSpot(spot))
  }

  return res
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
    } case SINGLE_SPOT: {
      const newState = { ...state };
      const singleSpot = { ...action.spotId };
      newState.singleSpot = singleSpot;
      return newState
    }
    default:
      return state;
  }
}

export default spotReducer;
