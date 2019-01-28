require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/api/soldai', (req, res) => {
  const baseURL = `${process.env.URL_BOT}/askquestion`
  axios.get(baseURL, {
    params: {
      question: req.query.question,
      session_id: req.query.sessionId,
      key: process.env.KEY_BOT,
      log: 1
    }
  })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    })
})

app.get('/pokeapi', (req, res) => {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`
  let intent = req.body.intent

  axios.get(baseURL)
    .then(response => {
      switch(intent) {
        case 'habilidades':
          let abilities = response.data.abilities
          abilities = abilities.map(ability => {
            return ability.ability.name
          })
        return res.status(200).json(`Sus habilidades son ${abilities.join()}`)

        case 'estadisticas':
          let stats = response.data.stats
          stats = stats.map(stat => {
            return stat.stat.name + '-' + stat.base_stat
          })
        return res.status(200).json(`Sus estadísticas son ${stats.join()}`)

        case 'movimientos':
          let moves = response.data.moves
          moves = moves.map(move => {
            return move.move.name
          })
        return res.status(200).json(`Sus movimientos son ${moves.join()}`)

        case 'peso':
        return res.status(200).json(`Su peso es ${response.data.weight}`)

        case 'altura':
        return res.status(200).json(`Su altura es ${response.data.height}`)

        case 'tipos':
          let types = response.data.types
          types = types.map(type => {
            return type.type.name
          })
        return res.status(200).json(`Es de tipo ${types.join()}`)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

app.listen(PORT, function () {
  console.log('server runnning ...')
})