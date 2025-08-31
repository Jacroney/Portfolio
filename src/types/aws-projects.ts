export interface AWSService {
  name: string;
  icon: string;
  purpose: string;
  configuration?: string;
}

export interface DiagramElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  service: AWSService;
}

export interface ArchitectureDiagram {
  imageUrl: string;
  mermaidCode?: string;
  interactiveElements?: DiagramElement[];
}

export interface ProjectMetrics {
  uptime?: string;
  responseTime?: string;
  monthlyCost?: string;
  usersServed?: number;
}

export type ProjectStatus = "live" | "development" | "archived";

export interface AWSProject {
  id: string;
  title: string;
  description: string;
  businessProblem: string;
  technicalSolution: string;
  awsServices: AWSService[];
  architectureDiagram: ArchitectureDiagram;
  metrics: ProjectMetrics;
  technologies: string[];
  demoUrl?: string;
  codeUrl: string;
  infrastructureUrl?: string;
  status: ProjectStatus;
}

export interface FilterState {
  selectedServices: string[];
  searchTerm: string;
  sortBy: "newest" | "complexity" | "cost";
}

// Data validation functions
export const isValidProjectStatus = (status: string): status is ProjectStatus => {
  return ["live", "development", "archived"].includes(status);
};

export const validateAWSService = (service: unknown): service is AWSService => {
  const s = service as Record<string, unknown>;
  return (
    typeof service === 'object' &&
    service !== null &&
    typeof s.name === 'string' &&
    typeof s.icon === 'string' &&
    typeof s.purpose === 'string' &&
    (s.configuration === undefined || typeof s.configuration === 'string')
  );
};

export const validateProjectMetrics = (metrics: unknown): metrics is ProjectMetrics => {
  const m = metrics as Record<string, unknown>;
  return (
    typeof metrics === 'object' &&
    metrics !== null &&
    (m.uptime === undefined || typeof m.uptime === 'string') &&
    (m.responseTime === undefined || typeof m.responseTime === 'string') &&
    (m.monthlyCost === undefined || typeof m.monthlyCost === 'string') &&
    (m.usersServed === undefined || typeof m.usersServed === 'number')
  );
};

export const validateArchitectureDiagram = (diagram: unknown): diagram is ArchitectureDiagram => {
  const d = diagram as Record<string, unknown>;
  return (
    typeof diagram === 'object' &&
    diagram !== null &&
    typeof d.imageUrl === 'string' &&
    (d.mermaidCode === undefined || typeof d.mermaidCode === 'string') &&
    (d.interactiveElements === undefined || Array.isArray(d.interactiveElements))
  );
};

export const validateAWSProject = (project: unknown): project is AWSProject => {
  const p = project as Record<string, unknown>;
  return (
    typeof project === 'object' &&
    project !== null &&
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.description === 'string' &&
    typeof p.businessProblem === 'string' &&
    typeof p.technicalSolution === 'string' &&
    Array.isArray(p.awsServices) &&
    (p.awsServices as unknown[]).every(validateAWSService) &&
    validateArchitectureDiagram(p.architectureDiagram) &&
    validateProjectMetrics(p.metrics) &&
    Array.isArray(p.technologies) &&
    (p.technologies as unknown[]).every((tech: unknown) => typeof tech === 'string') &&
    (p.demoUrl === undefined || typeof p.demoUrl === 'string') &&
    typeof p.codeUrl === 'string' &&
    (p.infrastructureUrl === undefined || typeof p.infrastructureUrl === 'string') &&
    isValidProjectStatus(p.status as string)
  );
};