import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Button, Input, InputArea, Link, LayerCard } from '@cloudflare/kumo';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import { Reveal } from '../components/Motion';

const CONTACT_EMAIL = 'joe@greekpay.org';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio message from ${formData.name}`;
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    // Open the visitor's email client with the message pre-filled.
    window.location.href = mailto;
    setStatus('success');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo title="Contact" description="Get in touch with Joe Croney." />
      <div className="max-w-xl mx-auto px-6">
        <Reveal>
          <h1 className="text-3xl font-bold text-kumo-strong mb-2">Contact</h1>
          <p className="text-kumo-subtle mb-8">
            Have a question or want to connect? Send me a message.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          {status === 'success' ? (
            <LayerCard>
              <LayerCard.Primary className="text-center py-4">
                <p className="text-kumo-strong font-medium mb-2">Your email is ready to send.</p>
                <p className="text-kumo-subtle mb-6">
                  Your mail app should have opened with the message pre-filled. If it
                  didn't, email me directly at{' '}
                  <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>.
                </p>
                <Button variant="secondary" onClick={() => setStatus('idle')}>
                  Write another message
                </Button>
              </LayerCard.Primary>
            </LayerCard>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputArea
                label="Message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="primary" size="lg" icon={PaperPlaneTilt} className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </Reveal>

        <div className="mt-12 pt-8 border-t border-kumo-line">
          <p className="text-kumo-subtle text-sm">
            Or reach me directly at{' '}
            <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>,{' '}
            <Link href="https://www.linkedin.com/in/joseph-croney/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
            , or{' '}
            <Link href="https://github.com/Jacroney" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
