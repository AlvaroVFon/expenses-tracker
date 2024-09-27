function paginate(req, res, next) {
    const { page = 1, limit = 5 } = req.query

    const skip = (page - 1) * limit

    req.pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        skip,
    }

    next()
}

export { paginate }
