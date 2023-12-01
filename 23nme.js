console.log('23nme.js loaded');

(function(){

const nme={ // you'll need your own client id and "secret"
  client_id: '09568fd79aa7911dad7727a024936f8d',
  client_secret: '106cb5038da2e9e33e987ec69cf05b1b' // only a secret if you need to proxy the application
}

nme.parms={
    intro:false, //date after continue

}

nme.ui=async function(div){
    nme.div=div||document.getElementById('nmeDiv')
    if(nme.div){
        nme.parms.intro=Date.now()
        localStorage.nmeParms=JSON.stringify(nme.parms)
        let h = '...'
        //let h = `<a href="https://api.23andme.com/authorize/?redirect_uri=http://localhost:8000/23andme/&response_type=code&client_id=09568fd79aa7911dad7727a024936f8d&client_secret=106cb5038da2e9e33e987ec69cf05b1b&scope=basic rs123">Connect with 23andMe</a>`
        nme.div.innerHTML=h
        //location.href='https://api.23andme.com/authorize/?'
        let res = await (await fetch('https://api.23andme.com/authorize/',{
            method:"POST",
            body: JSON.stringify({
               redirect_uri:"http://localhost:8000/23andme/"
            })
        })).json()
        console.log(res)        
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


