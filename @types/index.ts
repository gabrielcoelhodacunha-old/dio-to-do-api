export type TObject = {
	[key: string]: any;
};

export type TEnv = TObject & {
	PROTOCOL: string;
	HOST: string;
	PORT: number;
};
