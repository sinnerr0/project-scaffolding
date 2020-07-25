class AppError extends Error {
  constructor(code, message) {
    super(message)
    this.name = code
  }
}

module.exports = {
  createError: function createError(code, message) {
    return new AppError(code, message)
  },
  OK: 'OK',
}
