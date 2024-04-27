import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./SpotForm.css"
import { createNewSpot, updateSpot } from '../../store/spots';

function SpotForm ({spot, formType}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress ] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  // const [lat, setLat] = useState(1);
  // const [lng, setLng] = useState(1)
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name)
  const [price, setPrice] = useState(spot?.price)
  const [imgPreview, setImgPreview] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [img4, setImg4] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const imageCheck = (image) => {
    return (image.endsWith(".png") || image.endsWith(".jpg") || image.endsWith(".jpeg"))
  }

  const errorCheck = () => {
    const errors = {};
    if(!country || country.length < 5 || country.length > 50) errors.country = "Country is required and be greater than 5 characters and less than 50 characters."
    if(!address || address.length < 5 || address.length > 255) errors.address = "Address is required and be greater than 5 characters and less than 255 characters"
    if(!city || city.length < 5 || city.length > 50) errors.city = "City is required and be greater than 5 characters and less than 50 characters."
    if(!state || state.length < 5 || state.length > 50) errors.state = "State is required and be greater than 5 characters and less than 50 characters."
    if(description.length < 30) errors.description = "Description needs a minimum of 30 characters"
    if(!name || name.length < 5 || name.length > 50) errors.title = "Name is required and be greater than 5 characters and less than 50 characters."
    if(!price || price < 0 || !Number(price)) errors.price = "Price is required and must have a minimum of $0. Must be a number."

    if(formType === "Create Spot"){
      if(!imgPreview) errors.imgPreview = "Preview image is required"
      if(imgPreview.length > 0 && !imageCheck(imgPreview)) errors.imgPreviewInvalid = "Image URL must end in .png, .jpg, or .jpeg"
      if(img1.length > 0 && !imageCheck(img1)) errors.img1 = "Image URL must end in .png, .jpg, or .jpeg"
      if(img2.length > 0 && !imageCheck(img2)) errors.img2 = "Image URL must end in .png, .jpg, or .jpeg"
      if(img3.length > 0 && !imageCheck(img3)) errors.img3 = "Image URL must end in .png, .jpg, or .jpeg"
      if(img4.length > 0 && !imageCheck(img4)) errors.img4 = "Image URL must end in .png, .jpg, or .jpeg"
    }

    if(Object.values(errors).length > 0){
      setErrors(errors);
      return false
    } else {
      return true;
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true)
    setErrors({})

    if(errorCheck()){

      const newSpot = { ...spot, country, address, city, state, lat: 1, lng: 1, description, name, price: Number(price)};
      if (formType === "Create Spot"){

        const images = [imgPreview, img1, img2, img3, img4]

        for(let i = 0; i < images.length; i++){
          if(!images[i]) images[i] = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }

        const createSpot = await dispatch(createNewSpot(newSpot, images))
        navigate(`/spots/${createSpot.id}`)
      }

      if (formType === "Update Spot"){
        const updatedSpot = await dispatch(updateSpot(newSpot, spot.id))
        navigate(`/spots/${updatedSpot.id}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='create-update-form-container'>
      <div className='form-section'>
        <div className='form-headers'>
          <h2>Where&apos;s your place located?</h2>
          <h4>Guest will only get your exact address once they booked a reservation.</h4>
        </div>

        <div className='form-location'>
          <label>
            Country:
            <input
              className='input-field'
              type="text"
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <div className='errors'>{submitted && errors.country}</div>

          <br></br>

          <label>
            Street Address:
            <input className='input-field'
            type="text"
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className='errors'>{submitted && errors.address}</div>

          <br></br>

          <div className='city-state-one-line'>
            <label>
              City:
              <input className='input-field'
              type="text"
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <div className='errors'>{submitted && errors.city}</div>

            <br></br>

            <label>
              State:
              <input className='input-field'
              type="text"
              placeholder='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
              />
            </label>
            <div className='errors'>{submitted && errors.state}</div>

          </div>
          <br></br>
        </div>
      </div>

      <div className='form-section'>
        <div className='form-headers'>
          <h2>Describe your place to guests</h2>
          <h4>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</h4>
        </div>

        <div className='form-description'>
          <textarea
            className='big-input-field'
            type="text"
            placeholder='Please write at least 30 characters'
            maxLength="500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='errors'>{submitted && errors.description}</div>
      </div>

      <div className='form-section'>
        <div className='form-headers'>
          <h2>Create a title for your spot</h2>
          <h4>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
        </div>

        <div className='form-title'>
          <input
            className='input-field'
            type="text"
            value={name}
            placeholder='Name of your spot'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='errors'>{submitted && errors.title}</div>
      </div>

      <div className='form-section'>
        <div className='form-headers'>
          <h2>Set a base price for your spot</h2>
          <h4>Competitive pricing can help your listing stand out and rank higher in search results</h4>
        </div>
        <div className='form-price'>
          $ <input
              className='input-field'
              type='text'
              value={price}
              placeholder='Price per night (USD)'
              onChange={(e) => setPrice(e.target.value)}
           />
        </div>

        <div className='errors'>{submitted && errors.price}</div>
      </div>

      {formType === "Create Spot" &&
        (
        <div className='form-section'>
          <div className='form-headers'>
            <h2>Live up your spot with photos</h2>
            <h4>Submit a link to at least one photo to publish your spot.</h4>
          </div>

          <div className='form-photo-links'>
            <input className='input-field' type="text" value={imgPreview} placeholder='Preview Image URL' onChange={(e) => setImgPreview(e.target.value)} />
            <div className='errors'>{submitted && errors.imgPreview || errors.imgPreviewInvalid}</div>
            <br />
            <input className='input-field' type="text" value={img1} placeholder='Image URL' onChange={(e) => setImg1(e.target.value)} />
            <div className='errors'>{submitted && errors.img1}</div>
            <br />
            <input className='input-field' type="text" value={img2} placeholder='Image URL' onChange={(e) => setImg2(e.target.value)} />
            <div className='errors'>{submitted && errors.img2}</div>
            <br />
            <input className='input-field' type="text" value={img3} placeholder='Image URL' onChange={(e) => setImg3(e.target.value)} />
            <div className='errors'>{submitted && errors.img3}</div>
            <br />
            <input className='input-field' type="text" value={img4} placeholder='Image URL' onChange={(e) => setImg4(e.target.value)} />
            <div className='errors'>{submitted && errors.img4}</div>
            <br />
          </div>
        </div>
      )}

      <button type='submit' className='submit-button-form'>{formType}</button>

    </form>
  )
}

export default SpotForm
