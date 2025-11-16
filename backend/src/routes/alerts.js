const express = require('express')
const router = express.Router()
const { getAlerts, sendAlert } = require('../controllers/alertController')
const { authenticate, isAdmin } = require('../middleware/auth')

router.get('/', authenticate, isAdmin, getAlerts)
router.post('/send', authenticate, isAdmin, sendAlert)

module.exports = router
