import { Component } from '@angular/core';
import {  Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audioObj =new Audio();
  audioEvents=[
    "ended",
    "error",
    "play",
    "playing",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  files=[
    {
  url:'./assets/song1.mp3',
  name:'my song 1'
    },
    {
      url:'./assets/song2.mp3',
      name:'my song 2'
    },
    {
      url:'./assets/song3.mp3',
      name:'my song 3'
    }
    
  ];
  currenttime=0;
  duration=0;

  setVolume(ev)
  {
    this.audioObj.volume=ev.target.value;
    console.log(ev.target.value);
  }

  streamObserver(url){
    return new Observable(observer =>{
      this.audioObj.src=url;
      this.audioObj.load();
      this.audioObj.play();
      

     const  handler=(event:Event) => {
        console.log(event);
        this.duration=this.audioObj.duration;
        this.currenttime=this.audioObj.currentTime;

      }
      this.addEvent(this.audioObj,this.audioEvents,handler)

      return () =>{
        this.audioObj.pause;
        this.audioObj.currentTime=0; 
      } 
    });

  }
  addEvent(obj,events,handler){
    events.forEach(event=>{
      obj.addEventListener(event,handler);
    });

  }
  removeEvent(obj,events,handler){

  }

  openFile(url){
    this.streamObserver(url).subscribe(event=> {});
    console.log(url);
  }


 play()
 {  
    this.audioObj.play();
    console.log('clicked the play button');

 }
 pause()
 {
  this.audioObj.pause();
  console.log('clicked the pause button');
 }
 stop(){
  this.audioObj.pause();
  this.audioObj.currentTime=0;
  console.log('clicked the stop button');

 }
 timeFormat(time,format=""){

 }
}
