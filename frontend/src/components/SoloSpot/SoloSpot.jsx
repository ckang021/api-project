import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { soloSpot } from "../../store/spots";
import './SoloSpot.css'

function SoloSpot () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots.Spots?.[0])


  useEffect(() => {
    dispatch(soloSpot(spotId))
    .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  // console.log(spot.avgStarRating)

  const reserveComingSoon = () => {
    alert("Feature coming soon")
  }

  return (isLoaded && (
    <div className="single-spot-page">
      <div className="spot-page-header">
        <h1>{spot.name}</h1>
        <p>
          {spot.city}, {spot.state}, {spot.country}
        </p>
      </div>


      <div className="spot-images-container">
        <img className="main-image" src={spot.SpotImages[0].url} />
        <div className="sub-image-container">
          <div className="sub-image-top">
            <img className="spot-sub-image" src={spot.SpotImages[1].url} />
            <img className="spot-sub-image" src={spot.SpotImages[2].url} />
          </div>
          <div className="sub-image-bottom">
            <img className="spot-sub-image" src={spot.SpotImages[3].url} />
            <img className="spot-sub-image" src={spot.SpotImages[4].url} />
          </div>
        </div>
      </div>

      <div className="spot-detail-info">
        <div className="spot-description">
          <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
          <p>{spot.description}</p>
        </div>

        <div className="spot-reserve-box">
          <p>
            <span>${spot.price} per night</span>
          </p>
          <div className="spot-reviews">
            <i className="fa-solid fa-star"></i>
            {spot?.avgStarRating !== "Be the first to review this place!" ? Number(spot?.avgStarRating).toFixed(1) : "New"}
            <p>{spot?.numReviews} Reviews</p>
            {/* {ADD SPOT REVIEWS HERE} */}
          </div>
          <button className="reserve-button" onClick={reserveComingSoon}>Reserve</button>
        </div>
      </div>

      <div className="reviews-bottom">
        {/* Reviews go HERE! */}
      </div>

    </div>
    )
  )
}

export default SoloSpot
