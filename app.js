const express = require('express')
const config =  require('config')
const mongoose = require('mongoose')
const cors = require('cors');


const app = express()
app.use(cors());
app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes') )
app.use('/api/link', require('./routes/links.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000

async function start(){
    try{
      await mongoose.connect(config.get("mongoUri"),{
          useNewUrlParser: true,
          useUnifiedTopology:true,
          
          
        })
    }catch(e){
        console.log('Server Error', e.message);
        process.exit(1)

    }
}

app.listen(5000, ()=> console.log(`app has been started on port ${PORT}...`))

start()