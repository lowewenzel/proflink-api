const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

// Must be authenticated
const checkAuthentication = (req, res, next) => {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    // res.status(401).json({ message: 'Error: You are not logged in! View docs.profl.ink to learn how to log in' });
    next();
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    next();
  }
};

router.get('/', userController.getUsers);

router.get('/:username', userController.getOneUser);

router.put('/:username', userController.updateUser);

router.delete('/:username', userController.deleteUser);

module.exports = router;
