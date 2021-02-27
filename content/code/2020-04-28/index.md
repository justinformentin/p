---
title: 'Easiest react dark mode or theme switcher'
path: 'easiest-react-theme-switcher'
date: '2020-04-28'
chunk: 'The easiest way to add a dark mode or theme switcher to your React app. Ever.'
kind: 'Article'
category: 'JavaScript'
tags:
  - Development
  - React
  - Theme
  - CSS Variables
published: "true"
---




This is hands down the easiest dark mode/theme switcher you'll find.

## Notes

CSS Variables will not work in [any IE version](https://caniuse.com/#feat=css-variables). If for some god awful reason you really need to have a theme switcher work in Internet Explorer, you can go the slightly more complicated route, and convert the functionality to a hook. You can do something like

```js
export function useThemeSwitcher() {
  const initialTheme = localStorage.getItem('theme-switcher');
  const [themeType, setThemeType] = useState(initialTheme);

  useEffect(() => {
    themeType();
  }, [toggleTheme]);
  return {
    toggleTheme,
    theme,
  };
}
```

But let's be honest. Those of us that begrudgingly agree to support IE, in any capacity, do so to appease the businesses that are unable or unwilling to update, with a whopping 1% browser usage. But then those aren't the people that will be looking at my site. And if you have made the conscious decision to use IE as your personal browser, I don't really care if you're unable to change the background color on my personal site. Also, keep in mind this is "The Simplest Theme Switcher<sup>TM</sup>", not "The Most Robust Theme Switcher That You Should Totally Use In Your Production Application".