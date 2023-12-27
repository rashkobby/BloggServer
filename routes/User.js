const router = require("express").Router()
const User = require('../models/User')


// find all users 

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//create user 
router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const saveUser = new User(req.body);
            const savedUser = await saveUser.save();
            res.status(200).json(savedUser);
        } else {
            res.status(201).json('This user already exists');
        }
    } catch (err) {
        res.status(500).json(err); // Use the correct error variable name
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // For demonstration purposes, assuming passwords are stored in plain text
        const existingUser = await User.findOne({ email, password });

        if (existingUser) {
            res.status(200).json(existingUser);
        } else {
            res.status(401).json('Invalid credentials'); 
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// find a single user 
router.get('/:id', async (req,res)=> {
    const user = await User.findById(req.params.id)
    try {
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json('User not found')
        }   
    } catch (err) {
       res.status(500).json(err) 
    }
} )


// update single user 
router.put('/:id', async (req, res) => {
    try {
      const eUser = await User.findById(req.params.id);
      if (eUser) {
        if (eUser._id.toString() === req.params.id) {
          await User.updateOne({ _id: req.params.id }, { $set: req.body });
          res.status(200).json('The user has been updated');
        } else {
          res.status(403).json('You cant update this user');
        }
      } else {
        res.status(404).json('Post not found');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });


router.delete('/:id', async (req, res)=>{
    const exists = await User.findById(req.params.id)
    if (exists) {
        if (exists._id.toString()=== req.params.id) {
            await User.deleteOne({_id: req.params.id});
            res.status(200).json('User deleted successfully')
        }else {
            res.status(403).json('You cant delete this user')
        }
    } else {
        res.status(404).json('User not found')
        
    }
})

module.exports = router;