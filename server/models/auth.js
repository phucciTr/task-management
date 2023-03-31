const db = require('./../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.addNewUser = async ({ name, password }) => {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = { name: name, password: hash };
    const userId = db.queryAsync('INSERT INTO users SET ?', newUser);
    return userId;

  } catch(e) {
    throw e;
  }
};

exports.loginUser = async ({ name, password }) => {
  try {
    const user = await db.queryAsync('SELECT * FROM users WHERE name = ?', name);
    if (!user.length) { throw new Error(`User ${name} not found`)};
    if (await bcrypt.compare(password, user[0].password)) {
      const accessToken = jwt.sign({ name: name }, process.env.ACCESS_TOKEN_SECRET);
      return { name: user[0].name, id: user[0].id, accessToken: accessToken };
    }
    throw new Error('Wrong password');
  } catch(e) {
    throw e;
  }
}