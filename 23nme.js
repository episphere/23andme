console.log('23nme.js loaded');

(function(){

const nme={ // you'll need your own client id and "secret"
  client_id: '09568fd79aa7911dad7727a024936f8d',
  client_secret: '106cb5038da2e9e33e987ec69cf05b1b' // only a secret if you need to proxy the application
}

nme.parms={
    intro:false, //date after continue

}

nme.ui=function(div){
    nme.div=div||document.getElementById('nmeDiv')
    if(nme.div){
        nme.parms.intro=Date.now()
        localStorage.nmeParms=JSON.stringify(nme.parms)
        let h = '...'
        nme.div.innerHTML=h
    }
}
 nme.reset=function(){
     if(localStorage.nmeParms){
       nme.parms=JSON.parse(localStorage.nmeParms)
     }else{
       nme.parms={}
     }
     
     nme.parms.intro=0 // reset time
     localStorage.nmeParms=JSON.stringify(nme.parms)
     location.reload()
 }

if(typeof(define)!=='undefined'){ // loaded as a required object
    define(nme)
}else if(typeof(window)=='object'){ // regular web browser application
    window.nme=nme
    // check if intro is in order
    window.onload=function(){
        if(localStorage.nmeParms){
            nme.parms=JSON.parse(localStorage.nmeParms)
            if(nme.parms.intro){
                if((Date.now()-nme.parms.intro)<60000*5){ // 5 minutes to go through login
                    nme.ui()
                }
            }
        }
    }
}





})()


