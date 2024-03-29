require('dotenv').config();
const jwt = require('jsonwebtoken');


const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );
};



const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
    

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }else
  {
    res.status(401).send({ message: 'Token is not supplied.' });
  }
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};
module.exports = {
  signInToken,
  isAuth,
};
