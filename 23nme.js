console.log('23nme.js loaded');

(function(){

const nme={
    createdAt:Date()
}

nme.ui=function(div){
    nme.div=div||document.getElementById('nmeDiv')
    if(nme.div){
        let h = 'under development'
        nme.div.innerHTML=h
    }
}

if(typeof(define)!=='undefined'){ // loaded as a required object
    define(nme)
}else if(typeof(window)=='object'){ // regular web browser application
    window.nme=nme
}





})()


