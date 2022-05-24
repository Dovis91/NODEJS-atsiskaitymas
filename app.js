//Pagrindiniai moduliai ir jų importas
import 'dotenv/config';
import express, { urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

// Routų importas
import users from './routes/api/user.js';
import blogs from './routes/api/blog.js';
import regRouter from './routes/register.js';
import logRouter from './routes/login.js';
import homepage from './routes/home.js';
import addblog from './routes/addblog.js';
import userblogs from './routes/userblogs.js';

// expresso ir porto užkūrimas
const app = express();
const PORT = process.env.PORT || 6000;

// Visi reikalingi modulių use'ai
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use(urlencoded({ extended: false }));

//EJS varikliuko paleidimas
app.set('view engine', 'ejs');
app.set('views', './views');

// Routų panaudojimas
app.use('/api/users', users);
app.use('/api/blogs', blogs);
app.use('/login', logRouter);
app.use('/register', regRouter);
app.use('/addblog', addblog);
app.use('/userblogs', userblogs);
app.use('/', homepage);

//Serveriuko paleidimas! 🖥
app.listen(PORT, console.log(`Serveris paleistas ant ${PORT} porto`));
