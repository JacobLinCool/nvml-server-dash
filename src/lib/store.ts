import { persisted } from "svelte-persisted-store";

export const endpoints = persisted("nvml-server-endpoints", {} as Record<string, string>);
