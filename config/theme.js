import { rgba } from 'polished';

const colors = {
  white: {
    base: '#fff',
    light: '#f0f0f0',
    lightblue: '#c3c5c9',
    blueish: '#d6e1ff',
    blue: '#a0afd7',
  },
  black: {
    base: '#333438',
    light: '#52555e',
    lighter: '#9ca0a9',
    blue: '#2e3246',
    darkgrey: '#606060',
  },
  primary: {
    base: '#3498db',
    light: '#5abdff',
    dark: '#3466db',
  },
  blue: {
    dark: '#1a355b',
    medium: '#0d3166',
    light: '#2f61a8',
  },
  secondary: {
    base: '#3481db',
    light: '#60acff',
    dark: '#256ad1',
  },
  background: {
    light: '#46507a',
    dark: '#262c41',
  },
  brands: {
    discord: '#7289da',
    instagram: {
      yellow: '#f7eb4c',
      pink: '#ee2a7b',
      blue: '#4c6aff',
    },
    behance: '#191919',
    youtube: '#ff0000',
  },
};

const largeheader = {
  small: '400px',
  medium: '600px',
  large: '650px',
};

const tint = {
  black: rgba(colors.black.base, 0.1),
  white: rgba(colors.white.light, 0.85),
  blue: rgba(colors.primary.base, 0.3),
};

const gradient = {
  leftToRight: `linear-gradient(-45deg, ${colors.background.dark} 0%, ${colors.background.light} 100%)`,
  rightToLeft: `linear-gradient(45deg, ${colors.background.dark} 0%, ${colors.background.light} 100%)`,
};

const shadow = {
  button: {
    default: '5px 7px 15px',
    hover: '5px 15px 20px',
  },
  card: '0 20px 30px rgba(0, 0, 0, 0.1)',
  feature: {
    big: {
      default: '10px 10px 30px rgba(0, 0, 0, 0.6)',
      hover: '20px 20px 30px rgba(0, 0, 0, 0.3)',
    },
    small: {
      default: '10px 10px 30px rgba(0, 0, 0, 0.6)',
      hover: '20px 20px 30px rgba(0, 0, 0, 0.3)',
    },
  },
  text: {
    small: '0 2px 10px rgba(0, 0, 0, 0.85)',
    big: '0 5px 10px rgba(0, 0, 0, 0.18)',
  },
};

const button = {
  default: {
    background: colors.black.blue,
    boxShadow: `${shadow.button.default} ${rgba(colors.black.blue, 0.6)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.black.blue, 0.4)}`,
    },
  },
  primary: {
    background: `linear-gradient(30deg, ${colors.blue.light} 0%, ${colors.blue.dark} 100%)`,
    boxShadow: `${shadow.button.default} ${rgba(colors.primary.base, 0.4)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.primary.base, 0.3)}`,
    },
  },
  secondary: {
    background: `linear-gradient(30deg, ${colors.secondary.light} 0%, ${colors.secondary.dark} 100%)`,
    boxShadow: `${shadow.button.default} ${rgba(colors.secondary.base, 0.4)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.secondary.base, 0.3)}`,
    },
  },
};

const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};

const theme = {
  colors,
  tint,
  largeheader,
  gradient,
  button,
  shadow,
  breakpoints: ['480px', '650px', '1000px', '1200px', '1400px'],
  // breakpoints: {
  //   xs: '400px',
  //   s: '600px',
  //   xm: '750px',
  //   m: '900px',
  //   l: '1200px',
  //   xl: '1550px',
  // },
  fontFamily: {
    body: `Open Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    heading: `Aileron, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  layout: {
    article: '44.444rem',
    base: '70rem',
    big: '77rem',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
  },
};

export default theme;
