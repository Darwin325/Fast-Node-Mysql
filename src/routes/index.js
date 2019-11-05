const router = require('express').Router()

router.get('/', (req, res) => {
   res.send('Hola desde node js')
})

module.exports = router