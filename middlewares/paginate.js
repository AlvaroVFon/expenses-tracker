import dotenv from 'dotenv'
dotenv.config()

/**
 * This middleware function sets the pagination values into req.pagination
 *  */

function paginate(req, res, next) {
  const { page = 1, limit = 5 } = req.query

  if (limit > process.env.RESOURCE_LIMIT) {
    return res.status(400).json({
      status: 400,
      message: `Limit should not exceed ${process.env.RESOURCE_LIMIT}`,
    })
  }

  const skip = (page - 1) * limit

  req.pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    skip,
  }

  next()
}

export { paginate }
