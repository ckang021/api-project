const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models')
const { validateUpdateReview } = require('../../utils/validation');

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

  //Grab the preview image link
  let listOfReviews = []

    reviewsById.forEach(review => {
      listOfReviews.push(review.toJSON())
    })

    listOfReviews.forEach(review => {
      // const url = review.Spot.SpotImages[0].url
      const spotImages = review.Spot.SpotImages
      if(spotImages && spotImages.length > 0){
        const url = spotImages[0]
        review.Spot.previewImage = url
      } else {
        review.Spot.previewImage = 'No Image Preview...'
      }
      // console.log(url)
      // if (review.Spot.SpotImages[0]){
      //   review.Spot.previewImage = url
      // } else {
      //   review.Spot.previewImage = 'No Image Preview...'
      // }

      delete review.Spot.SpotImages
    })

    res.json({
      Reviews: listOfReviews
    })
})

//Add an image by Review Id
router.post('/:reviewId/images', requireAuth, async(req, res) => {
  const reviewId = req.params.reviewId
  const review = await Review.findByPk(reviewId);
  const { url } = req.body

  if (!review){
    res.status(404)
    return res.json({
      message: "Review couldn't be found"
    })
  }

  const maxImages = await ReviewImage.count({
    where: {
      reviewId
    }
  })

  if (maxImages >= 10){
    res.status(403)
    return res.json({
      message: "Maximum number of images for this resource was reached"
    })
  }

  if (req.user.id === review.userId){
    const addReviewImage = await ReviewImage.create({
      reviewId,
      url
    })

    return res.json({
      id: addReviewImage.id,
      url
    })

  } else {
    res.status(403)
    return res.json({
      message: "Forbidden"
    })
  }
})

//Edit a Review
router.put('/:reviewId', validateUpdateReview, requireAuth, async(req, res) => {
  const reviewId = req.params.reviewId
  const foundReview = await Review.findByPk(reviewId)
  let { review, stars } = req.body;

  if (!foundReview){
    res.status(404)
    return res.json({
      message: "Review couldn't be found"
    })
  }

  if (req.user.id === foundReview.userId){
    if (review !== undefined) foundReview.review = review;
    if (stars !== undefined) foundReview.stars = stars;

    await foundReview.save()
    res.json(foundReview)
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }
})

//Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res) => {
  const reviewId = req.params.reviewId
  const review = await Review.findByPk(reviewId)

  if (!review){
    res.status(404)
    return res.json({
      message: "Review couldn't be found"
    })
  }

  if (req.user.id === review.userId){
    await review.destroy()
    res.json({
      message: "Successfully deleted"
    })
  } else {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    })
  }
})

module.exports = router;
