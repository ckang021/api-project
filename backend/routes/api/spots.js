const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { Spot, Review, ReviewImage, SpotImage, User, Booking } = require('../../db/models')
const { validateQueryFilter, validateAddSpot, validateUpdateSpot, validateAddReview } = require('../../utils/validation');
const { Op } = require('sequelize')

const router = express.Router();


//Get all spots
router.get('/', validateQueryFilter, async (req, res) => {

//Pagination and query filters
let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

if(!page) page = 1
if(page > 10) page = 10;
if(!size) size = 20;
if(size > 20) size = 20;

page = parseInt(page)
size = parseInt(size)

const pagination = {}

if (page >= 1 && size >= 1){
  pagination.limit = size;
  pagination.offset = size * (page - 1)
}

//filters
const where = {}
if (maxLat){
  maxLat = parseInt(maxLat)
  where.lat = { [Op.lte]: maxLat }
}
if (minLat){
  minLat = parseInt(minLat)
  where.lat = { [Op.gte]: minLat }
}
if (minLng){
  minLng = parseInt(minLng)
  where.lng = { [Op.gte]: minLng }
}
if (maxLng){
  maxLng = parseInt(maxLng)
  where.lng = { [Op.lte]: maxLng }
}
if (minPrice){
  minPrice = parseFloat(minPrice)
  where.price = { [Op.gte]: minPrice}
}
if (maxPrice){
  maxPrice = parseFloat(maxPrice)
  where.price = { [Op.lte]: maxPrice}
}

  const spots = await Spot.findAll({
    include: [
      {model: Review},
      {model: SpotImage}
    ],
    ...pagination,
    where
  })

  let listOfSpots = [];
  spots.forEach(spot => {
    const spotJson = spot.toJSON() //to POJO!

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
    if(spotJson.SpotImages[0]){
      spotJson.previewImage = spot.SpotImages[0].url
    } else {
      spotJson.previewImage = 'No Image Preview...'
    }

    delete spotJson.SpotImages;
    delete spotJson.Reviews;

    listOfSpots.push(spotJson);
  })

  // console.log(spots)

  const allSpots = { Spots: listOfSpots, page, size}
  res.json(
    // spots,
    allSpots
  );
})

// Get Spots owned by current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
      where: { ownerId: req.user.id },
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
      if(spotJson.SpotImages[0]){
        spotJson.previewImage = spot.SpotImages[0].url
      } else {
        spotJson.previewImage = 'No Image Preview...'
      }

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
      message: "Spot couldn't be found"
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
router.post('/', requireAuth, validateAddSpot, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (req.user.id){
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
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }

})

// Add Image to a Spot by Spot id !COME BACK TO THIS!
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)
  const { url, preview } = req.body

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (req.user.id === spot.ownerId){
    const newImage = await SpotImage.create({
      url,
      preview
    })

    await spot.addSpotImages(newImage)

    res.json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    })
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }

})

//Edit a Spot
router.put('/:spotId', requireAuth, validateUpdateSpot, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if(req.user.id === spot.ownerId){
    if (address !== undefined) spot.address = address;
    if (city !== undefined) spot.city = city;
    if (state !== undefined) spot.state = state;
    if (country !== undefined) spot.country = country;
    if (lat !== undefined) spot.lat = lat;
    if (lng !== undefined) spot.lng = lng;
    if (name !== undefined) spot.name = name;
    if (description !== undefined) spot.description = description;
    if (price !== undefined) spot.price = price

    await spot.save()
    res.json(spot)
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }

})

//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (req.user.id === spot.ownerId){
    await spot.destroy()
    res.json(
      { message: "Successfully deleted" }
    )
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }
})

//Get all Reviews by Spot Id
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  const spotReviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  const reviews = ({ Reviews: spotReviews})
  res.json(reviews)
})

//Create Review by Spot id
router.post('/:spotId/reviews', requireAuth, validateAddReview, async(req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)
  let { review , stars } = req.body;

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  const reviewCheck = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: spotId
    }
  })

  if(reviewCheck){
    res.status(500)
    return res.json({
      message: "User already has a review for this spot"
    })
  }


  const newReview = await Review.create({
    userId: req.user.id,
    spotId,
    review,
    stars
  })

  res.status(201)
  return res.json(newReview)
})

//Get all bookings by spot id
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (req.user.id === spot.ownerId){
    const currBooking = await Booking.findAll({
      include: [{
        model: User,
        attributes: ['id', `firstName`, `lastName`]
      }],
      where: {
        spotId
      }
    })

    const payload = []
    currBooking.forEach(booking => {
      payload.push({
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      })
    })

    const booking = { Bookings: payload }
    return res.json(booking)
  } else {
    const hiddenBooking = await Booking.findAll({
      where: {
        spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    const booking = { Bookings: hiddenBooking }
    return res.json(booking)
  }

})

//Create booking by spot Id
router.post('/:spotId/bookings', requireAuth, async(req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)
  const { startDate, endDate } = req.body;
  const bookStartDate = new Date(startDate)
  const bookEndDate = new Date(endDate)
  const currDate = new Date()
  const existingBooking = await Booking.findAll({
    where: {
      spotId
    },
    attributes: ['startDate', 'endDate']
  })

  if (!spot){
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  //If user is the owner, cannot book
  if (req.user.id === spot.ownerId){
    res.status(403)
    return res.json({
      message: "Forbidden"
    })
  }

  // if (bookStartDate < currDate && bookEndDate <= bookStartDate){
  //   res.status(400)
  //   return res.json({
  //     message: "Bad Request",
  //     errors: {
  //       startDate: "startDate cannot be in the past",
  //       endDate: "endDate cannot be on or before startDate"
  //     }
  //   })
  // }

  //Comparing and giving errors based on booking creation and current date
  if (bookStartDate < currDate){
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        startDate: "startDate cannot be in the past"
      }
    })
  }

  if (bookEndDate <= bookStartDate){
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    })
  }

  //Booking Conflict
  let bookErrors = {};
  existingBooking.forEach(booking => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)

    if (bookStartDate >= start && bookStartDate <= end){
      bookErrors.startDate = "Start date conflicts with an existing booking"
    } else if (bookEndDate >= start && bookEndDate <= end){
      bookErrors.endDate = "End date conflicts with an existing booking"
    } else if (start >= bookStartDate && end <= bookEndDate){
      bookErrors.currentlyExist = "Booking exists between these dates."
    }
  })

  if(Object.keys(bookErrors).length){
    res.status(403)
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: bookErrors
    })
  }


  //Create Booking
  const newBooking = await Booking.create({
    spotId,
    userId: req.user.id,
    startDate,
    endDate
  })

  const convertStart = newBooking.startDate.toISOString().substring(0,10)
  const convertEnd = newBooking.startDate.toISOString().substring(0,10)

  const payload = newBooking.toJSON()
  payload.startDate = convertStart
  payload.endDate = convertEnd

  return res.json(payload)
})


module.exports = router;
