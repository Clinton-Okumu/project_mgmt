export interface User {
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: "pre-launch" | "launched" | "archived";
  dueDate?: string;
  progress: number;
}

export interface Stats {
  totalProjects: number;
  preLaunch: number;
  launched: number;
  thisMonth: number;
}
