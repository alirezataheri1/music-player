const $ = document;

const musicDatabase = [
    {id: 1, musicName: 'Let Me Down', artist: 'Alec Benjamin', audioSrc: 'audios/let_me_down_slowly.mp3', cover:'images/Alec-Benjamin-Let-Me-Down-Slowly.jpg' },
    {id: 2, musicName: 'Fairytale', artist: 'Aleksandr Ribak', audioSrc: 'audios/ALEXANDER RYBAK - FAIRYTALE.mp3', cover: 'images/aleksandr-ribak-fairytale.jpg'},
    {id: 3, musicName: 'Calm Down', artist: 'Rema Ft Selena Gomez', audioSrc: 'audios/Rema Ft Selena Gomez - Calm Down.mp3', cover:'images/Rema-Ft-Selena Gomez-Calm-Down.jpg'},
];

let musicCounter = 0;

const cover = $.querySelector('.cover');
const musicName = $.querySelector('.music-name');
const artist = $.querySelector('.artist');
const currentTime = $.querySelector('.current-time');
const remainingTime = $.querySelector('.remaining-time');
const audio = $.querySelector('.audio');
const playAgain = $.querySelector('.fa-rotate-right');
const previous = $.querySelector('#previous');
const play = $.querySelector('.fa-play');
const next = $.querySelector('#next');
const volume = $.querySelector('.fa-volume-high'); 
const musicProgress = $.querySelector('.music-progress');
const PassepmusicProgress = $.querySelector('.music-progress__passed');

//loadedmetadata (read)
audio.addEventListener('loadedmetadata', function() {
    audio.duration = audio.duration;
    setTimeAndProgress();
});
//

let isMusicPlaying = false;

let isMute = false;

setInterval(function () {
    if (!isMute) {
        setTimeAndProgress();
    }
}, 1000);

window.addEventListener('load', function() {
    setmusic();
});

//set music and info
function setmusic() {
    if (musicCounter === musicDatabase.length) {
        musicCounter = 0;
    } else if (musicCounter === -1) {
        musicCounter = 2;
    }

    cover.src = musicDatabase[musicCounter].cover;
    musicName.innerHTML = musicDatabase[musicCounter].musicName;
    artist.innerHTML = musicDatabase[musicCounter].artist;
    audio.src = musicDatabase[musicCounter].audioSrc;
}

function setTimeAndProgress(passedProgress) {
    //check if client change the audio progress
    if (passedProgress) {
        audio.currentTime = (Math.floor((passedProgress * audio.duration) / 100));
    }
    //check if the audio is over
    if (audio.currentTime === audio.duration) {
        play.className = 'fa-solid fa-play';
        isMusicPlaying = false;
        audio.currentTime = 0;
    }
    //set time
    let remainingAllSeconds = Math.floor(audio.duration - audio.currentTime);
    let remainingMinutes = Math.floor(remainingAllSeconds / 60);
    let remainingSeconds = Math.floor(remainingAllSeconds % 60);

    if (remainingMinutes < 10) {
        remainingMinutes = '0' + remainingMinutes;
    }
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    if (currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes;
    }
    if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds;
    }

    currentTime.innerHTML = currentMinutes + ':' + currentSeconds;

    remainingTime.innerHTML = '- ' + remainingMinutes + ':' + remainingSeconds;

    //set proress
    let passedProgressPercentage = (audio.currentTime / audio.duration) * 100 + '%';
    PassepmusicProgress.style.width = passedProgressPercentage;
    
}

function playAndPauseMusic() {
    if (isMusicPlaying) {
        audio.pause();
        play.className = 'fa-solid fa-play';
        isMusicPlaying = false;
    } else {
        audio.play();
        play.className = 'fa-solid fa-pause';
        isMusicPlaying = true;
    }
}

//play song from first
playAgain.addEventListener('click', function() {
    audio.currentTime = 0;
    setTimeAndProgress();
});

//next Song
next.addEventListener('click', function() {
    play.className = 'fa-solid fa-pause';
    isMusicPlaying = true;

    musicCounter++;

    setmusic();
});

//previous Song
previous.addEventListener('click', function() {
    play.className = 'fa-solid fa-pause';
    isMusicPlaying = true;

    musicCounter--;

    setmusic();
});

//play and pause music
play.addEventListener('click', playAndPauseMusic);
$.body.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        playAndPauseMusic();
    }
});

// mute and unmute music
volume.addEventListener('click', function() {
    if (isMute) {
        audio.muted = false;
        volume.className = 'fa-solid fa-volume-high';
        isMute = false;
    } else {
        audio.muted = true;
        volume.className = 'fa-solid fa-volume-xmark';
        isMute = true;
    }
});

//music progress when client change it by mouse
musicProgress.addEventListener('click', function(e) {
    // persentage of Passed progress
    const passedProgress = Math.floor(((e.offsetX / 392) * 100));
    setTimeAndProgress(passedProgress);
});