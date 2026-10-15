import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Heart } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { readUnlocked } from '@/components/birthday/unlock';

function Flower() {
 return <svg className="flower" viewBox="0 0 110 110" aria-hidden="true"><path d="M55 35C23 0 4 32 32 52C-4 65 15 100 44 77C52 114 88 101 75 71C112 79 112 39 77 42C88 8 53 0 55 35Z"/><circle cx="55" cy="55" r="10"/><path d="M55 55 43 35M55 55 77 48M55 55 67 78M55 55 34 69" fill="none"/></svg>;
}
export function Scrapbook({ children, back = false, backTo, scroll = false }: { children: ReactNode; back?: boolean; backTo?: '/birthday'; scroll?: boolean }) {
 const navigate = useNavigate();
 const [unlocked] = useState(readUnlocked);
 useEffect(() => { if (!unlocked) void navigate({ to: '/', replace: true }); }, [unlocked, navigate]);
 if (!unlocked) return <main className="scrapbook"/>;
 return <main className={scroll ? 'scrapbook scrapbook-scroll' : 'scrapbook'}><div className="paper-corner"/><div className="paper-corner bottom"/><div className="deco-stars" aria-hidden="true"><span className="deco-star">★</span><span className="deco-star">★</span><span className="deco-star">★</span></div><Heart className="outline-heart one"/><Heart className="outline-heart two"/><div className="flower-cluster" aria-hidden="true"><Flower/><Flower/><Flower/></div><div className="flower-cluster right" aria-hidden="true"><Flower/></div><span className="scribble left">xoxo</span><span className="scribble right">always.</span>{back && <div className="back-button"><Button variant="scrapbook" asChild><Link to="/gifts" search={{menu:true}}><ArrowLeft/> Back</Link></Button></div>}{backTo && <div className="back-button"><Button variant="scrapbook" asChild><Link to={backTo}><ArrowLeft/> Back</Link></Button></div>}<div className="page-content">{children}</div></main>;
}
export function Confetti() {
 return <div className="heart-confetti" aria-hidden="true">{Array.from({length:24},(_,i)=><span key={i} style={{left:`${(i*37)%100}%`,animationDelay:`${(i%7)*.16}s`}}>♥</span>)}</div>;
}
export function pageHead(title: string, description: string) {
 return { meta: [{title: `${title} · For You, With Love`},{name:'description',content:description},{property:'og:title',content:`${title} · For You, With Love`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] };
}
