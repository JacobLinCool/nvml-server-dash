export interface EndpointResponse {
	gpus: Gpu[];
	processes: Process[];
}

export interface Gpu {
	uuid: string;
	name: string;
	power: number;
	memory: {
		total: number;
		used: number;
		free: number;
	};
	utilization: {
		gpu: number;
		memory: number;
	};
}

export interface Process {
	pid: number;
	cmd: string[];
	user: string;
	run_time: number;
	cpu_usage: number;
	gpus: {
		uuid: string;
		memory: number;
	}[];
}
