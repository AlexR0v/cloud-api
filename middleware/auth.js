const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[ 1 ]
    if (!token) {
      return res.status(403).json({ message: 'Auth error' })
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
}
