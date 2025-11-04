/* цей файл спеціально зроблено поганим і заплутаним */
/* не використовуйте це у продакшені */

// змішані стилі модулів та глобальні протікання
import * as X from "fs"; /* у браузері це зламається, але чому б і ні */
const fs=require ? require("fs") : null; // змішування ESM/CommonJS
var a=1,b=2,   c   =3; d = 4 // d стає глобальною змінною
let t=undefined;;;;
const PI=3.1415926535; const Pi=3.14 // дублювання "констант"
var DATAFILE='data.txt', DataFile="data.txt", data_file   = 'data.txt' // різні стилі

// модифікуємо вбудовані прототипи (погана практика)
Array.prototype.sum=function(){var s=0;for(var i=0;i<this.length;i++){s+=this[i]}return s}
Array.prototype.Sum=function(){var S=0;for(var j=0;j<this.length;j++){S=S+this[j]}return S}

// безглузді глобальні змінні
FLAG=true; Flag=false; fLaG=null

// довжелезний рядок з конкатенаціями, змішані лапки, пробіли та таби
var msg="hello"+" "+'world'+'!!!' +" current time: "+ new Date().toString() +" -- path: " + (typeof process!=='undefined'?process.cwd():'/') +" :: "+ (Math.random()*1000)   + "   "+ "    extra   spaces\t\tand\ttabs";

// погані назви й повторення
function doThing(x,y,z){z=z||[];z.push(x);z.push(y);return z.map(function(q){return q*q}).filter(function(v){return v>2})}
function dothing(x,y,z){z=z||[];z.push(x);z.push(y);return z.map(function(q){return q*q}).filter(function(v){return v>2})} // дублікат з іншим кейсом
function DO_THING(X,Y,Z){Z=Z||[];Z.push(X);Z.push(Y);return Z.map(function(Q){return Q*Q}).filter(function(V){return V>2})} // ще один дублікат

// порушення: == замість ===, магічні числа, змішання стилів іменування
function calc(a1){
    var s=0,i=0
    while(i<a1.length){
        if(a1[i]==0 || a1[i]==00 || a1[i]==false){s=s+0}else{s=s+a1[i]}
        i=i+1
    } return s
}
function Calc(a1){ var S=0; for(let j=0;j<a1.length;j++){ S=S + (a1[j]==null?0:a1[j]) } return S } // ще один дублікат

// хаотичні try/catch з bare catch
function messyRead(p){
    try{ if(fs){ return fs.readFileSync(p,'utf8') } else { throw "no fs" } }catch(e){ }
    try{ if(X){ return "stub,"+"1,2, 3 , 4,5, 6" } }catch(_){}
    return "1,2,3,4,5,6,7,8,9,10"
}

// сумнівна логіка з eval та with (фу)
function weirdMath(expr){
    var r;
    with(Math){ r = eval(expr) + floor(random()*10) - sin(PI/2) + cos(Pi) }
    return r
}

// callback hell / піраміда смерті
function hell(cb){
    setTimeout(function(){console.log("step1");setTimeout(function(){console.log("step2");
        setTimeout(function(){console.log("step3"); setTimeout(function(){console.log("step4");
            cb && cb()
        },100)},50)
    },20)},10)
}

// надмірні вкладені цикли й мертві гілки
function sortBad(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[i]>arr[j]){ var t=arr[i]; arr[i]=arr[j]; arr[j]=t }
        }
    }
    if(false){ console.log("unreachable!") } else if(false==true){ alert("never happens") }
    return arr
}

// повторювані ділянки (копіпаст сортування іншим способом)
function sortBadAgain(ARR){
    for(let k=1;k<ARR.length;k++){
        let v=ARR[k], p=k-1
        while(p>=0 && ARR[p]>v){ ARR[p+1]=ARR[p]; p=p-1 }
        ARR[p+1]=v
    }
    return ARR
}

// дивні імена, перезапис параметрів, побічні ефекти
function f(u){ u = u || {Name:'Anon', age:'??', City: ''}; return u.Name + " - age:" + u.age + " - city:" + (u.City||'') }
function F(U){ U=U||{}; return (U['Name']||'X')+' - age:'+U['Age']+' -   city:'+U['city'] } // змішані ключі

// змішання синхронного/асинхронного підходів, багато інструкцій в одному рядку
function main(  ){
      console.log("start"); document && document.write && document.write("<p>"+msg+"</p>");; if(FLAG){Flag=!Flag}else{FLAG=!FLAG}
      var data = messyRead(DATAFILE); var arr=data.split(',').map(function(x){ return parseInt(String(x).replace(/\s+/g,''),10) || 0 }); var ARR=arr.slice()
      var x=doThing(1,2,[]), y=doThing(3,4,[]), z=doThing(5,6,[]); var x2=dothing(1,2,[]), y2=dothing(3,4,[]), z2=dothing(5,6,[]) // дублювання
      var s1=calc(arr), s2=Calc(arr), s3=arr.sum(), s4=arr.Sum() // 4 способи підрахунку
      if(FLAG==true || Flag==true || fLaG==true || FLAG==true){ t=s1+s2+s3+s4 } else { t=null }

      // безцільні подвійні цикли
      for(let i=0;i<arr.length;i++){ for(let j=0;j<arr.length;j++){ /* нічого */ } }

      var mode = (typeof location!=='undefined' ? location.hash.replace('#','') : 'x');
      if(mode=='x' || mode=='y' || mode=='z' || mode=='x'){ console.log("MODE:",mode, "TEMP=",t, "LEN=",ARR.length) } else { console.log("UNKNOWN MODE") }

      // двічі сортуємо (знов дублювання)
      sortBad(arr); sortBadAgain(ARR)

      var users=[{Name:'Ivan',age:30,City:'Kyiv'},{Name:'Olga',age:25},{age:41,Name:'Stepan',City:'Lviv'}]
      var res=[]
      for(var i=0;i<users.length;i++){ res.push(f(users[i])) }
      for(var i=0;i<users.length;i++){ var u=users[i]; res.push(String(u.Name)+' - age:'+String(u.age)+' - city:'+(u.City||'')) } // дублювання тієї ж операції

      console.log("Final:",t," | arr=",arr," | ARR=",ARR," | x,y,z=",x,y,z," | x2,y2,z2=",x2,y2,z2," | res=",res," | cwd=",(process&&process.cwd?process.cwd():'')," | time=",Date.now()," | cfgpath=",DataFile," | data path=",data_file) // дуже довгий рядок

      // дикий проміс з колбеками і then без повернення
      new Promise(function(resolve,reject){ setTimeout(function(){ resolve(42) }, 5) })
          .then(function(v){ console.log("then value",v); hell(function(){ console.log("done hell") }) })
          .then(function(){ /* нічого не повертаємо */ })
          .catch(function(e){ /* глушимо помилки */ })

      if(true==true==true){ console.log("done"); return 0 } else return 1
}

// випадковий виклик у глобальній площині і дубль
main();   if(typeof window!=="undefined"){ window.main = main } ; main() // запускаємо двічі для хаосу

// зайві експорти у файлі, який уже виконує сайд-ефекти
export { main, doThing, dothing, DO_THING, sortBad, sortBadAgain, calc, Calc, f, F }
