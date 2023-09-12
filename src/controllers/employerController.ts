import { Employer, employerModel } from '../models/employerModel';
import { Request, Response } from 'express';
import { badRequest } from '../services/services';

const listEmployees = (req: Request, res: Response) => {
	employerModel.employesList().then((employees) => res.json(employees));
};

const getEmoployer = (req: Request, res: Response) => {
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
};

const updateEmployer = (req: Request, res: Response) => {
	const employerId = req.params.id;
	const newEmployer = req.body;

	employerModel
		.updateEmployer(newEmployer, parseInt(employerId))
		.then((employees) => res.json(employees));
};

const deleteEmployer = (req: Request, res: Response) => {
	const employerId = parseInt(req.params.id);

	if (!employerId) {
		return badRequest(res, 'Id invalido');
	}
	employerModel.deleteEmployer(employerId);
	res.send('deleted');
};

const createEmployer = (req: Request, res: Response) => {
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
};

export const employerController = {
	listEmployees,
	getEmoployer,
	updateEmployer,
	deleteEmployer,
	createEmployer,
};
