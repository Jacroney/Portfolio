import type { AWSProject } from '../types/aws-projects';

export const awsProjects: AWSProject[] = [
  {
    id: "college-hq-aws",
    title: "College HQ - AWS Serverless Backend",
    description: "Serverless backend architecture for student management platform",
    businessProblem: "Students need a scalable platform to manage academic and social activities with real-time updates and AI-powered recommendations.",
    technicalSolution: "Implemented serverless architecture using AWS Lambda, API Gateway, and DynamoDB for auto-scaling and cost efficiency.",
    awsServices: [
      {
        name: "AWS Lambda",
        icon: "/aws-icons/lambda.svg",
        purpose: "Serverless compute for API endpoints and background processing",
        configuration: "Node.js runtime, 512MB memory, 30s timeout",
      },
      {
        name: "API Gateway",
        icon: "/aws-icons/api-gateway.svg",
        purpose: "RESTful API management and routing",
        configuration: "REST API with CORS, request validation, and throttling",
      },
      {
        name: "DynamoDB",
        icon: "/aws-icons/dynamodb.svg",
        purpose: "NoSQL database for user data and course information",
        configuration: "On-demand billing, GSI for query optimization",
      },
      {
        name: "S3",
        icon: "/aws-icons/s3.svg",
        purpose: "Static asset storage and frontend hosting",
        configuration: "Standard storage class with CloudFront distribution",
      },
      {
        name: "CloudFront",
        icon: "/aws-icons/cloudfront.svg",
        purpose: "Content delivery network for global performance",
        configuration: "Global edge locations with gzip compression",
      },
    ],
    architectureDiagram: {
      imageUrl: "/diagrams/college-hq-architecture.svg",
      mermaidCode: `
        graph TD
          A[React Frontend] --> B[CloudFront]
          B --> C[S3 Static Hosting]
          A --> D[API Gateway]
          D --> E[Lambda Functions]
          E --> F[DynamoDB]
          E --> G[S3 Assets]
      `,
    },
    metrics: {
      uptime: "99.9%",
      responseTime: "<200ms",
      monthlyCost: "$12",
      usersServed: 150,
    },
    technologies: ["React", "TypeScript", "Node.js", "AWS SDK", "Serverless Framework"],
    demoUrl: "https://college-hq.example.com",
    codeUrl: "https://github.com/Jacroney/college-hq",
    infrastructureUrl: "https://github.com/Jacroney/college-hq-infrastructure",
    status: "live",
  },
];

// Helper function to get all unique AWS services from projects
export const getAllAWSServices = (): string[] => {
  const services = new Set<string>();
  awsProjects.forEach(project => {
    project.awsServices.forEach(service => {
      services.add(service.name);
    });
  });
  return Array.from(services).sort();
};

// Helper function to get all technologies used across projects
export const getAllTechnologies = (): string[] => {
  const technologies = new Set<string>();
  awsProjects.forEach(project => {
    project.technologies.forEach(tech => {
      technologies.add(tech);
    });
  });
  return Array.from(technologies).sort();
};

// Validate the sample data at runtime
import { validateAWSProject } from '../types/aws-projects';

// Validate all projects on module load
awsProjects.forEach((project, index) => {
  if (!validateAWSProject(project)) {
    console.error(`Invalid AWS project data at index ${index}:`, project);
    throw new Error(`AWS project validation failed for project: ${(project as Record<string, unknown>).id || 'unknown'}`);
  }
});

console.log(`✅ Successfully validated ${awsProjects.length} AWS project(s)`);