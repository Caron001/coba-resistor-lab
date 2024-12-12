const db = require('../config/database');

const login = async (data) => {
  const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [data.email]);

  return result;
};

const register = async (data) => {
  await db.query(
    `INSERT INTO users(username, email, password) VALUES('${data.username}', '${data.email}', '${data.password}')`
  );
  return true;
};

const checkEmailExists = async (email) => {
  const [result] = await db.query(`SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`);
  return result[0].count > 0;
};

module.exports = {
  login,
  register,
  checkEmailExists
};
