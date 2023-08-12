import express from 'express';
import cors from 'cors';
import path from 'path';
import expressSession from 'express-session';
import http from 'http';

const app = express()
const server = http.createServer(app)

// Express App Config
const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions: cors.CorsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}
// import { default as authRoutes } from './api/auth/auth.routes';
import authRoutes from './api/auth/auth.routes';
import userRoutes from './api/user/user.routes';
import urlRoutes from './api/url/url.routes';
import roomRoutes from './api/room/room.routes';
import { setupSocketAPI } from './services/socket.service';

// routes
import setupAsyncLocalStorage from './middlewares/setupAls.middleware';app.all('*', setupAsyncLocalStorage)
app.use('/api/url', urlRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/room', roomRoutes)
setupSocketAPI(server)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

import logger from './services/logger.service';
const port = process.env.PORT || 3030
server.listen(port, () => {
  // console.log(`Server is running on port:  http://localhost:${port}/api/url`)
  logger.info(`Server is running on port:  http://localhost:${port}/api/url`)
})
