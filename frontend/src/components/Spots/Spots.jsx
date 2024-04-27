import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { allSpots } from "../../store/spots"
import { Link } from "react-router-dom";
import './Spots.css'


function Spots () {
  const dispatch = useDispatch()
  const convertSpots = useSelector((state) => state.spots);
  const spots = Object.values(convertSpots.allSpots)

  // console.log("SPOTS ===>", spots)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(allSpots())
    setIsLoaded(true)
  }, [dispatch])

  return (isLoaded &&
    <div className="spot-tile-container">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} className="single-spot-detail" key={spot.id}>
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
              <div className="price"><span className="price-bold">${spot.price}</span> per night</div>
            </div>

          </div>
        </Link>
      ))}
    </div>
  )
}

export default Spots
