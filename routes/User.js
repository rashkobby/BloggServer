const router = require("express").Router()
const User = require('../models/User')




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

module.exports = router;