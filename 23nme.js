console.log('23nme.js loaded');

(function(){

const nme={}

nme.parms={
    intro:false, //date after continue

}

nme.ui=function(div){
    nme.div=div||document.getElementById('nmeDiv')
    if(nme.div){
        nme.parms.intro=Date.now()
        localStorage.nmeParms=JSON.stringify(nme.parms)
        let h = 'under development'
        nme.div.innerHTML=h
    }
}
 nme.reset=function(){
     nme.parms=JSON.parse(localStorage.nmeParms)
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


