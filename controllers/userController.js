const User = require("../models/userModel");
const { tokenGenerator } = require("../utils/tokenGenerator");
const bcrypt = require("bcrypt");

//register new User
const register = async (req, res) => {
  try {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    if (email == "" || name == "" || password == "") {
      res.send({
        success: false,
        message: "All Fields Are required....",
      });
    }
    // chek for Exestance...
    const taken = await User.findOne({ email });
    if (taken) {
      //To not send password as a response
      taken.toJSON = function () {
        return { email, name };
      };
      res.send({
        success: false,
        message: "Email Id is already in used...",
        taken,
      });
    }
    const userData = new User({
      name,
      email,
      password,
    });

    //add new user
    userData
      .save()
      .then((user) => {
        //to track loging detail of user token generate
        const token = tokenGenerator(email);

        //To not send password as a response
        user.toJSON = function () {
          return { email, name, token };
        };
        res.send({
          success: true,
          message: "You Are Successfully Registered ...",
          user,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Faild To Signup,please Try Again...",
          err: err.message,
        });
      });
  } catch (err) {
    res.send({
      success: false,
      message: "Somethig Going Wrong ...",
      err: err,
    });
  }
};

//login user
const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //   res.send({ email, password });
  try {
    User.findOne({ email })
      .then(async (user) => {
        //   res.send({ user });

        if (user) {
          const hashedPassword = user.password;
          //verifing password
          const isMatch = await bcrypt.compare(password, hashedPassword);
          if (isMatch) {
            const token = tokenGenerator(email);
            (user.toJSON = function () {
              return { email, token };
            }),
              res.send({
                success: true,
                message: "Login success...",
                token,
                user,
              });
          } else {
            res.send({
              success: false,
              message: "Unable to login....",
            });
          }
        } else {
          res.send({
            success: false,
            message: "Unable to login....",
          });
        }
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Problem In Login...",
          err: err.message,
        });
      });
  } catch (err) {
    res.send({
      success: false,
      message: "Problem while Login...",
      err: err.message,
    });
  }
};
module.exports = { register, login };
