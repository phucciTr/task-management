const db = require('./../db/index');

exports.addTask = (newTask) => {
  return new Promise((resolve, reject) => {
    db.queryAsync('INSERT INTO tasks SET ?', newTask)
      .then((id) => resolve(id.insertId))
      .catch((err) => reject(err));
  })
};

exports.getTasks = () => {
  return new Promise((resolve, reject) => {
    db.queryAsync('SELECT * FROM tasks')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.queryAsync(`DELETE FROM tasks WHERE id = ${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  })
};

exports.updateDescription = (id, description) => {
  return new Promise((resolve, reject) => {
    db.queryAsync(`UPDATE tasks SET description = ?  WHERE id = ?`, [description, id])
      .then(((res) => resolve(res)))
      .catch((err) => reject(err));
  })
};

exports.updateComplete = (id, isComplete) => {
  return new Promise((resolve, reject) => {
    db.queryAsync(`UPDATE tasks SET isComplete = ?  WHERE id = ?`, [isComplete, id])
      .then(((res) => resolve(res)))
      .catch((err) => reject(err));
  })
}