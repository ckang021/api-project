import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { allSpots } from "../../store/spots"
import { Link } from "react-router-dom";


function Spots () {
  const dispatch = useDispatch()
  const convertSpots = useSelector((state) => state.spots);
  const spots = Object.values(convertSpots.allSpots)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(allSpots())
    setIsLoaded(true)
  }, [dispatch])

  return (isLoaded &&
    <div className="spot-container">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} className="single-spot-detail" key={spot.id}>
          <div className="spot">

            <div className="spot-image">
              <div className="tool-tip">
                {spot.previewImage ? (
                  <img src={`${spot.previewImage}`} alt=""/>
                ) : (
                  <p>Image Not Available</p>
                )}
              <span className="tool-tip-spotname">{spot.name}</span>
              </div>
            </div>

            <div className="spot-details">
              <div className="city-state-container">
                {spot.city}, {spot.state}
              </div>
            </div>

          </div>
        </Link>
      ))}
    </div>
  )
}

export default Spots
