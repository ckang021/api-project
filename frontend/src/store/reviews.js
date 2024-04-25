import { csrfFetch } from "./csrf";

//Action Variables
const GET_REVIEWS = "/reviews/GET_REVIEWS"
const ADD_REVIEW = "/reviews/ADD_REVIEW"
const DELETE_REVIEW = "/reviews/DELETE_REVIEW"


//Action Functions
export const loadReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export const createReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  }
}

export const removeReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
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

export const addReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  if(res.ok){
    const newReview = await res.json()
    dispatch(createReview(newReview))
    dispatch(getReviews(spotId))
    return newReview
  }
}

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if(res.ok){
    dispatch(removeReview(reviewId))
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
    case ADD_REVIEW: {
      const newState = { ...state, spot: { ...state.spot }}
      newState.spot[action.review.id] = action.review
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state, spot: {...state.spot}}
      delete newState.spot[action.reviewId]
      return newState
    }
    default: {
      return state;
    }
  }
}

export default reviewReducer
