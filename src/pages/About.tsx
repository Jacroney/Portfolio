import { Badge, LayerCard, Link } from '@cloudflare/kumo';
import Seo from '../components/Seo';
import { Reveal, Stagger, StaggerItem } from '../components/Motion';

const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'C', 'Git', 'AWS', 'Cloudflare Workers', 'Supabase'];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo
        title="About"
        description="About Joe Croney — Computer Science student at Cal Poly SLO interested in AI, machine learning, and systems programming."
      />
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h1 className="text-3xl font-bold text-kumo-strong mb-8">About</h1>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="space-y-6 text-kumo-default leading-relaxed mb-12">
            <p>
              I'm Joe Croney, a Computer Science student at Cal Poly San Luis Obispo.
              I like building software that real people actually use — not just demos.
              My main project,{' '}
              <Link href="https://greekpay.org" target="_blank" rel="noopener noreferrer">
                GreekPay
              </Link>
              , is a production multi-tenant fintech platform that handles real dues and
              payments for fraternity chapters, built on Stripe Connect, Plaid, and a
              Claude-powered financial advisor.
            </p>
            <p>
              I work across the stack, but I'm most drawn to the hard parts: AI agents that
              take real actions, payment flows that can't afford to be wrong, and low-level
              systems work like the Unix-style file system I wrote in C for CSC 357. I care
              about clean, maintainable code and shipping things that hold up under real use.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-lg font-semibold text-kumo-strong mb-4">Skills</h2>
        </Reveal>
        <Stagger className="flex flex-wrap gap-2 mb-12" stagger={0.04}>
          {skills.map((skill) => (
            <StaggerItem key={skill} y={10}>
              <Badge variant="neutral">{skill}</Badge>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <h2 className="text-lg font-semibold text-kumo-strong mb-4">Education</h2>
          <LayerCard>
            <LayerCard.Secondary>B.S. Computer Science</LayerCard.Secondary>
            <LayerCard.Primary>
              <p className="text-kumo-strong font-medium">
                California Polytechnic State University, San Luis Obispo
              </p>
              <p className="text-sm text-kumo-subtle mt-1">
                Focus: artificial intelligence, machine learning, and systems programming
              </p>
            </LayerCard.Primary>
          </LayerCard>
        </Reveal>
      </div>
    </div>
  );
};

export default About;
