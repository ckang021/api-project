import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteSpot } from "../../store/spots"
import './DeleteButton.css'


function DeleteButton ({ spotId }) {
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    await dispatch(deleteSpot(spotId))
    navigate('/spots/current')
    closeModal()
  }

  const handleDontDelete = async() => {
    closeModal()
  }
  return (
    <div className="spot-delete-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-buttons-container">
        <button onClick={handleDelete} className="delete-button">Yes (Delete Spot)</button>
        <button onClick={handleDontDelete} className="delete-button no-button">No (Keep Spot)</button>
      </div>
    </div>
  )
}
export default DeleteButton
