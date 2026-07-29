import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/controller/controller';


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/tasks', router);

app.use('/', (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send(err.message);
})

app.listen(3000, () => {
    console.log('run');
})