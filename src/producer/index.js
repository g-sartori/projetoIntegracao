import './setup/db'

import { server } from './setup/server'
import { CEPModel } from './models/ceps'

server.get('/users', async (req, res) => {
  try {
    const users = await CEPModel.find()
    res.send(users)
  } catch (error) {
    res.send(500, error)
  }
})


server.start(() => console.log('Started server'))

