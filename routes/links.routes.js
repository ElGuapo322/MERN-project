const {Router} = require('express');
const Link = require('../models/Link');
const router = Router()
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res)=>{
    try{ 
        const baseUrl = config.get('baseUrl')
        const{from} = req.body

        const code = shortid.generate();
        const existing = await Link.findOne({from})
        if(existing){
            return res.json({link:existing})
        }
        const to = baseUrl + '/t/'+code
        const link = new Link({
            code,to,from, owner: req.user.userId
        })
       
        await link.save()
        res.sendStatus(201).json({link})
        
    }catch(e){
        res.status(500).json({message:"что то пошло не так"})
    }
})

router.get('/', auth, async(req, res)=>{
    try{ 
        const links = await Link.find({owner:User.userId}) 
        res.json(links)
    }catch(e){
        res.status(500).json({message:"что то пошло не так"})
    }
})

router.get('/:id', auth, async(req, res)=>{
    try{ 
        const links = await Link.findById(req.params.id) 
        res.json(links)
        console.log(links)
        
    }catch(e){
        res.status(500).json({message:"что то пошло не так"})
    }
})
module.exports = router