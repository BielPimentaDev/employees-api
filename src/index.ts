import express, { Request, Response } from 'express';
import { dbQuery } from './services/db';
import { employerModel, Employer } from './models/employer';
import { badRequest } from './services/services';
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	employerModel.employesList().then((employees) => res.json(employees));
});

app.put('/updateEmployer/:id', (req: Request, res: Response) => {
	const employerId = req.params.id;
	const newEmployer = req.body;

	employerModel
		.updateEmployer(newEmployer, parseInt(employerId))
		.then((employees) => res.json(employees));
});
app.get('/:id', (req: Request, res: Response) => {
	const employerId = parseInt(req.params.id);
	if (!employerId) {
		badRequest(res, 'Id invalido');
	}
	employerModel
		.getEmoployer(employerId)
		.then((employer) => {
			if (employer) {
				res.json(employer[0]);
			} else res.send(res);
		})
		.catch((err) => res.send(err));
});

app.delete('/deleteEmployer/:id', (req: Request, res: Response) => {
	const employerId = parseInt(req.params.id);

	if (!employerId) {
		return badRequest(res, 'Id invalido');
	}
	employerModel.deleteEmployer(employerId);
	res.send('deleted');
});

app.post('/createEmployer', (req: Request, res: Response) => {
	{
		const employer = req.body;

		if (!employer?.name) {
			return badRequest(res, 'Nome invalido');
		}
		if (!employer?.age) {
			return badRequest(res, 'Idade invalida');
		}
		if (!employer?.function) {
			return badRequest(res, 'Funcao invalida');
		}
		if (!employer?.language) {
			return badRequest(res, 'Linguagem invalida');
		}
	}
	const employer = req.body as Employer;
	employerModel.createEmployer(employer);
	res.send('created');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
