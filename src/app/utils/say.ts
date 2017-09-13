export default function say(msg:string|object): ()=>void {
    return ()=> alert( typeof msg=="string" ? msg : JSON.stringify(msg) );
}