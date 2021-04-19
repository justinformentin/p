import { useRef, useEffect } from 'react';

export function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    // return () => (mounted.current = false);
    return ()=>{
      // console.log('useMounted UE cleanup');
      mounted.current = false;
    }
  }, []);

  return mounted.current;
}
