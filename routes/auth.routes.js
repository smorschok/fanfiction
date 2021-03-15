const {Router} = require('express')
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
        .isLength({min:6})
    ],
    async(req,res) =>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Некорректыне данные при регистрации'
            })
        }
        const {email,password} = req.body
       
        const candidate = await User.findOne({email})
        if(candidate && !candidate.authenticated){
            return res.status(201).json({message: 'Введите ключ'})

        }
         
        if(candidate){
         return res.status(400).json({message: 'Такой пользователь существует'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email,password:hashedPassword})
       
        await user.save()
        const hashedKey =  (Math.random()*10+2).toString(36).slice(2)

        await User.findOneAndUpdate(({email:email} ), {key:hashedKey})
         
    
            let testAccount = await nodemailer.createTestAccount();
          
            let transporter = nodemailer.createTransport({
                service: '',
                auth: {
                    user: '',
                    pass: ''
                  }
                });
          
            let info = await transporter.sendMail({
              from: '"Fanfiction" <foo@example.com>', 
              to: `${email}`,
              subject: "Hello", 
              text: '',
              html:`Введите данный ключ для активации ${hashedKey} `
            });
          
            
          
         
         res.status(201).json({message: 'Введите ключ'})


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/key',async (req,res)=>{
  
    const {email,password,key} = req.body
    const user = await User.findOne({email})

    if(key!==user.key){
        return res.status(400).json({message: 'Неверный ключ'})

    }
    await User.findOneAndUpdate(({email:email} ), {authenticated:true})

    res.status(201).json({message: 'Добро пожаловать!'})

    
})

router.post(
    '/login', 
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите корректный пароль').exists()
    ],

    async(req,res) =>{
try {
        const errors = validationResult(req)

        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Некорректыне данные при входе в систему'
            })
        }
        
        const {email,password,key} = req.body


        const user = await User.findOne({email})

        

        if(!user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }
        if(!user.authenticated){
                    return res.status(400).json({message: 'Пользователь не зарегистрирован'})
        }


        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            return res.status(400).json({message: 'Неверный пароль'})
        }
        



        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret')
            
        )

        res.json({token,userId:user.id,email:user.email})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }

    
})




module.exports = router


