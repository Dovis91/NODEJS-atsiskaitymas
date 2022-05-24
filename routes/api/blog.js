import express from 'express';
import con from '../../sql_connection.js';

const router = express.Router();

// get all users

router.get('/', async (req, res) => {
  try {
    const [data] = await con.query(
      `
             SELECT * FROM exam.blog
             `
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/:id?', async (req, res) => {
  try {
    const [data] = await con.query(`SELECT * FROM exam.blog WHERE id = ?`, [req.params.id]);
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

export default router;
