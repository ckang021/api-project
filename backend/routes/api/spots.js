const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage, User } = require('../../db/models')
const { validateAddSpot } = require('../../utils/validation')

const router = express.Router();


//Get all spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll({
    include: [
      {model: Review},
      {model: SpotImage}
    ]
  })

  let listOfSpots = [];
  spots.forEach(spot => {
    const spotJson = spot.toJSON()

     //getting the average rating
     let total = 0;
     if (spot.Reviews && spot.Reviews.length > 0){
      spotJson.Reviews.forEach((star) => {
        total += star.stars
      })

      const avg = total / spotJson.Reviews.length
      spotJson.avgRating = avg
     } else {
      spotJson.avgRating = 'Be the first to review this place!'
     }


    //getting the image preview link
    spotJson.SpotImages.forEach((imgPreview) => {
      if(imgPreview.preview){
        spotJson.previewImage = imgPreview.url;
      } else {
        spotJson.previewImage = 'No Image Preview...'
      }
    })

    delete spotJson.SpotImages;
    delete spotJson.Reviews;

    listOfSpots.push(spotJson);
  })

  // console.log(spots)

  const allSpots = { Spots: listOfSpots}
  res.json(
    // spots,
    allSpots
  );
})

// Get Spots owned by current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
      where: { ownerId: req.user.id},
      include: [
        {model: Review},
        {model: SpotImage}
      ]
    })

    let listOfSpots = [];
    spots.forEach(spot => {
      const spotJson = spot.toJSON()

       //getting the average rating
       let total = 0;
       if (spot.Reviews && spot.Reviews.length > 0){
        spotJson.Reviews.forEach((star) => {
          total += star.stars
        })

        const avg = total / spotJson.Reviews.length
        spotJson.avgRating = avg
       } else {
        spotJson.avgRating = 'Be the first to review this place!'
       }


      //getting the image preview link
      spotJson.SpotImages.forEach((imgPreview) => {
        if(imgPreview.preview){
          spotJson.previewImage = imgPreview.url;
        } else {
          spotJson.previewImage = 'No Image Preview...'
        }
      })

      delete spotJson.SpotImages;
      delete spotJson.Reviews;

      listOfSpots.push(spotJson);
    })

    const allSpots = { Spots: listOfSpots }
    res.json(allSpots)
})

//Get Spots from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId

  const spotsById = await Spot.findAll({
    where: { id: spotId },
    include: [
     {
      model: SpotImage ,
      attributes: ['id', 'url', 'preview']
    },
     {
      model: User,
      as: 'Owner',
      attributes: ['id', 'firstName', 'lastName']
     },
     { model: Review }
    ]
  })

  if(spotsById.length === 0){
    res.status(400);
    return res.json({
      message: "Specified spot does not exist..."
    })
  }

  let listOfSpots = [];

    spotsById.forEach(spot => {
      const spotJson = spot.toJSON()

      let total = 0;

       spotJson.Reviews.forEach((star) => {
         total += star.stars
       })

       const avg = spotJson.Reviews.length > 0 ? total / spotJson.Reviews.length : 'Be the first to review this place!'

      const payload = {
        id: spotJson.id,
        ownerId: spotJson.Owner.id,
        address: spotJson.address,
        city: spotJson.city,
        state: spotJson.state,
        country: spotJson.country,
        lat: spotJson.lat,
        lng: spotJson.lng,
        name: spotJson.name,
        description: spotJson.description,
        price: spotJson.price,
        createdAt: spotJson.createdAt,
        updatedAt: spotJson.updatedAt,
        //length of the reviews
        numReviews: spotJson.Reviews.length,
        avgStarRating: avg,
        SpotImages: spotJson.SpotImages,
        Owner: {
          id: spotJson.Owner.id,
          firstName: spotJson.Owner.firstName,
          lastName: spotJson.Owner.lastName
        }

      }

      delete spotJson.Reviews;

      listOfSpots.push(payload);
    })

    const allSpots = { Spots: listOfSpots }
    res.json(allSpots)
})

// Create a Spot
router.post('/', requireAuth, validateAddSpot, async (req, res, next) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  const createSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  res.status(201)
  return res.json(createSpot)
})















module.exports = router;
