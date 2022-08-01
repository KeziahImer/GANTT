import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth.js';
import ProjectRouter from './routes/projects.js';
import cors from 'cors';

const app = express();
mongoose.connect('mongodb+srv://Keziah:DDY9upgUNkdeh7y@api.p0rw3.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH');
    next();
  });

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: '*',
    exposedHeaders: 'X-Total-Count, X-Total-Result, Location, Content-Disposition',
    optionsSuccessStatus: 204,
  })
);

app.use('/api/auth', AuthRouter);
app.use('/api/projects', ProjectRouter)

app.listen(8000, () => console.log('Listening on 8000'));
