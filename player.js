var songs = ["Aaravalli.mp3",
			 "Bairavaa Nillayo Flute Ringtone.mp3",
			 "Hey_Mama.mp3",
			 "kalippu.mp3",
			 "mahi.mp3"];
var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSong = document.getElementById('nextSong');

var song = new Audio();
var currentSong=0;

window.onload = loadSong;

function loadSong () {
	song.src = 'music/'+songs[currentSong];
	songTitle.textContent= (currentSong+1) + "." +songs[currentSong];
	nextSong.innerHTML = "<b>Next Song:</b>"+songs[currentSong+1% songs.length];
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration,2000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider(){
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}

function convertTime(secs){
	var min = Math.floor(secs/60);
	var sec = secs%60;
	min = (min<10) ? "0"+min : min;
	sec = (sec<10) ? "0"+sec : sec;
	return(min+":"+sec);
}

function showDuration(){
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max",d);
	duration.textContent = convertTime(d);
}

function playOrPauseSong(img){
	if(song.paused){
		song.play();
		img.src = "images/pause.png";
	}
	else{
		song.pause();
		img.src = "images/play.png";
	}
}

function previous(){
	currentSong--;
	if(currentSong<0)
		currentSong=songs.length-1;
	loadSong();
}

function next(){
	currentSong++;
	if(currentSong>songs.length-1)
		currentSong=0;
	loadSong();
}

function seekSong(){
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume(){
	song.volume = volumeSlider.value;
}

function forward(){
	song.playbackRate +=0.5;
}

function backward(){
	song.playbackRate -=0.5;
}