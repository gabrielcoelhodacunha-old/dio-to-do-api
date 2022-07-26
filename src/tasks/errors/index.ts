export class NoDataError extends Error {
	constructor() {
		super('No data was provided.');
		Object.setPrototypeOf(this, NoDataError.prototype);
	}
}

export class InvalidDataError extends Error {
	constructor() {
		super('Invalid data provided.');
		Object.setPrototypeOf(this, InvalidDataError.prototype);
	}
}
