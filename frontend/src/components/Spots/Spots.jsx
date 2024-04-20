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
          {spot.name}
        </Link>
      ))}
    </div>
  )
}

export default Spots