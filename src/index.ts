import express, { Request, Response } from 'express';
import { dbQuery } from './services/db';
import { employerModel, Employer } from './models/employerModel';
import { badRequest } from './services/services';
const app = express();
const port = 3000;
app.use(express.json());

const employeesRoutes = require('./routes/employeesRoute');

app.use('/employees', employeesRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
