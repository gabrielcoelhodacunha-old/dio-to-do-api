export type TObject = Object & {
	[key: string]: any;
};

export type TEnv = TObject & {
	NODE_ENV: string;
	PROTOCOL: string;
	HOST: string;
	PORT: number;
};

export type TTask = TObject & {
	id?: number;
	description?: string;
	isDone?: boolean;
};
