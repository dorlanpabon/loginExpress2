const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// Get the client
const cors = require('cors')
const session = require('express-session')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuarios, eliminarUsuario } = require('./usuarios');
const validar = require('./validar');
const connection = require('./conexion')
const saltRounds = 10;
const MySQLStore = require('express-mysql-session')(session);

app.use(cors({
  origin: process.env.URLFRONTEND || 'http://localhost:5173',
  credentials: true
}))
const sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
  secret: process.env.SECRETSESSION || 'asdlfkfso3234o23lsdflasdfasdfasdfoasdf',
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  },
  store: sessionStore
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', login)

app.get('/validar', validar)

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuarios)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})