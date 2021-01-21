import { useEffect, useState } from 'react';

export function useMediaQuery(width) {
  const mediaMatch = window.matchMedia(`(max-width: ${width})`);

  const [match, setMatch] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatch(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return match;
}
