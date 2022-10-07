import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM employee ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length <= 0) {
      return res.status(404).json({ message: "Employee Id not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO employee(name, salary) VALUES (?, ?)",
      [name, salary]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("UPDATE employee SET  ?  WHERE id = ?", [
      req.body,
      id,
    ]);
    console.log(result.affectedRows);
    if (result.affectedRows < 1)
      return res.status(404).json({ message: "Employee not updated" });
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//alternativa al metodo precedento in questo caso uso PATCH per differenziare
//le due chiamate (la prima è PUT)
//IFNULL nel SET permette di usere, se non è nullo, il paramatro ricevuto,
// altrimenti usa il secondo parametro impostato, in questo caso quello del
// record già esistente, altrimente metterebbe automaticamente "NULL"
export const patchEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET  name = IFNULL(?, name), salary=IFNULL(?, salary)  WHERE id = ?",
      [name, salary, id]
    );
    //console.log(result.affectedRows)
    if (result.affectedRows < 1)
      return res.status(404).json({ message: "Employee not updated" });
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM employee WHERE id = ? limit 1",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    return res.status(204).json({ message: "Emplyee deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countEmployees = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(id) AS NumberOfEmployees FROM employee"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
