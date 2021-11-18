import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import usuarioRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'


const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/', function(req, res, next) {
    res.send('SERVIDOR LEVANTADO CORRECTAMENTE...!');
});

app.use('/auth', authRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/post', postRoutes);

export default app;