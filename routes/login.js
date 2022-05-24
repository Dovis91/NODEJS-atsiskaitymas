import express from 'express';
import con from '../sql_connection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const logRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

logRouter.get('/', async (req, res) => {
  res.render('login', { page: 'login', css: 'login.css' });
});

logRouter.post('/', async (req, res) => {
  let rb = req.body;

  try {
    const [data] = await con.query(
      `
        SELECT * FROM user
        WHERE email = ?   
        `,
      [rb.email]
    );

    if (data.length === 0) {
      return res.status(400).send({ err: `Netinkamas email arba password 📛` });
    }
    const isAuthed = bcrypt.compareSync(rb.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign({ id: data[0].id, email: data[0].email, username: data[0].username }, jwtSecret);
      return res.cookie('token', token).redirect('/');
    } else {
      res.status(400).send({ error: `Netinkamas email arba password.` });
    }
  } catch (err) {
    res.status(400).send({ error: `Susidūrėme su error'u: ${err}` });
  }
});

export default logRouter;
