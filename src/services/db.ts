const sqlite3 = require('sqlite3').verbose();

export const openConnection = () => {
	const db = new sqlite3.Database('employes-db.db');
	return db;
};

export const dbQuery = (query: string, params?: any[]) => {
	let db = openConnection();
	return new Promise<any[]>((resolve, reject) => {
		db.all(query, params, (err: any, rows: any) => {
			if (err) reject(err);
			else resolve(rows);
		});
	}).finally(() => {
		db.close();
	});
};
