import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton/OpenModalButton"


function SpotReviews({ spotId, ownerId, reviewLength }){
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const grabReviews = useSelector((state) => state.reviews.spot)
  const reviews = Object.values(grabReviews);

  useEffect(() => {
    dispatch(getReviews(spotId))
  }, [dispatch, spotId])

  return (
    <div className="review-container">
      {sessionUser && sessionUser?.id !== ownerId &&
      !reviews.find((review) => review.userId === sessionUser?.id) && (
        <OpenModalButton
          className="button-review"
          buttonText="Post a Review"
          // modalComponent={}
        />
      )}

      {!reviewLength && sessionUser?.id !== ownerId ? (
        <>
          <p>Be the first to post a review!</p>
        </>
      ) : (
        <>
          {reviews.toReversed().map((review) => (
            <div className="review-section-container" key={review.id}>
              <h3>
                {review.User?.firstName}
              </h3>
              <p>
                {new Date(review.createdAt).toLocaleString("default", {
                month: "long",
                year: "numeric"
                })}
              </p>
              <div className="review-text">
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default SpotReviews
