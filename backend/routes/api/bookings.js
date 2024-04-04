const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Booking, Spot, SpotImage } = require('../../db/models')


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
















module.exports = router;
