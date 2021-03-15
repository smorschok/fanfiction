const {Router} = require('express')
const router = Router()
const Fanfic = require('../models/Fanfic')
const cloudinary = require('cloudinary').v2


router.get(
    '/', 
    async(req,res) =>{
        try {
            const fanfics = await Fanfic.find().sort({_id:-1})
            res.json(fanfics)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)



router.get(
    '/chapter/:id', 
    async(req,res) =>{
        try {
            cloudinary.config ({
                cloud_name:'dkqgboopg',
                api_key:'177597782667784',
                api_secret:'_qBbSyMNBpFcJkqIW563Ftv79VY'
            })
            const fanfics = await Fanfic.find({chapters:{$elemMatch:{_id:req.params.id}}},{chapters:{$elemMatch:{_id:req.params.id}}})
            res.json(fanfics)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)
    
router.post(
    '/search',
    async(req,res) =>{
        try {
            const search = req.body
            const searchResult = await Fanfic.find({$text: {$search:search.search}})
            // const searchResult = await Fanfic.find({title: {$regex:search.search}})

            if(searchResult.length>0){
            return  res.json(searchResult)
            }
            res.json(null)
        } catch (e) {
        }
    }
)

router.get(
    '/:id', 
    async(req,res) =>{
        try {
            const fanfics = await Fanfic.findById(req.params.id)
                res.json(fanfics)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)
module.exports = router
