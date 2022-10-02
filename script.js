const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const music= document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time');
const durationEl= document.getElementById('duration');
const prevBtn= document.getElementById('prev');
const playBtn= document.getElementById('play');
const nextBtn= document.getElementById('next');

//Music
const songs=[
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army (Remix)',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight, Disco Queen',
		artist: 'Jacinto Design',
	},
	{
		name: 'metric-1',
		displayName: 'Front Row (Remix)',
		artist: 'Metric/Jacinto Design',
	},
	{
		name: 'ferrari-1',
		displayName: 'Ferrari (remix)',
		artist: 'James Hype and Miggy Dela Rosa',
	},
	{
		name: 'ferrari-extended',
		displayName: 'Ferrari Extended(remix)',
		artist: 'James Hype and Miggy Dela Rosa',
	},
	{
		name: 'drink-a-yak',
		displayName: 'Drink a yak',
		artist: 'Jidanofu',
	},
	{
		name: 'sunroof',
		displayName: 'sunroof',
		artist: 'nicky youre',
	},
];


//Check if Playing
let isPlaying = false;


//Play
function playSong(){
	isPlaying=true;
	playBtn.classList.replace('fa-play','fa-pause');
	playBtn.setAttribute('title','Pause')
	music.play();
}

//Pause

function pauseSong(){
	isPlaying=false;
	playBtn.classList.replace('fa-pause','fa-play');
	playBtn.setAttribute('title','Play')

	music.pause();
}

//Play or pause Eventlistener
playBtn.addEventListener('click',()=>(isPlaying? pauseSong() : playSong()))


//Update the DOM

function loadSong(song){
	title.textContent= song.displayName;
	artist.textContent= song.artist;
	music.src=`music/${song.name}.mp3`
	image.src = `img/${song.name}.jpg`;


}


//Current Song
let songIndex =0;


//Next Song
function nextSong(){
	songIndex++;
	if(songIndex > songs.length -1){
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong()

}

//Prev Song
function prevSong(){
	songIndex--;
	if(songIndex < 0){
		songIndex = songs.length -1;
	}
	loadSong(songs[songIndex]);
	playSong()

}


// //List of songs
// function listSongs(song){

// }

// On Load - select first song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e){
	if (isPlaying){
		const {duration , currentTime}=e.srcElement;


		//Update Progress Bar width
		const progressPercent = (currentTime/duration)*100;
		progress.style.width= `${progressPercent}%`


		//Calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds<10) {
			durationSeconds = `0${durationSeconds}`
		}
		
		//Delay switching duration Element to avoid NaN
		if (durationSeconds){
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}
		//Calculate display for current
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds<10) {
			currentSeconds = `0${currentSeconds}`
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar
function setProgressBar(e){
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const{ duration }= music;
	music.currentTime= (clickX/width)*duration;
}
//Play selected song
function playSelectedSong(btn){
	songIndex=btn.id;
	loadSong(songs[songIndex]);
	playSong();
}

//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);