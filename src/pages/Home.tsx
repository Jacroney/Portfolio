import { motion, useReducedMotion } from 'framer-motion';
import { Badge, LinkButton } from '@cloudflare/kumo';
import { ArrowRight, DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import { Stagger, StaggerItem } from '../components/Motion';

const focusAreas = ['AI & Machine Learning', 'Systems Programming', 'Full-Stack'];

/** Soft, slowly drifting brand-orange glows behind the hero. */
const HeroBackdrop = () => {
  const reduce = useReducedMotion();
  const float = reduce
    ? {}
    : { animate: { scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }, transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' as const } };
  const float2 = reduce
    ? {}
    : { animate: { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }, transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 } };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        {...float}
        className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-kumo-brand/20 blur-3xl"
      />
      <motion.div
        {...float2}
        className="absolute top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-kumo-link/15 blur-3xl"
      />
      {/* faint dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(var(--color-kumo-line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 70%)',
        }}
      />
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Seo title="Joe Croney" />
      <HeroBackdrop />

      <div className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Stagger className="py-16 md:py-24" stagger={0.1}>
            <StaggerItem>
              <Badge variant="orange" className="mb-6">
                Computer Science @ Cal Poly SLO
              </Badge>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-kumo-strong mb-5">
                Joe Croney
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-xl text-kumo-subtle max-w-2xl leading-relaxed mb-8">
                I build software that real people actually use — production fintech,
                AI agents that take real actions, and low-level systems. Specializing in{' '}
                <span className="text-kumo-default font-medium">artificial intelligence</span>,{' '}
                <span className="text-kumo-default font-medium">machine learning</span>, and{' '}
                <span className="text-kumo-default font-medium">systems programming</span>.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-2 mb-10">
                {focusAreas.map((area) => (
                  <Badge key={area} variant="neutral">
                    {area}
                  </Badge>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap items-center gap-3">
                <LinkButton href="/projects" variant="primary" size="lg">
                  View Projects
                  <ArrowRight size={18} weight="bold" className="ml-1" />
                </LinkButton>
                <LinkButton href="/contact" variant="secondary" size="lg" icon={EnvelopeSimple}>
                  Get in Touch
                </LinkButton>
                <LinkButton
                  href="/Joseph Croney - Resume.pdf"
                  variant="ghost"
                  size="lg"
                  icon={DownloadSimple}
                  download
                >
                  Resume
                </LinkButton>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </div>
  );
};

export default Home;
