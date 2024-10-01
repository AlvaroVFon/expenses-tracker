const exceptions = Object.freeze({
    CONFLICT: 'Already exists',
    NOT_FOUND: 'Not found',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    BAD_REQUEST: 'Bad request',
})

const statusCode = Object.freeze({
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
})

export { exceptions, statusCode }
