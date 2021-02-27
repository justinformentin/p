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

const theme = {
  colors,
  shadow,
  breakpoints: ['480px', '650px', '1000px', '1200px', '1400px'],
  fontFamily: {
    heading: `Source Sans Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    body: `Work Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    // body: `Work Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    // heading: `Aileron, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,

  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  trans: {
    all: 'all 0.3s ease',
    color: 'color 0.3s ease',
    bg: 'background 0.3s ease',
    opacity: 'opacity 0.3s ease',
    fill: 'fill 0.3s ease',
    height: 'height 0.3s ease'
  }
};

export default theme;
