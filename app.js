import 'dotenv/config';
import express, { urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use(urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, console.log(`Serveris paleistas ant ${PORT} porto`));
