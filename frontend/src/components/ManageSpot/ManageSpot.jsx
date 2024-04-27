import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { userSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './ManageSpot.css'
import DeleteButton from "./DeleteButton";

function ManageSpot(){
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const getSpots = useSelector((state) => state.spots.allSpots)
  const spots = Object.values(getSpots)

  // const spots = convertSpots.filter(spot => spot.ownerId === sessionUser?.id)

  useEffect(() => {
    dispatch(userSpots())
    setIsLoaded(true)
  }, [dispatch])

  return (sessionUser && isLoaded &&
    <>
      <div className="manage-header">
        <h1 className="spot-manage">Manage Spots</h1>
        <button className="update-spot-button">
          <Link to="/spots/new" className="new-spot-button">
            Create a New Spot
          </Link>
        </button>
      </div>

      <div className="manage-spot-tile-container">
        {spots.map((spot) => (
          <div className="spot-wrapper" key={spot.id}>
          <Link to={`/spots/${spot.id}`} className="single-spot-detail">
            <div className="spot-container">

              <div className="spot-image-container">
                <div className="tool-tip">
                  {spot.previewImage ? (
                    <img src={`${spot.previewImage}`} alt="" className="spot-image"/>
                  ) : (
                    <p>Image Not Available</p>
                  )}
                <span className="tool-tip-spotname">{spot.name}</span>
                </div>
              </div>

              <div className="spot-details">
                <div className="city-state-stars-container">
                  {spot.city}, {spot.state}
                  <div className="star-reviews">
                  <i className="fa-solid fa-star"></i>
                  {spot.avgRating !== "Be the first to review this place!" ? Number(spot.avgRating).toFixed(1) : "New"}
                </div>
                </div>
                <div className="country">{spot.country}</div>
                <div className="price">${spot.price} per night</div>
              </div>

            </div>
          </Link>
            <div className="buttons">
                <Link to={`/spots/${spot.id}/edit`} className="spot-details">
                  <button className="update-spot-button">Update</button>
                </Link>
                  <div className="delete-button-manage">
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteButton spotId={spot.id} />}
                    />
                  </div>
              </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageSpot
