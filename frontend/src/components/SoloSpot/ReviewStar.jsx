import './ReviewStar.css'

function ReviewStar ({ avgStars, numReviews}) {
  const starCheck = avgStars !== "Be the first to review this place!" ? Number(avgStars).toFixed(1) : "New"
  const oneReviewCheck = numReviews === 1 ? "Review" : "Reviews"

  return (
    <div className="spot-reviews-layout">
       <p>
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
        {starCheck}
       </p>
        {numReviews !== 0 ? (
          <>
            <p>•</p>
            <p>
              {numReviews} {oneReviewCheck}
            </p>
          </>
        ): (
          <></>
        )}

    </div>
  )
}

export default ReviewStar
