import { csrfFetch } from "./csrf";

//Action Variables
const GET_REVIEWS = "/reviews/GET_REVIEWS"


//Action Functions
export const loadReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}



//Thunks
export const getReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if(res.ok){
    const reviews = await res.json()
    dispatch(loadReviews(reviews))
    return reviews
  }
}

const initState = {spot: {}, user:{}}
const reviewReducer = (state = initState, action) => {
  switch(action.type){
    case GET_REVIEWS: {
      const newState = {}
      action.reviews.Reviews.forEach(review => {
        newState[review.id] = review;
      })
      return { ...state, spot: newState}
    }
    default: {
      return state;
    }
  }
}

export default reviewReducer
