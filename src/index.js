const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
//Inicializaciones
const app = express()

//Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
   defaultLayout: 'main',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   extname: '.hbs',
   helpers: require('./lib/handlebars.js')
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'))//Ver mensajes por consola
app.use(express.urlencoded({ extended: false }))//Recibir datos tipo strings desdes las vistas
app.use(express.json())//Enviar y recibir datos json

//Variables globales
app.use((req, res, next) => {
   next()
})

//Rutas
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')))

//Iniciando el servidor
app.listen(app.get('port'), () => {
   console.log('Server on port', app.get('port'))
})
