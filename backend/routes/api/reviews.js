const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models')

//Get all Reviews of current User
router.get('/current', requireAuth, async(req, res) => {
  const reviewsById = await Review.findAll({
    where: { userId: req.user.id},
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [
          {
            model: SpotImage,
            attributes: ['url']
          }
        ]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  let listOfReviews = []

    reviewsById.forEach(review => {
      listOfReviews.push(review.toJSON())
    })

    listOfReviews.forEach(review => {
      const url = review.Spot.SpotImages[0].url

      // console.log(url)
      if (review.Spot.SpotImages[0]){
        review.Spot.previewImage = url
      } else {
        review.Spot.previewImage = 'No Image Preview...'
      }

      delete review.Spot.SpotImages
    })

    res.json({
      Reviews: listOfReviews
    })
})




module.exports = router;
