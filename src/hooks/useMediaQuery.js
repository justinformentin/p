import { useEffect, useState } from 'react';

export function useMediaQuery(width) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const mediaMatch = window.matchMedia(`(max-width: ${width})`);
    setMatch(mediaMatch.matches);
    const handler = (e) => setMatch(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return match;
}
