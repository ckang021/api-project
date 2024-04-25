import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { soloSpot } from "../../store/spots";
import './SoloSpot.css'
import ReviewStar from "./ReviewStar";
import SpotReviews from "../SpotReviews/SpotReviews";

function SoloSpot () {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const spot = useSelector(state => state.spots.oneSpot.Spots?.[0]);

  // console.log("SOLO SPOT ===> ", spot)


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
        <img className="main-image" src={spot.SpotImages[0]?.url} />
        <div className="sub-image-container">
          <div className="sub-image-top">
            <img className="spot-sub-image" src={spot.SpotImages[1]?.url} />
            <img className="spot-sub-image" src={spot.SpotImages[2]?.url} />
          </div>
          <div className="sub-image-bottom">
            <img className="spot-sub-image" src={spot.SpotImages[3]?.url} />
            <img className="spot-sub-image" src={spot.SpotImages[4]?.url} />
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
            <ReviewStar avgStars={spot.avgStarRating} numReviews={spot.numReviews}/>
          </div>
          <button className="reserve-button" onClick={reserveComingSoon}>Reserve</button>
        </div>
      </div>

      <div className="reviews-star-bottom">
        <ReviewStar avgStars={spot.avgStarRating} numReviews={spot.numReviews}/>
      </div>

      <div className="all-reviews">
        <SpotReviews spotId={spotId} ownerId={spot.ownerId} reviewLength={spot.numReviews}/>
      </div>

    </div>
    )
  )
}

export default SoloSpot
