const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


exports.register = async (data) =>{
    const {name, email, password} = data;
    const existingUser = await User.findOne({where: {email}});
    if(existingUser) {
        throw new Error('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return user;

}
exports.login = async (data) => {
    const {email, password} = data;
    console.log("👉 Email from request:", email);
  console.log("👉 Password from request:", password);
    const user = await User.findOne({where: {email}})

      console.log("👉 User from DB:", user ? user.email : null);
  console.log("👉 Hashed password from DB:", user?.password);
    if(!user){
        throw new Error('Invalid email or Password')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("👉 bcrypt compare result:", isMatch);
    if(!isMatch) {
        throw new Error('Invalid email or password')
    }
    const token = jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return {user, token};
}