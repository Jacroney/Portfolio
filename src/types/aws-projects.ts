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

export const validateAWSService = (service: any): service is AWSService => {
  return (
    typeof service === 'object' &&
    typeof service.name === 'string' &&
    typeof service.icon === 'string' &&
    typeof service.purpose === 'string' &&
    (service.configuration === undefined || typeof service.configuration === 'string')
  );
};

export const validateProjectMetrics = (metrics: any): metrics is ProjectMetrics => {
  return (
    typeof metrics === 'object' &&
    (metrics.uptime === undefined || typeof metrics.uptime === 'string') &&
    (metrics.responseTime === undefined || typeof metrics.responseTime === 'string') &&
    (metrics.monthlyCost === undefined || typeof metrics.monthlyCost === 'string') &&
    (metrics.usersServed === undefined || typeof metrics.usersServed === 'number')
  );
};

export const validateArchitectureDiagram = (diagram: any): diagram is ArchitectureDiagram => {
  return (
    typeof diagram === 'object' &&
    typeof diagram.imageUrl === 'string' &&
    (diagram.mermaidCode === undefined || typeof diagram.mermaidCode === 'string') &&
    (diagram.interactiveElements === undefined || Array.isArray(diagram.interactiveElements))
  );
};

export const validateAWSProject = (project: any): project is AWSProject => {
  return (
    typeof project === 'object' &&
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.businessProblem === 'string' &&
    typeof project.technicalSolution === 'string' &&
    Array.isArray(project.awsServices) &&
    project.awsServices.every(validateAWSService) &&
    validateArchitectureDiagram(project.architectureDiagram) &&
    validateProjectMetrics(project.metrics) &&
    Array.isArray(project.technologies) &&
    project.technologies.every((tech: any) => typeof tech === 'string') &&
    (project.demoUrl === undefined || typeof project.demoUrl === 'string') &&
    typeof project.codeUrl === 'string' &&
    (project.infrastructureUrl === undefined || typeof project.infrastructureUrl === 'string') &&
    isValidProjectStatus(project.status)
  );
};