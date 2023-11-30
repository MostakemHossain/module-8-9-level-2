/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1',router);

const test= (req: Request, res: Response) => {
  res.send("hello")
};
app.get('/',test);


//global error handler
app.use(globalErrorHandler)


// not found
app.use(notFound);


export default app;
