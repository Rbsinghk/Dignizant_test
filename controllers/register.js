const userSchema = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const userMailCheck = await userSchema.findOne({ email });
    if (userMailCheck) {
      res.send({ message: 'User Email is Already Exists', isSuccess: false });
    } else {
      const newuser = new userSchema(req.body);
      newuser.save()
        .then(() => res.status(201).json({ message: "Register successfully", isSuccess: true }))
        .catch((error) => { res.send({ error, isSuccess: false }) });
    }
  } catch (error) {
    res.json({ message: error.message, isSuccess: false })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userMail = await userSchema.findOne({ email });
    const isMatch = await bcrypt.compare(password, userMail.password);
    const token = await userMail.generateAuthToken();
    if (isMatch && userMail) {
      res.status(201).send({ message: "Login Success", data: token, isSuccess: true })
    }
    else {
      res.json({ message: "Invalid Username or Password", isSuccess: false });
    }
  } catch (error) {
    res.json({ message: "Invalid Username or Password", isSuccess: false });
  }
}

module.exports = {
  register,
  login
}
