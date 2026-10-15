import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Heart, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scrapbook, pageHead } from '@/components/birthday/scrapbook';
import { Cake } from '@/components/birthday/cake';
import { HeartShower } from '@/components/birthday/heart-shower';
export const Route=createFileRoute('/birthday')({head:()=>pageHead('Happy Birthday Abinaya','A cake, a wish, and a birthday filled with love.'),component:Birthday});
function Birthday(){
 const [count,setCount]=useState(3);const [blown,setBlown]=useState(false);
 useEffect(()=>{const id=window.setInterval(()=>setCount(c=>Math.max(0,c-1)),850);return()=>clearInterval(id);},[]);
 return <Scrapbook>{count>0?<div className="countdown">Get ready...<strong>{count}</strong></div>:<><h1 className="birthday-title">Happy Birthday Abinaya</h1><div className="birthday-layout"><div className="cake-area"><Cake blown={blown}/><p className="cake-note">{blown?'Your wish is on its way ♡':'Make a little wish...'}</p><Button variant="scrapbook" onClick={()=>setBlown(true)} disabled={blown}><Wind/>{blown?'Wish made!':'Blow the Candles'}</Button></div><div className="calendar"><span className="tape"/><h2>October</h2><p>• Birthday month •</p><div className="calendar-grid">{['SUN','MON','TUE','WED','THU','FRI','SAT'].map(day=><span className="weekday" key={day}>{day}</span>)}{Array.from({length:4},(_,i)=><span key={`empty${i}`}/>)}{Array.from({length:31},(_,i)=><span className={i===14?'birthday-day':''} key={i}>{i+1}</span>)}</div></div></div><Button variant="scrapbook" className="continue-button" asChild><Link to="/gifts" search={{menu:false}}><Heart fill="currentColor"/> Continue</Link></Button>{blown&&<HeartShower/>}</>}</Scrapbook>;
}