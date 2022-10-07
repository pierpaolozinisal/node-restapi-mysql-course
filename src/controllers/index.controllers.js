import { pool } from "../db.js";

export const pingServer = async (req,res) => {
    try {
        const [result] = await pool.query(" Select 'Pong' AS result")
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}