---
theme : "white"
highlightTheme: "Monokai"
---

# PRE-REQUISITI

- NodeJS    [download](https://nodejs.org)
- NPM       `npm i -g npm`
- NG CLI    `npm i -g @angular/cli`
- GIT       [download](https://www.git-scm.com/download) *OPZIONALE*

Verificare che tutto sia installato correttamente:
```terminal
node -v         (>= v.8.4.0)
npm -v          (>= v.5.4.1)
ng -v           (>= v.1.4.1)
git --version   (>= v.2.9.2)
```

---

# INIZIALIZZAZIONE AMBIENTE

- **ESEGUIRE** i seguenti comandi da riga di comando per installare tutto:
```terminal
ng new --minimal ng-ex
cd ng-ex
code .
npm i -S bootstrap
... EDITARE .angular-cli.json COME SOTTO ...
ng serve
```

--

- **MODIFICARE** [.angular-cli.json](.angular-cli.json) per inserire bootstrap.css + prefix + inline:false
```diff
...
+     "prefix": "eos",
      "styles": [
+       "../node_modules/bootstrap/dist/css/bootstrap.css",
        "styles.css"
      ],
...
    "defaults": {
        "styleExt": "css",
        "component": {
            "spec": false,
+           "inlineStyle": false,
+           "inlineTemplate": false
        },
...
```

--

- **MODIFICARE** [src/index.html](src/index.html) cambiando il title + aggiungere classe `container`
```diff
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
+ <title>EXLIVE IN NG</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
+<body class="container">
  <app-root></app-root>
</body>
</html>
```
*Nota:* Non è necessario aggiungere NESSUNO `<script>` o `<style>` perchè viene fatto da **NG CLI** 

--

- **MODIFICARE** [src/app/app.component.ts](src/app/app.component.ts) nel `template` per inserire i componenti che andrete a realizzare come soluzione dei vari esercizi:
```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
-    <p>
-      app Works!
-    </p>
+   <div>
+      <!-- YOUR COMPONENTS GOES HERE -->
+
+   </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
```

---

# ESERCIZIO 0.1: OVERLOADS

Creare [src/app/utils/after.ts](src/app/utils/after.ts) funzione **after** in modo che accetti più overload di chiamata: 
- solo callback e aspetta tempo default 1sec
- tempo in sec, e callback in questo ordine
```typescript
export type DOSomething = ()=>void;
export function after(callback: DOSomething): void
export function after(sec: number, callback:DOSomething): void 
export function after(p: DOSomething|number, cb?: DOSomething): void {
    //TODO...
}
```

---

# ESERCIZIO 0.2: FACTORY/LAMBDA + INDEX.TS

Creare [src/app/utils/say.ts](src/app/utils/say.ts) per fare una **Factory** (funzione che ritorna un'altra funzione) che serve a fare un alert (messaggio a video) mostrando o il testo fisso passato se il parametro in ingresso è una stringa, oppure il contenuto (JSON.stringify) dell'oggetto passato nel caso di object, la firma della funzione say da realizzare è questa:
```typescript
export default function say(msg:string|object): ()=>void {
    //TODO...
}
```

E poi crare [src/app/utils/index.ts](src/app/utils/index.ts) modulo ES6 che ri-esporta tutte le funzioni fin'ora create: [after](src/app/utils/after.ts) e [say](src/app/utils/say.ts)

--

# ESERVIZIO 0.3: ANGULAR BOOTSTRAP

- Aggiungere un ```console.log("BOOTSTRAP ANGULAR APP IN:", environment.production?'PROD':'DEV');``` nel file **????.ts** prima che l'applicazione Angular parta!

--

# ESERCIZIO 0.4: ANGULAR 1st COMPONENT

- Aggiungere un ```console.log("FIRST ANGULAR COMPONENT CREATED");``` nel file **???.component.ts** del primo componente che viene creato quando parte l'applicazione Angular 
*TIPS:* ricordatevi che un component è una *class* quindi quando viene creato viene invocato il suo **CTOR**!

--

# ESERCIZIO 0.5: UTILIZZO FUNZIONI IN ANGULAR

- Modificare [src/app/app.component.ts] per mostrare un alert a video con messaggio "Hello World" dopo 2 secondi da quando il componente è stato inizializzato, per mostrare il messaggio ritardato usate le funzioni (say , after) presenti in [./utils](src/app/utils)!
*TIPS:* scrivere il codice nel corretto **LIFE-CYCLE HOOKS *OnInit**!

--- 

# ESERCIZIO 1: JUMBOTRON + click handler

Creare componente [src/app/home](src/app/home/home.component.ts) per gestire una sezione JUMBOTRON con il seguente template: 
```html
<div class="jumbotron">
    <h1>Hello, world!</h1>
    <p>...</p>
    <p><button class="btn btn-primary btn-lg">Learn more</button></p>
</div>
```
dovrete aggiungere un **click handler** sul pulsante per mostrare un messaggio fisso dopo 1 secodno (sfruttando le funzioni già fatte: **after** e **say**).
*TIPS:* usare la CLI per generare il componente: `ng g component xxxx`
*TIPS:* ricordarsi di inserire il tag del component creato nel `template` dell'[app.component](src/app/app.component.ts)

---

# ESERCIZIO 2: OPER INPUT/SELECT #var.value

Creare componente [src/app/oper](src/app/oper/oper.component.ts) per gestire un PANEL con il seguente template:
```html
<div class="panel panel-default">
    <div class="panel-body">
        <form class="form-inline">
            <div class="form-group">
                <label for="a">A:</label>
                <input type="number" class="form-control">
            </div>
            <select class="form-control">
                <option value="add">+</option>
                <option value="sub">-</option>
                <option value="mul">*</option>
                <option value="div">/</option>
            </select>
            <div class="form-group">
                <label for="b">B:</label>
                <input type="number" class="form-control">
            </div>
            <button type="submit" class="btn btn-default">CALC</button>
        </form>
    </div>
</div>
```
dovrete trovare un modo per leggere i valori correnti dei campi degli `<input>` e `<select>`, ed infine aggiungere un **click handler** per calcolare il risultato dell'operazione selezionata mostrandolo in un alert.
*TIPS:* potete usare la sintassi `#var` nel template per catturare un riferimento agli elmenti del DOM, per poi leggere .value
*TIPS:* per evitare problemi di submit/reload della pagina potete usare `$event.preventDefault();` nell'handler dell'evento!

---

# ESERCIZIO 3: ECHO INPUT->SPAN + TOGGLE CLASS

Creare componente [src/app/echo](src/app/echo/echo.component.ts) per gestire un PANEL con il seguente template:
```html
<div class="panel panel-default">
  <div class="panel-body">
      <div class="form-group">
          <label for="read">I READ:</label>
          <input type="text">
          <p class="help-block">Write something here, and I'll ...</p>
      </div>
      <div class="checkbox">
          <label>
              <input type="checkbox">
              Try click me to change something!
          </label>
      </div>
      <span><!--ECHO HERE--></span>
  </div>
</div>
```
dovrete trovare un modo per leggere `<input>` e tenere aggiornato in **real-time** uno `<span>` con il testo digitato, ed inoltre gestire il `toggle` (aggiungere/togliere) la classe css `bg-danger` per formattare il campo.
*TIPS:* potete usare il **two-way databind** `[()]` per fare l'echo del testo
*TIPS:* potete usare la sintassi di **binding** `[class.xxx]` insieme ad una `#var` per gestire le classi css da applicate dinamicamente in base a `.checked`
*TIPS:* rircordate di importare **FormsModule** in AppModule per usare `ngModel`!

---

# ESERCIZIO 4: CHAT NgForm + LISTA *ngFor

Creare componente [src/app/chat](src/app/chat/chat.component.ts) per gestire un PANEL con il seguente template:
```html
<div class="panel panel-default">
  <div class="panel-body">
      <p class="bg-info text-left">Ciao come va?</p>
      <p class="bg-success text-right">bene e tu</p>
  </div>
  <div class="panel-footer">
      <form>
          <label class="radio-inline">
              <input type="radio" name="who" value="bg-info text-left" checked> Pippo
          </label>
          <label class="radio-inline pull-right">
              <input type="radio" name="who" value="bg-success text-right"> Pluto
          </label>
          <div class="input-group">
              <input type="text" name="msg" class="form-control" placeholder="Writing...">
              <span class="input-group-btn">
                  <button class="btn btn-default" type="submit">Send</button>
              </span>
          </div><!-- /input-group -->
      </form>
  </div>
</div>
```
dovete trovare un modo per gestire la `<form>` per leggere i valori del `radio` selezionato e del campo `text` con il testo del messaggio da inserire nella chat quando l'utente preme INVIO (submit della form), inoltre dovete rappresentare il messaggio accodandolo nel pannello sopra formattando oppurtunamente il tag `<p>` con delle classi css in base all'utente selezionato.
*TIPS:* potete usare `*ngFor` per scorre l'array dei messaggi e `ngClass` per gli stili css
*TIPS:* potete usare  `ngModel` per gestire il **binding** dei campi
*TIPS:* potete usare `#f="ngForm" (ngSubmit)="add(f)"` per gestire l'intera form
*BONUS:* validazione del campo di testo in modo da evitare messaggi di testo vuoti `required`

---

# ESERCIZIO 5: AJAX HTTP
Creare componente [src/app/ajax](src/app/ajax/ajax.component.ts) per gestire un PANEL con il seguente template:
```html
<div class="panel panel-default">
  <div class="panel-heading">
      <button type="button" class="btn btn-success btn-lg">Random Number</button>
      <button type="button" class="btn btn-primary btn-lg">Fact of the Day</button>
      <button type="button" class="btn btn-default btn-lg">Clear Log</button>
  </div>
  <div class="panel-body">
      <pre>2017-09-14 20:03:46GMT+2 "GET >> http://numbersapi.com/random?max=31&json"</pre>
      <pre>2017-09-14 20:03:46GMT+2 "RES << 8"</pre>
  </div>
</div>
```
usare il seguente snippet di codice per fare l'helper di chiamata generico **httpGET**
```typescript
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/toPromise';
  
private _log(msg:any, prefix:string="") {
    this.logs.push({
      when: new Date(), 
      what: prefix + JSON.stringify(msg)
    });
}

private _err2def<T>(err:any, def:T): Observable<T> {
    this._log({ERROR: err.message || err});
    return Observable.of(def);
}

private httpGET<T>(apiUrl: string, getDatatFromJSON: (data:any)=>T, def:T): Promise<T> {
    this._log(`GET >> ${apiUrl}`);
    return this.http.get(apiUrl)
            .map( res => res.json())
            .map( getDatatFromJSON )
            .do( data => this._log(data,"RET << "))
            .catch( err => this._err2def(err, def))
            .toPromise()
}  
```
dovrete aggiungere un **click handler** per ogni pulsante ed eseguire il richiamo di una [REST API](http://numbersapi.com/) tramite il servizio `Http` di Angular e l'helper **httpGET**, nello specifico:
- Ricavare un numero generico richiamando `http://numbersapi.com/random/?max=31&json`
- Ricavare il fatto del giorno richiamando `http://numbersapi.com/<month>/<day>/date/?json` prima va calcolato **month** e **day** come random (TIPS: Promsie.all([...])). 
- Cercare di loggare tutte le chiamate i risultati ed eventuali errori sul tag di log `<pre>`
*TIPS:* usare la **DI** (dependency injection) per farsi ignettare il servizio `http: Http` 
*TIPS:* includere il parametro `BASERURL=http://numbersapi.com/` negli **environment**
*TIPS:* ricordate di importare **HttpModule** in AppModule per usare `Http`!

---

# ESERCIZIO 6: BONUS ROUTER

Fare un refactor dell'applicazione per usare il `RouterModule` per passare da un componente all'altro
- Configurare e inizializzare il **RouterModule** in [app.module](src/app/app.module.ts)
- Riscrivere il template dell' [app.component](src/app/app.component.ts) per includere il seguente menu di navigazione usando i tag `<router-outlet>` e le direttive `routerLink` + `routerLinkActive`
```html
<nav>
    <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a <!--MANCA QUALCOSA--> >Home</a></li>
        <li role="presentation" ><a <!--MANCA QUALCOSA--> >Oper</a></li>
        <li role="presentation" ><a <!--MANCA QUALCOSA--> >Echo</a></li>
        <li role="presentation" ><a <!--MANCA QUALCOSA--> >Chat</a></li>
        <li role="presentation" ><a <!--MANCA QUALCOSA--> >Ajax</a></li>
    </ul>

    <!--MANCA QUALCOSA-->
</nav>
```

---

# ESERCIZIO 7: FORM LOGIN
Creare componente [src/app/login](src/app/login/login.component.ts) per gestire una form di LOGIN con il seguente template:
```html
<form class="form-horizontal">
  <div class="form-group has-error">
    <label class="col-sm-2 control-label">User</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" placeholder="Email">
      <!-- AGGIUNGERE VALIDAZIONI NECESSARIE E ABILITARE SEGNALAZIONE ERRORE SOLO IN CASO ERRORE -->
      <span class="help-block">* A valid EMail is required.</span>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" placeholder="Password min 3, max 8 char">
      <span class="help-block"><!-- INSERIRE QUI DUE MESSAGGI PER IL CONTROLLO LUNGH PWD --></span>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-5">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
    <div class="col-sm-5">
      <button type="submit" class="btn btn-success pull-right">LOGIN</button>
    </div>
  </div>
</form>
```
- Aggiungere la Form `login` al Routing nel file [app.module](src/app/app.module.ts)
- E modificare oppurtunamente il menù di navigazione in [app.component](src/app/app.component.ts) per aggiungere la tab di `Login`
- Gestire nel componente [src/app/login](src/app/login/login.component.html) il Binding con `ngModel` e `ngForm` in modo da poter controllare le seguenti cose:
- Il campo `user` deve essere Obbligatorio + accettare solo `email` valide
- Nel caso in cui l'utente non inserisca un valore valido, il campo andrà bordato di rosso e dovrà essere mostrato il relativo messaggio di errore (come nell'html di esempio)
- Il campo `pwd` per essere valido dovrà consentire l'inserimento di password `Lunghe min` 3 caratteri, `max` 8.
- Nel caso in cui l'utente non rispetti questi criteri il campo dovrà essere bordato di giallo (class css `has-warning`) 
- E inoltre dovrete aggiungere e visualizzare i relativi messaggi di errore sotto al campo. 
- Infine il pulsante di LOGIN dovrà essere `Disabilitato` se ci sono errori nella form, e sarà cliccabile solo quando tutto è OK, mostrando un alert con `JSON.stringify(credenziali)`

PS: Obbligatorio usare almeno 2 metodi (condizioni) diverse per mostrare i vari messaggi di errore relativi ai vari campi

---

# ESERCIZIO 8: FORM SIGNIN
Creare componente [src/app/signin] (src/app/signin/signin.component.ts) a partire dalla [login](src/app/login) del p.to precedente, per gestire una form di SIGNIN con il seguente template:
```html
<form class="form-horizontal">
<!-- COPIARE QUI HTML FORM LOGIN: CAMPI EMAIL, PASSWORD -->
<!-- ESCLUDERE DAL CHECKBOX REMEMBER ME IN GIU' AGGIUNGENDO QUANTO SEGUE -->
  <div class="form-group has-warning">
    <label class="col-sm-2 control-label">Confirm</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" placeholder="Confirm your password">
      <span class="help-block"><!-- INSERIRE QUI MESSAGGIO ERRORE SE PWD NON CORRISPONDE --></span>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">REGISTER</button>
    </div>
  </div>
</form>
```
- Aggiungere la Form `signin` al Routing nel file [app.module](src/app/app.module.ts)
- E modificare oppurtunamente il menù di navigazione in [app.component](src/app/app.component.ts) per aggiungere la tab di `SignIn`
- Gestire nel componente [src/app/signin](src/app/login/signin.component.html) il Binding con `ngModel` e `ngForm` riportando le validazioni già fatte nel `login` e aggiungendo le seguenti cose:
- Creare una `VALIDAZIONE CUSTOM` [core/match](src/app/core/match.directive.ts) per la form, per verificare che il testo del campo `confirm` corrisponda a quello inserito in `pwd`
- Nel caso in cui l'utente non inserisca un valore valido, il campo andrà bordato di giallo `has-warning` e dovrà essere mostrato il relativo messaggio di errore (come nell'html di esempio)
- Il pulsante di REGISTER dovrà essere `Disabilitato` se ci sono errori nella form, e sarà cliccabile solo quando tutto è OK

---

# ESERCIZIO 9: SERVIZIO AUTH

- Installare `npm i -D json-server` e utilizzare il seguendo file [db.json](db.json)
```json
{
    "auth": [ { "id": 1, "user": "info@mdeasy.it", "pwd": "daniele" } ]
}
```
Avviare il servizio in un'altra finestra terminal con il comando: `json-server --watch db.json`
- Creare un servizio [core/auth](src/app/core/auth.service.ts) e al suo interno usare il modulo `Http` di Angular includendo le seguenti righe
```typescript
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

interface AuthCred {
    user: string,
    pwd: string
}
```
- Aggiungere il seguente metodo per fare una POST di inserimento dei dati di registrazione di un nuovo utente:
```typescript
public register(cred: AuthCred): Promise<boolean> {
    //TODO: fare una POST verso http://localhost:3000/auth per inserire le credenziali nel db.json
}
``` 
- Aggiungere il seguente metodo per fare una GET di lettura per verificare se esiste già un utente con una data email
```typescript
public justUsed(email: string): Promise<boolean> {
    //TODO: fare una GET verso http://localhost:3000/auth?user=<EMAIL> per verificare se esistono utenti già registrati con la EMAIL passata
  }
``` 
- Utilizzare `AuthService` nella form [src/app/signin](src/app/signin/signin.component.ts) per gestire la REGISTRAZIONE utente inserendo i dati della Form quando validi
- BONUS: Creare una `VALIDAZIONE ASYNCRONA CUSTOM` [core/asyncJustUsed](src/app/core/asyncJustUsed.directive.ts) per verificare se l'email è già stata utilizzata/registrata.

# ESERCIZIO 10: FORM CONTACT
Creare componente [src/app/contact] (src/app/contact/contact.component.ts) per gestire una form di SALVATAGGIO DATI con il seguente template:
```html
<form class="form-horizontal">
  <div class="form-group"><!-- AGGIUNGERE CLASSE has-error SE CAMPO INVALIDO -->
    <label class="col-sm-2 control-label">Name</label>
    <div class="col-sm-10">
      <input class="form-control" placeholder="name is required and min 3 chars">
      <span><!-- MOSTRARE QUI I MESSAGGI DI ERRORE PER CAMPO OBBLIGATORIO E LUNGHEZZA MINIMA DI 3 CARATTERI IN BASE AL VALORE DEL CAMPO --></span>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Sex</label>
    <div class="col-sm-10">
        <label class="radio-inline">
            <input type="radio" value="M"> Man
        </label>
        <label class="radio-inline">
          <input type="radio" value="F"> Woman
        </label>
        <label class="radio-inline">
          <input type="radio" value="A"> Angel
        </label>
        <span><!-- MOSTRARE QUI MESSAGGIO NEL CASO DI VALORE DIVERSO DA M/F --></span>
    </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">Age</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" placeholder="age valid 1-100">
      </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Address</label>
    <div class="col-sm-10 well">
        <div class="form-group">
            <label class="col-sm-2 control-label">City</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="city anything is good, no validation">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Prov</label>
            <div class="col-sm-10">
              <select class="form-control" placeholder="prov use async validate PD|VI|TV|PN">
                <option></option>
                <option>PD</option>
                <option>PN</option>
                <option>TV</option>
                <option>VI</option>
                <option>VR</option>
                <option>VE</option>
              </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Cap</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="cap must be string with 5 digit">
            </div>
        </div>
    </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">Phones</label>
      <button type="button" class="btn btn-default pull-left"> + </button>
 
      <div class="input-group">
        <input type="text" class="form-control" placeholder="phone must begin with 328|320|347|333">
        <span class="input-group-btn">
          <button class="btn btn-default"> - </button>
        </span>
      </div>
  </div>
  <div class="col-sm-offset-8 col-sm-4">
    <button type="submit" class="btn btn-success pull-right">SAVE</button>
    <button type="button" class="btn btn-default pull-left">CANCEL</button>
  </div>
</form>

<hr/>
<pre>
VALID={{frm.valid}}
VALUE={{frm.value | json}}
ERROR={{allErrors(frm) | json}}
</pre>
```
Usare le `ReactiveForms` per gestire questa form e il seguente snippet per visualizzare gli errori di validazione:
```typescript
public allErrors(ctrl: FormControl | FormArray | FormGroup): ValidationErrors | null {
    if (!ctrl) return undefined;
    if (ctrl.valid) return null;
    if (ctrl instanceof FormControl) return ctrl.errors;
    const keys = Object.keys(ctrl.controls);
    return keys.reduce( (err, k)=>Object.assign(err, {[k]: this.allErrors(ctrl.get(k) as any)}), ctrl.errors || {}) 
}
```
Creare queste validazioni:
- `name` campo obbligatorio + controllo lunghezza minima 3 caratteri + default=Pippo
- `sex` creare una validazione custom `validGenre` che accetta solo i valori M o F sia in maiuscolo che minuscolo
- `age` valori compresi tra 1 e 100
- `city` nessun controllo va bene tutto
- `cap` validazione formato stringa con 5 cifre
- `phones` provare a gestire `FormArray` dinamico per l'inserimento/cancellazione di un numero qualsiasi di telefoni cellulari 
- creare i metodi addPhone e removePhone per aggiungere/rimuovere un numero di telefono dall'array agganciati ai pulsanti + e -
- BONUS: aggiungere una validazione tramite pattern che consente di inserire 
solo numeri di cellulare che iniziano per 328, 347, 320, 343

Aggiungere inoltre i seguenti comportamenti:
- Disabilitare il pulsante di SALVA nel caso in cui ci siano errori di validazione
- Aggiungere la classe css `has-error` se il campo `name` non è valido
- Per tutti gli altri campi di inserimento mostrare bordo sinistro rosso se il campo non rispetta la validazione

- BONUS1: provare a cambiare il `type` del campo `age` in base al valore del campo `sex` se sex='F' allora type='password' altrimenti normale type='text'
- BONUS2: creare una validazione asincrona custom `validProv` che legge/valida il valore selezionato rispetto ad una tabella caricata nel [db.json](db.json) e letta tramite la chiamata rest GET http://localhost:3000/prov usando `json-server`
```json
{...
, "prov": [
    {"id": "PD"},
    {"id": "VI"},
    {"id": "TV"},
    {"id": "PN"}
  ]
}
Potete usare il seguente snippet per fare la chiamata Ajax
```typescript
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/observable/of';

const BASEURL_PROV = "http://localhost:3000/prov"
//... ALL'INTERNO DELLA VOSTRA VALIDAZIONE USATE
function ajaxEsisteProv(sigla: string) {
    return this.http.get(BASEURL_PROV +'/'+ sigla)  
                    .map(res => res.json())
                    .map( () => true)  //OK ESISTE PROV --> Validazione NULL
                    .catch( err => Observable.of( false ) ) // NON ESISTE!!!
                    .delay(2000);
}
```
- BONUS3: Mentre avviene la validazione asincrona della provinca, provare a visualizzare lo sfondo giallo del campo finchè la richiesta è in stato pendente
- BONUS4: Provare a limitare l'input `age` in modo che accetti solo caratteri numerici ignorando qualsiasi altro tasto venga premuto (ricordarsi anche del `Backspace`) 
- BONUS5: creare un nuovo componente <input-num> che è un controllo di input type='text' che però limita la digitazione ai soli caratteri numerici, segno e decimali ed implementa correttamente `ControlValueAccessor` in modo da interfacciarsi con il binding di Angular come ngModel e usarlo per `age`. 
```

# THE END 
