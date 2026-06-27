import { motion } from 'framer-motion';
import { Badge, LayerCard, Link } from '@cloudflare/kumo';
import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import { Reveal, Stagger, StaggerItem } from '../components/Motion';

interface Project {
  id: number;
  title: string;
  eyebrow: string;
  live?: boolean;
  description: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'GreekPay',
    eyebrow: 'Production SaaS · Fintech',
    live: true,
    description:
      'A production multi-tenant SaaS financial platform for fraternity chapters, used by real organizations. Handles dues, budgets, and reporting alongside Stripe Connect payments, installment plans with autopay, Plaid bank sync, reimbursements with AI receipt verification, and a Claude-powered advisor that can execute financial actions with treasurer approval.',
    technologies: [
      'React', 'TypeScript', 'Supabase', 'Deno Edge Functions',
      'Stripe Connect', 'Plaid', 'Claude AI', 'Cloudflare Workers',
    ],
    demoUrl: 'https://greekpay.org',
  },
  {
    id: 2,
    title: 'College HQ',
    eyebrow: 'Full-Stack Platform',
    description:
      'A full-stack platform designed to help students manage their academic and social lives. Includes registration tools, class planners, and AI agents for smarter course decisions.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AWS Lambda'],
    codeUrl: 'https://github.com/Jacroney/College-HQ',
  },
  {
    id: 3,
    title: 'Emulated File System',
    eyebrow: 'Systems Programming · C',
    description:
      'A Unix-like file system emulator written in C. Supports directories, inodes, and basic file operations. Built for CSC 357 Systems Programming.',
    technologies: ['C', 'POSIX', 'Unix System Calls'],
    codeUrl: 'https://github.com/Jacroney/C-Terminal-Emulator',
  },
  {
    id: 4,
    title: 'Greek Budget Copilot',
    eyebrow: 'AI · Cloudflare Workers',
    live: true,
    description:
      'AI-powered budget management tool for fraternity treasurers. Set budget parameters and chat with an AI assistant for what-if financial analysis, powered by Cloudflare Workers AI.',
    technologies: ['TypeScript', 'Cloudflare Workers', 'Durable Objects', 'Workers AI'],
    demoUrl: 'https://e497e243.cf-ai-greek-pay-agent.pages.dev/',
    codeUrl: 'https://github.com/Jacroney/cf_ai_greek_pay_agent',
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo
        title="Projects"
        description="Selected software projects by Joe Croney — finance dashboards, AI tools, and systems programming."
      />
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h1 className="text-3xl font-bold text-kumo-strong mb-2">Projects</h1>
          <p className="text-kumo-subtle mb-12">
            Selected work from coursework and personal initiatives.
          </p>
        </Reveal>

        <Stagger className="grid gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                <LayerCard>
                  <LayerCard.Secondary className="flex items-center justify-between">
                    <span className="text-sm text-kumo-subtle">{project.eyebrow}</span>
                    {project.live && (
                      <Badge variant="success" appearance="dot">Live</Badge>
                    )}
                  </LayerCard.Secondary>
                  <LayerCard.Primary>
                    <h2 className="text-xl font-semibold text-kumo-strong mb-2">
                      {project.title}
                    </h2>
                    <p className="text-kumo-default leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="neutral">{tech}</Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-5">
                      {project.demoUrl && (
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="plain"
                          className="inline-flex items-center gap-1.5 text-sm font-medium"
                        >
                          View Project <ArrowSquareOut size={15} weight="bold" />
                        </Link>
                      )}
                      {project.codeUrl && (
                        <Link
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="plain"
                          className="inline-flex items-center gap-1.5 text-sm font-medium"
                        >
                          <GithubLogo size={15} weight="fill" /> Source Code
                        </Link>
                      )}
                    </div>
                  </LayerCard.Primary>
                </LayerCard>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

export default Projects;
