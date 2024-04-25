import { csrfFetch } from "./csrf";

//Action Variables
const LOAD_SPOTS = "spots/LOAD_SPOTS"
const SINGLE_SPOT = "spots/SINGLE_SPOTS"
const CREATE_SPOT = "spot/CREATE_SPOT"
const NEW_IMAGE = "spot/NEW_IMAGE"
const USER_SPOTS = "spot/USER_SPOT"
const UPDATE_SPOT = "spot/UPDATE_SPOT"
const DELETE_SPOT = "spot/DELETE_SPOT"


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

export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

export const newImage = (image) => {
  return {
    type: NEW_IMAGE,
    image
  }
}

export const loadUserSpots = (spots) => {
  return {
    type: USER_SPOTS,
    spots
  }
}

export const editSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

export const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
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

export const createNewSpot = (newSpot, images) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpot)
  })

  if(res.ok){
    const spot = await res.json()
    for(let i = 0; i < images.length; i++){
      if (i === 0){
        await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: images[i],
            preview: true
          })
        });
      } else {
        await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: images[i],
            preview: false
          })
        });
        }
      }
    dispatch(createSpot(spot))
    return spot
    }
  }

  export const userSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    const spots = await res.json()
    dispatch(loadUserSpots(spots.Spots))
  }

// export const addImageSpot = (spotId, imgDetail) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/images`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(imgDetail)
//   });

//   if(res.ok){
//     const newImg = await res.json()
//     dispatch(newImage(newImg))
//     return newImg
//   }
// }

  export const updateSpot = (spot, spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(spot)
    })

    if(res.ok){
      const editedSpot = await res.json();
      dispatch(editSpot(editedSpot))
      return editedSpot
    }
  }

  export const deleteSpot = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(res.ok){
      dispatch(removeSpot(spotId))
    }
  }



//Reducer

const initState = {allSpots: {}, oneSpot: { SpotImages: [] }};

const spotReducer = (state = initState, action) => {
  switch(action.type){
    case LOAD_SPOTS: {
      return {...state, allSpots: action.spots}
    } case SINGLE_SPOT: {
      return { ...state, oneSpot: action.spotId}
    } case CREATE_SPOT: {
      return { ...state, [action.spot.id]: action.spot}
    } case NEW_IMAGE: {
      return { ...state, ...action.image}
    } case USER_SPOTS: {
      const grabSpots = {};
      action.spots.forEach(spot => {
        grabSpots[spot.id] = spot
      })
      return { allSpots: {...grabSpots}, oneSpot: { ...grabSpots}}
    } case UPDATE_SPOT: {
      return { ...state, oneSpot: {...state.oneSpot, ...action.spot}}
    } case DELETE_SPOT: {
      const newState = { ...state, allSpots: { ...state.allSpots }}
      delete newState.allSpots[action.spotId]
      return newState
    }
    default:
      return state;
  }
}

export default spotReducer;
