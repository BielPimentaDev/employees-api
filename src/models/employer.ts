import { dbQuery } from '../services/db';

export interface Employer {
	name: string;
	age: number;
	function: string;
	language: string;
}

const createEmployer = async (employer: Employer) => {
	await dbQuery(
		'INSERT INTO employes (name, age, language, function) VALUES (?, ?, ?, ?);',
		[employer.name, employer.age, employer.language, employer.function]
	);

	let retorno = await dbQuery(
		'SELECT seq AS id FROM sqlite_sequence WHERE name = "employes"'
	);

	return retorno[0].id as number | undefined;
};

const employesList = async () => {
	const employesList = await dbQuery('SELECT * FROM employes');

	return employesList as Employer[];
};

const getEmoployer = async (id: number) => {
	const employesList = await dbQuery('SELECT * FROM employes WHERE id = ?', [
		id,
	]);

	return employesList as Employer[] | undefined;
};

const deleteEmployer = async (id: number) => {
	try {
		await dbQuery(`DELETE FROM employes WHERE id = ?`, [id]);
	} catch (err) {
		console.log(err);
	}
};
const updateEmployer = async (employer: Employer, employerId: number) => {
	try {
		await dbQuery(
			`UPDATE employes SET name = ?, age = ?, language = ?, function = ? WHERE id = ?`,
			[
				employer.name,
				employer.age,
				employer.language,
				employer.function,
				employerId,
			]
		);
	} catch (err) {
		console.log(err);
	}

	return getEmoployer(employerId);
};

export const employerModel = {
	createEmployer,
	employesList,
	getEmoployer,
	deleteEmployer,
	updateEmployer,
};
