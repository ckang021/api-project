// import {useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNewSpot } from '../../store/spots'
// import { useNavigate } from 'react-router-dom';
// import "./SpotForm.css"

// function SpotForm ({spot, formType}) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [country, setCountry] = useState(spot.country);
//   const [address, setAddress ] = useState(spot.address);
//   const [city, setCity] = useState(spot.city);
//   const [state, setState] = useState(spot.state);
//   const [lat, setLat] = useState(spot.lat);
//   const [lng, setLng] = useState(spot.lng)
//   const [description, setDescription] = useState(spot.description);
//   const [price, setPrice] = useState(spot.price)
//   const [imgPreview, setImgPreview] = useState(spot.imgPreview)
//   const [img1, setImg1] = useState(spot.img1)
//   const [img2, setImg2] = useState(spot.img2)
//   const [img3, setImg3] = useState(spot.img3)
//   const [img4, setImg4] = useState(spot.img4)
//   const [errors, setErrors] = useState({})
//   const [submitted, setSubmitted] = useState(false)

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setErrors({})
//     spot = { ...spot, }
//   }
//   return (
//     <>
//       <h1>CREATE SPOT FORM and UPDATE SPOT FORM</h1>
//     </>
//   )
// }

// export default SpotForm
