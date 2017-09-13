export type DOSomething = ()=>void;
export function after(callback: DOSomething): void
export function after(sec: number, callback:DOSomething): void 
export function after(p: DOSomething|number, cb?: DOSomething): void
{
    let s: number = (typeof p==="number")? p : 1; //default 1sec
    let c: DOSomething = (typeof p!=="number")? p : cb!;
    console.log(`wait ${s}sec...`);
    setTimeout( c, s*1000 );
}