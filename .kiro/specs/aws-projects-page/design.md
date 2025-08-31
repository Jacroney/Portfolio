# AWS Projects Page Design Document

## Overview

The AWS Projects page will be a dedicated showcase of cloud architecture expertise, designed to scale from the current single AWS project to multiple projects by September. The page emphasizes visual architecture diagrams, technical depth, and professional presentation to appeal to AWS recruiters and technical interviewers.

## Architecture

### Page Structure

```
/aws-projects
├── Hero Section (AWS-themed branding)
├── Filter/Search Bar (future-ready for multiple projects)
├── Projects Grid (responsive, expandable)
├── Project Detail Modal/Expandable Cards
└── Technical Skills Summary
```

### Component Hierarchy

```
AWSProjectsPage
├── AWSHeroSection
├── ProjectFilters (hidden until 2+ projects)
├── ProjectsGrid
│   └── AWSProjectCard[]
│       ├── ProjectHeader
│       ├── ArchitectureDiagram
│       ├── TechnicalDetails
│       └── ProjectActions
└── SkillsSummary
```

## Components and Interfaces

### 1. AWSHeroSection Component

**Purpose:** Establish AWS expertise credibility and page context

**Props Interface:**

```typescript
interface AWSHeroSectionProps {
  totalProjects: number;
  awsServices: string[];
  certifications?: string[];
}
```

**Features:**

- AWS-branded color scheme (orange/blue)
- Animated AWS service icons
- "Building on AWS" tagline
- Progress indicator showing project growth timeline

### 2. ProjectFilters Component

**Purpose:** Enable filtering by AWS services (shows when 2+ projects exist)

**Props Interface:**

```typescript
interface ProjectFiltersProps {
  availableServices: string[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
```

**Features:**

- AWS service badges (Lambda, S3, DynamoDB, etc.)
- Search functionality
- Clear all filters option
- Responsive collapse on mobile

### 3. AWSProjectCard Component

**Purpose:** Showcase individual projects with expandable technical details

**Props Interface:**

```typescript
interface AWSProject {
  id: string;
  title: string;
  description: string;
  businessProblem: string;
  technicalSolution: string;
  awsServices: AWSService[];
  architectureDiagram: {
    imageUrl: string;
    mermaidCode?: string;
    interactiveElements?: DiagramElement[];
  };
  metrics: {
    uptime?: string;
    responseTime?: string;
    monthlyCost?: string;
    usersServed?: number;
  };
  technologies: string[];
  demoUrl?: string;
  codeUrl: string;
  infrastructureUrl?: string;
  status: "live" | "development" | "archived";
}

interface AWSService {
  name: string;
  icon: string;
  purpose: string;
  configuration?: string;
}
```

**Features:**

- Expandable card design (collapsed by default)
- Interactive architecture diagrams
- AWS service tooltips
- Live status indicators
- Performance metrics display
- Cost optimization highlights

### 4. ArchitectureDiagram Component

**Purpose:** Display technical diagrams with interactive elements

**Props Interface:**

```typescript
interface ArchitectureDiagramProps {
  diagram: {
    imageUrl: string;
    mermaidCode?: string;
    interactiveElements?: DiagramElement[];
  };
  services: AWSService[];
  onServiceHover: (service: AWSService) => void;
}

interface DiagramElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  service: AWSService;
}
```

**Features:**

- Zoomable/pannable diagrams
- Hover tooltips for AWS services
- Responsive scaling
- Loading states for large diagrams
- Alternative text descriptions for accessibility

## Data Models

### Project Data Structure

```typescript
// Current single project structure (expandable)
const awsProjects: AWSProject[] = [
  {
    id: "college-hq-aws",
    title: "College HQ - AWS Serverless Backend",
    description:
      "Serverless backend architecture for student management platform",
    businessProblem:
      "Students need a scalable platform to manage academic and social activities with real-time updates and AI-powered recommendations.",
    technicalSolution:
      "Implemented serverless architecture using AWS Lambda, API Gateway, and DynamoDB for auto-scaling and cost efficiency.",
    awsServices: [
      {
        name: "AWS Lambda",
        icon: "/aws-icons/lambda.svg",
        purpose:
          "Serverless compute for API endpoints and background processing",
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
    ],
    architectureDiagram: {
      imageUrl: "/diagrams/college-hq-architecture.png",
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
    technologies: ["React", "TypeScript", "Node.js", "AWS SDK"],
    demoUrl: "https://college-hq.example.com",
    codeUrl: "https://github.com/Jacroney/college-hq",
    infrastructureUrl: "https://github.com/Jacroney/college-hq-infrastructure",
    status: "live",
  },
];
```

### Filter State Management

```typescript
interface FilterState {
  selectedServices: string[];
  searchTerm: string;
  sortBy: "newest" | "complexity" | "cost";
}
```

## Error Handling

### Diagram Loading Errors

- Fallback to static images if interactive diagrams fail
- Progressive enhancement approach
- Error boundaries around diagram components
- Graceful degradation for unsupported browsers

### API/Demo Link Failures

- Status indicators for offline demos
- Cached performance metrics
- Fallback content for unavailable resources
- User-friendly error messages

### Mobile/Responsive Issues

- Touch-friendly diagram interactions
- Optimized image loading for mobile
- Collapsible sections for small screens
- Horizontal scrolling for wide diagrams

## Testing Strategy

### Unit Tests

- Component rendering with various project data
- Filter functionality and search logic
- Diagram interaction handlers
- Responsive behavior across breakpoints

### Integration Tests

- Full page navigation and state management
- Filter combinations and search results
- Diagram zoom/pan functionality
- Mobile touch interactions

### Visual Regression Tests

- Diagram rendering consistency
- AWS service icon positioning
- Card expansion animations
- Mobile layout verification

### Performance Tests

- Large diagram loading times
- Image optimization effectiveness
- Animation smoothness
- Memory usage during interactions

### Accessibility Tests

- Screen reader compatibility for diagrams
- Keyboard navigation through projects
- Color contrast for AWS branding
- Alternative text for technical diagrams

## Implementation Notes

### Scalability Considerations

- Component design supports 1-10+ projects
- Filter system activates automatically at 2+ projects
- Lazy loading for diagram images
- Virtualization for large project lists (future)

### AWS Branding Integration

- Official AWS color palette (#FF9900, #232F3E)
- AWS service icons from official icon set
- Professional technical documentation style
- Consistent with AWS console aesthetics

### Performance Optimizations

- Image lazy loading and WebP format
- Mermaid diagram caching
- Component memoization for expensive renders
- Progressive image enhancement

### Future Enhancements (September+)

- Interactive diagram editing
- Real-time AWS cost tracking
- Infrastructure deployment buttons
- Project comparison features
