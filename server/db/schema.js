module.exports = (db) => {
  return db.queryAsync(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(40) NOT NULL UNIQUE,
      description VARCHAR(250) NOT NULL,
      priority INT NOT NULL,
      dueDate INT NOT NULL,
      dueMonth INT NOT NULL,
      isComplete BOOLEAN DEFAULT 0
    );`
  )
  .catch((err) => console.log('CREATING TABLE ERRROR = ', err));
}