import { deleteReview } from "../../store/reviews"
import { soloSpot } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import "./DeleteReviewModal.css"

function DeleteReviewModal({ reviewId, spotId }){
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId))
    await dispatch(soloSpot(spotId))
    closeModal()
  }

  const handleNoDelete = () => {
    closeModal()
  }


  return (
    <div className="delete-review-container">
      <h2 className="delete-title">Confirm Delete?</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-review-button-container">
        <button onClick={handleDelete} className="delete-button">
          Yes (Delete Review)
        </button>

        <button onClick={handleNoDelete} className="delete-button no-button">
          No (Keep Review)
        </button>
      </div>
    </div>
  )
}

export default DeleteReviewModal
