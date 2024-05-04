
let currentSong=new Audio();
let songs
let currfolder
//seconds to min
function secondsToMinSec(sec){
    if(isNaN(sec) || sec<0){ 
       return "00:00"
    }
   
    const minutes=Math.floor(sec/60);
    const remainingSeconds=Math.floor(sec %60)
   
    const formattedMinutes=String(minutes).padStart(2,'0');
    const formattedSec=String(remainingSeconds).padStart(2,'0')
   
    return `${formattedMinutes}:${formattedSec}`
   }



async function getsongs(folder){
    currfolder=folder
    let a=await fetch(`/${folder}/`)
    let response=await a.text();
    let div =document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
     songs=[]
    for(let i=0;i<as.length;i++){ 
        const element=as[i]
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //show all song from playlist
    let songlist=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songlist.innerHTML=""

    for(const song of songs){ 
        songlist.innerHTML +=`<li> 
                            <img src="Images/mu23.png" style="width: 25px;" alt="music" class="width="34">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                            </div>
                            <div class="playnow">
                            <img src="SVG/play.svg" alt="play" class="invert" style="margin-right: 30px">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                             </li>`;
    }

    //songs event listner
   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element =>{ 
         //   console.log(e.querySelector(".info").firstElementChild.innerHTML)
             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    });


return songs;
}


//for play music
const playMusic=(track,pause=(false))=>{ 
  //  let audio=new Audio("/songs/"+track)
    currentSong.src=`/${currfolder}/`+track;

    if(!pause){ 
        currentSong.play()
        play.src="Images/pause.png"
    } 
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songdu").innerHTML="00:00"
    document.querySelector(".cusongdu").innerHTML="00:00"
    

}

async function main(){ 
    
    //list of songs
    await getsongs("Romantic")

 
    playMusic(songs[0],true)

    
    currentSong.addEventListener("ended",()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if((index+1)<songs.length){ 
            playMusic(songs[index+1])
        }

        if((index+1)==songs.length){  
        document.getElementById("play").src="Images/play.png"
        }
    })

    //play next previous
    play.addEventListener("click",()=>{ 
        if(currentSong.paused){ 
            currentSong.play()
            play.src="Images/pause.png"
        }
        else{ 
            currentSong.pause()
            play.src="Images/play.png"
        }
    })

    //Time update
    currentSong.addEventListener("timeupdate",()=>{ 
      //  console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".cusongdu").innerHTML=`${secondsToMinSec(currentSong.currentTime)}`
        document.querySelector(".songdu").innerHTML=` ${secondsToMinSec(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%"
    })

    //add an event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click",
    e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left=percent +"%";
        currentSong.currentTime=((currentSong.duration)*percent)/100
})

    // event listner menu media query and responsivness
    document.querySelector(".menu").addEventListener("click",()=>{ 
        document.querySelector(".left").style.left="0%"
    })

    //close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%"

    })

    //previous and next
    previous.addEventListener("click",()=>{ 
       // console.log("Previous click")
        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        console.log(index)
        if((index-1)>=0){
            playMusic(songs[index-1])
        }
    })



    next.addEventListener("click",()=>{ 
       // console.log(p"next click")
        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if((index+1)<songs.length){ 
            playMusic(songs[index+1])
        }
    })

    //volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",
    (e)=>{ 
        currentSong.volume=parseInt(e.target.value)/100;
        if(currentSong.volume>0){ 
            document.querySelector(".volume>img").src=document.querySelector(".volume>img").src.replace("SVG/mute.svg","SVG/volume.svg")
        }
    })

   //volume mute
    document.querySelector(".volume>img").addEventListener("click",(e)=>{
            if(e.target.src.includes("SVG/volume.svg")){
            e.target.src=e.target.src.replace("SVG/volume.svg","SVG/mute.svg")
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{ 
            e.target.src=e.target.src.replace("SVG/mute.svg","SVG/volume.svg")
            currentSong.volume=.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
        }
    })

    document.querySelector(".plyall>button").addEventListener("click",()=>{
        playMusic(songs[0])
    })

    document.querySelector("#repeat").addEventListener("click",()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        console.log(index)
        playMusic(songs[index])
    })
}

main()
