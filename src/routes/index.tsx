import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/components/birthday/scrapbook';
import couple from '@/assets/bear-bunny.png';

export const Route = createFileRoute('/')({head:()=>pageHead('A Little Surprise','Unlock a birthday surprise made just for you.'),component:Index});
function Index() {
 const [code,setCode]=useState('');
 const [error,setError]=useState('');
 const navigate=useNavigate();
 const unlock=()=>{if(code.length===4){void navigate({to:'/birthday'});}else{setError('A little secret needs four digits ♡');}};
 const enter=(key:string)=>{setError('');if(key==='*'){setCode('');}else if(key==='#'){setCode(c=>c.slice(0,-1));}else{setCode(c=>c.length<4?c+key:c);}};
 useEffect(()=>{const listener=(e:KeyboardEvent)=>{if(/^\d$/.test(e.key))enter(e.key);else if(e.key==='Backspace')enter('#');};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener);},[]);
 return <main className="lock-page"><section className="lock-art" aria-label="Made with love"><div className="art-paper"><img className="couple-img" src={couple} width={1024} height={1024} alt="A bear and bunny sharing a little pink heart"/>{Array.from({length:5},(_,i)=><span className="mini-heart" key={i} aria-hidden="true">♥</span>)}</div></section><section className="lock-controls"><h1 className="lock-title">Enter the Passcode</h1><div className="passcode-dots" aria-label={`${code.length} of 4 digits entered`} aria-live="polite">{Array.from({length:4},(_,i)=><div className="passcode-dot" key={i}>{i<code.length?'♥':''}</div>)}</div><div className="keypad">{['1','2','3','4','5','6','7','8','9','*','0','#'].map(key=><Button variant="keypad" key={key} aria-label={key==='*'?'Clear passcode':key==='#'?'Delete last digit':key} onClick={()=>enter(key)}>{key==='#'?<Delete/>:key}</Button>)}</div><Button variant="unlock" onClick={unlock}>UNLOCK</Button><p className="passcode-error" role="status">{error}</p></section></main>;
}
