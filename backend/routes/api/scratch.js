// const bookingId = req.params.bookingId
//   const booking = await Booking.findByPk(bookingId)
//   const { startDate, endDate } = req.body;
//   const newStartDate = new Date(startDate)
//   const newEndDate = new Date(endDate)
//   const currDate = new Date()

//   if (!booking){
//     res.status(404)
//     return res.json({
//       message: "Booking couldn't be found"
//     })
//   }

//   if (req.user.id !== booking.userId){
//     res.status(403)
//     res.json({
//       message: "Forbidden"
//     })
//   }

//   if(newEndDate <= currDate || newStartDate <= currDate){
//     res.status(403)
//     res.json({
//       message: "Past bookings can't be modified"
//     })
//   }

//   if (newStartDate < currDate){
//     res.status(400)
//     return res.json({
//       message: "Bad Request",
//       errors: {
//         startDate: "startDate cannot be in the past"
//       }
//     })
//   }

//   if (newEndDate <= newStartDate){
//     res.status(400)
//     return res.json({
//       message: "Bad Request",
//       errors: {
//         endDate: "endDate cannot be on or before startDate"
//       }
//     })
//   }

//   const existingBooking = await Booking.findAll({
//     where: {
//       spotId: booking.spotId,
//       id: {
//         [Op.not]: bookingId
//       }
//     }
//   });

//   let bookErrors = {};
//   existingBooking.forEach(booking => {
//     const start = new Date(booking.startDate)
//     const end = new Date(booking.endDate)

//     if (start === newStartDate){
//       bookErrors.startDate = "Start date conflicts with an existing booking"
//     } else if (end === newStartDate){
//       bookErrors.startDate = "Start date conflicts with an existing booking"
//     } else if (start < newStartDate && end > newStartDate){
//       bookErrors.startDate = "Start date conflicts with an existing booking"
//     }
//     if (end === newEndDate){
//       bookErrors.endDate = "End date conflicts with an existing booking"
//     } else if (start === newEndDate){
//       bookErrors.endDate = "End date conflicts with an existing booking"
//     } else if (start < newEndDate && end > newEndDate){
//       bookErrors.endDate = "End date conflicts with an existing booking"
//     }
//     if (start > newStartDate && end < newEndDate){
//       bookErrors.currExit = "Booking exists between these dates."
//     }

//   })

//   if(Object.keys(bookErrors).length){
//     res.status(403)
//     return res.json({
//       message: "Sorry, this spot is already booked for the specified dates",
//       errors: bookErrors
//     })
//   }

//   if (startDate !== undefined) booking.startDate = startDate;
//   if (endDate !== undefined) booking.endDate = endDate;

//   await booking.save()

//   return res.json(booking);


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
