const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, Review, SpotImage } = require('../../db/models')

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



















module.exports = router;
