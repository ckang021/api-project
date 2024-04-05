const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Booking, Spot, SpotImage } = require('../../db/models')
const { Op } = require('sequelize')


//Get all Bookings of Current User
router.get('/current', requireAuth, async(req, res) => {
  const bookingByUser = await Booking.findAll({
    where: { userId: req.user.id},
    include: [
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [
          {
            model: SpotImage,
            attributes: ['url']
          }
        ]
      }
    ]
  })

  //Grab previewImage link
    let listOfBookings = [];
  //   bookingByUser.forEach(booking => {
  //     listOfBookings.push(booking.toJSON())
  //   })

    bookingByUser.forEach(booking => {
      const previewImage = booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : 'No Image Preview...'

        listOfBookings.push({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
          id: booking.Spot.id,
          ownerId: booking.Spot.ownerId,
          address: booking.Spot.address,
          city: booking.Spot.city,
          state: booking.Spot.state,
          country: booking.Spot.country,
          lat: booking.Spot.lat,
          lng: booking.Spot.lng,
          name: booking.Spot.name,
          price: booking.Spot.price,
          previewImage
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      })

      delete booking.Spot.SpotImages
    })

  const allBookings = { Bookings: listOfBookings}
  res.json(allBookings)
})

//Edit a booking
router.put('/:bookingId', requireAuth, async(req, res) => {
  const bookingId = req.params.bookingId
  const booking = await Booking.findByPk(bookingId)
  const { startDate, endDate } = req.body;
  const newStartDate = new Date(startDate)
  const newEndDate = new Date(endDate)
  const currDate = new Date()

  if (!booking){
    res.status(404)
    return res.json({
      message: "Booking couldn't be found"
    })
  }

  if (req.user.id !== booking.userId){
    res.status(403)
    res.json({
      message: "Forbidden"
    })
  }

  if(newEndDate <= currDate || newStartDate <= currDate){
    res.status(403)
    res.json({
      message: "Past bookings can't be modified"
    })
  }

  if (newStartDate < currDate){
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        startDate: "startDate cannot be in the past"
      }
    })
  }

  if (newEndDate <= newStartDate){
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    })
  }

  const existingBooking = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      id: {
        [Op.not]: bookingId
      }
    },
    attributes: ['startDate', 'endDate']
  });

  let bookErrors = {};
  existingBooking.forEach(booking => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)

    if (newStartDate === end){
      bookErrors.startDate = "Start date conflicts with an existing booking"
    } else if (start <= newStartDate && newStartDate <= end){
      bookErrors.startDate = "Start date conflicts with an existing booking"
    } else if (start <= newEndDate && newEndDate <= end){
      bookErrors.endDate = "End date conflicts with an existing booking"
    } else if (newStartDate <= start && newEndDate >= end){
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

  if (startDate !== undefined) booking.startDate = startDate;
  if (endDate !== undefined) booking.endDate = endDate;

  await booking.save()

  return res.json(booking);

})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId)

  if (!booking){
    res.status(404)
    return res.json({
      message: "Booking couldn't be found"
    })
  }

  const spot = await Spot.findByPk(booking.spotId)
  const bookedStartDate = new Date(booking.startDate)
  const currDate = new Date()

    if (bookedStartDate < currDate){
      res.status(403)
      return res.json({
        message: "Bookings that have been started can't be deleted"
      })
    }

  if (req.user.id === booking.userId || req.user.id === spot.ownerId){
    const bookedStartDate = new Date(booking.startDate)
    const currDate = new Date()

    if (bookedStartDate < currDate){
      res.status(403)
      return res.json({
        message: "Bookings that have been started can't be deleted"
      })
    }

    await booking.destroy()
    return res.json({
      message: "Successfully deleted"
    })
  } else {
    res.status(403)
    return res.json({
      message: "Forbidden"
    })
  }
})













module.exports = router;
