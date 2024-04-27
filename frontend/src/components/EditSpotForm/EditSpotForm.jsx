import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { soloSpot } from '../../store/spots';
import SpotForm from '../SpotForm/SpotForm';
import "./EditSpotForm.css"


function EditSpotForm(){
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const spot = useSelector(state => state.spots.oneSpot.Spots?.[0])


  useEffect(() => {
    dispatch(soloSpot(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  return (
    <div className='update-spot-form-unique'>
      <h1 className='update-spot-title'>Update your Spot</h1>
      {isLoaded && sessionUser && <SpotForm spot={spot} formType="Update Spot"/>}
    </div>
  )
}


export default EditSpotForm
