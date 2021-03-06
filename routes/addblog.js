import express from 'express';
import con from '../sql_connection.js';
import isLoggedIn from '../isLoggedIn.js';

const addblog = express.Router();

// Papildau blog listą POST
addblog.post('/', async (req, res) => {
  try {
    if (await isLoggedIn(req)) {
      const rb = req.body;
      if (!rb.title || !rb.content) return res.send({ msg: 'Need title or content' });
      await con.query(
        `INSERT INTO blog (title, content, author_id, created_at)
      VALUES (?,?,?,?) `,
        [rb.title, rb.content, req.token.id, new Date().toLocaleString('LT')]
      );
      res.redirect('/');
    } else {
      return res.send({ msg: 'Neprisijungęs, negalima postint' });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

addblog.get('/', async (req, res) => {
  const auth = await isLoggedIn(req);
  res.render('addblog', { page: 'addblog', css: 'addblog.css', auth: auth });
});

export default addblog;
