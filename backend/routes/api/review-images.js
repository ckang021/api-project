const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Review, ReviewImage } = require('../../db/models')

router.delete('/:imageId', requireAuth, async(req, res) => {
  const reviewImageId = req.params.imageId;
  const reviewImage = await ReviewImage.findByPk(reviewImageId, {
    include: { model: Review }
  })

  if (!reviewImage){
    res.status(404)
    return res.json({
      message: "Review Image couldn't be found"
    })
  }

  if (req.user.id === reviewImage.Review.userId){
    await reviewImage.destroy()
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

module.exports = router
