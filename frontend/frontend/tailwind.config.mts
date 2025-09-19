import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        xs: '375px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1240px',
        '2xl': '1436px',
        '3xl': '1636px',
        '4xl': '1786px',
        '5xl': '1925px',
      },
    },
  },
} satisfies Config;

export default config;
