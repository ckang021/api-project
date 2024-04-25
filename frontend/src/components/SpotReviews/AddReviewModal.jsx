import { useModal } from "../../context/Modal"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addReview } from "../../store/reviews"
import { soloSpot } from "../../store/spots"
import "./AddReviewModal.css"

function AddReviewModal ({ spotId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [review, setReview] = useState("")
  const [stars, setStars] = useState(0)
  const [activeRating, setActiveRating] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newReview = { review, stars: Number(stars)}

    await dispatch(addReview(newReview, spotId))
    await dispatch(soloSpot(spotId))
    closeModal()
  }

  const handleClick = (num) => {
    setActiveRating(num)
    setStars(num)
  }


  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit}>
       <div className="review-area">
        <h3>How was your stay?</h3>
          <textarea
            className="text-review-box"
            placeholder= "Leave your review here..."
            cols="40" rows="10"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
       </div>


       <div className="star-area">

        <div className="stars-title">Stars:</div>

        <div className={activeRating >= 1 ? "filled" : "empty"}
          onClick={() => handleClick(1)}
          onMouseEnter={() => setActiveRating(1)}
          onMouseLeave={() => setActiveRating(stars)}
        >
          <i className="fa-solid fa-star" />
        </div>

        <div className={activeRating >= 2 ? "filled" : "empty"}
          onClick={() => handleClick(2)}
          onMouseEnter={() => setActiveRating(2)}
          onMouseLeave={() => setActiveRating(stars)}
        >
          <i className="fa-solid fa-star" />
        </div>

        <div className={activeRating >= 3 ? "filled" : "empty"}
          onClick={() => handleClick(3)}
          onMouseEnter={() => setActiveRating(3)}
          onMouseLeave={() => setActiveRating(stars)}
        >
          <i className="fa-solid fa-star" />
        </div>

        <div className={activeRating >= 4 ? "filled" : "empty"}
          onClick={() => handleClick(4)}
          onMouseEnter={() => setActiveRating(4)}
          onMouseLeave={() => setActiveRating(stars)}
        >
          <i className="fa-solid fa-star" />
        </div>

        <div className={activeRating >= 5 ? "filled" : "empty"}
          onClick={() => setStars(5)}
          onMouseEnter={() => handleClick(5)}
          onMouseLeave={() => setActiveRating(stars)}
        >
          <i className="fa-solid fa-star" />
          </div>
       </div>

       <button
       onSubmit={handleSubmit}
       type="submit"
       disabled={review.length < 10 || !stars}>
        Submit Your Review
       </button>
      </form>
    </div>
  )
}

export default AddReviewModal
