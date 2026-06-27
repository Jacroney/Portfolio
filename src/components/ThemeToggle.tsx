import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Desktop } from '@phosphor-icons/react';
import { useTheme, type Theme } from '../lib/theme';

const meta: Record<Theme, { label: string; Icon: typeof Sun }> = {
  light: { label: 'Light', Icon: Sun },
  dark: { label: 'Dark', Icon: Moon },
  system: { label: 'System', Icon: Desktop },
};

interface Props {
  className?: string;
}

/** Cycles Light → Dark → System. Animates the icon swap. */
const ThemeToggle = ({ className }: Props) => {
  const { theme, cycle } = useTheme();
  const { label, Icon } = meta[theme];

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to switch.`}
      title={`Theme: ${label}`}
      className={`relative grid h-9 w-9 place-items-center rounded-lg text-kumo-subtle transition-colors hover:bg-kumo-tint hover:text-kumo-strong ${className ?? ''}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute inset-0 grid place-items-center"
        >
          <Icon size={19} weight="bold" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
