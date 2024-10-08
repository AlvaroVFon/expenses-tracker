function handleResponse({ res, data, message, status = 200 }) {
  return res.status(status).json({
    status,
    message,
    data,
  })
}

export { handleResponse }
