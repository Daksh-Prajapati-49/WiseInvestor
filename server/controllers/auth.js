const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        const data = await newUser.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error : err.message});
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user){
            return res.status(404).json({message : "User not found!", error : err.message});
        }

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect){
            return res.status(400).json({message : "Wrong password or username!", error : err.message});
        }
        return res.status(200).json(user);
    } 
    catch (err) {
        res.status(500).json({error : err.message});
    }
};

module.exports = { register: register, login: login };
