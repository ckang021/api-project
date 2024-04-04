const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth')
const { Spot, SpotImage } = require('../../db/models')

router.delete('/:imageId', requireAuth, async (req, res) => {
  const spotImageId = req.params.imageId;
  const spotImage = await SpotImage.findByPk(spotImageId, {
    include: { model: Spot }
  })

  if (!spotImage){
    res.status(404)
    return res.json({
      message: "Spot Image couldn't be found"
    })
  }

  if (req.user.id === spotImage.Spot.ownerId){
    await spotImage.destroy()
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
