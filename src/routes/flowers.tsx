import { createFileRoute } from '@tanstack/react-router';
import { Scrapbook, pageHead } from '@/components/birthday/scrapbook';
import panda from '@/assets/panda.png';
import bouquet from '@/assets/bouquet.png';
export const Route=createFileRoute('/flowers')({head:()=>pageHead('Flowers for My Sweetheart','A bouquet of love, just for you.'),component:Flowers});
function Flowers(){return <Scrapbook back><div className="flowers-layout"><div><img className="flowers-panda" src={panda} width={768} height={1024} alt="Your little panda"/><h1 className="flowers-caption">Flowers for my<br/>sweetheart!</h1></div><img className="bouquet-image" src={bouquet} width={768} height={1024} alt="Red roses and pink tulips, wrapped with a burgundy bow"/><div className="flower-messages">{['You’re my favorite person','My happy place','Forever and always','You make my heart smile','Lucky to have you','You are so loved'].map(text=><p key={text}>♥ {text}</p>)}</div></div></Scrapbook>;}