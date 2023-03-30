module.exports = (db) => {
  return db.queryAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(40) NOT NULL UNIQUE,
      password VARCHAR(64)
    );`
  )
  .then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(40) NOT NULL UNIQUE,
        description VARCHAR(250) NOT NULL,
        priority INT NOT NULL,
        dueDate INT NOT NULL,
        dueMonth INT NOT NULL,
        isComplete BOOLEAN DEFAULT 0,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      );`
    )
  })
  .catch((err) => console.log('CREATING TABLE ERRROR = ', err));
}