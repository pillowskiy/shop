import dynamic from 'next/dynamic';
import mobile from 'is-mobile';

export const QueryBar = dynamic(() => {
  console.log("Rendered QueryBar");
  return mobile() ?
    import('./mobile'):
    import('./desktop');
}, { ssr: false });