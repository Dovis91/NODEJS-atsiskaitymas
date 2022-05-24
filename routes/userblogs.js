import express from 'express';
import con from '../sql_connection.js';
import isLoggedIn from '../isLoggedIn.js';

const router = express.Router();

// display all logged user blogs.

router.get('/', async (req, res) => {
  const isAuth = await isLoggedIn(req);

  console.log(req.token);
  const [data] = await con.query(
    `
    SELECT * FROM blog WHERE author_id = ${req.token.id}
         ${req.query.sortby ? 'ORDER BY ??' : ''}
         `,
    [req.query.sortby]
  );

  res.render('userblogs', { data: data, token: req.token, css: 'home.css', isAuth: isAuth });
});

router.delete('/:id', async (req, res) => {
  try {
    if (await isLoggedIn(req)) {
      await con.query(`DELETE FROM blog WHERE ID = ?`, [req.params.id]);
      res.redirect('/');
    } else {
      res.send({ err: 'Error 404' });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

export default router;
