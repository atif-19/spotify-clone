// ====== VARIABLES & ELEMENTS ======
let item = document.querySelector('.songplaylist').getElementsByTagName('li');
let CurrentSongNo = 0;
let songTitle = document.querySelector('.song-title');
let artist_name = document.querySelector('.artist');
let playPauseButton = document.getElementById('play-button');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let CurrentSong = new Audio();
let isPlaying = false;

// ====== PLAY SELECTED SONG FROM PLAYLIST ======
for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', (e) => {
        if(i==0){
            let SongName = item[i].querySelector('.songn').textContent;
            playSong(SongName);
            CurrentSongNo = i;
            updateActiveSongUI(CurrentSongNo);
        }
        else if (!CurrentSong.paused && CurrentSongNo === i) {
            // Pause current song if it's already playing and re-clicked
            item[i].querySelector('.song-play').src = 'playSong.png';
            CurrentSong.pause();
            playPauseButton.src = 'playSong.png';
        } else if ((CurrentSong.paused && CurrentSongNo === i)) {
            // Resume same song if it was paused
            item[i].querySelector('.song-play').src = 'pause.png';
            CurrentSong.play();
            playPauseButton.src = 'pause.png';
        } else {
            // Play a different song
            let SongName = item[i].querySelector('.songn').textContent;
            let artist = item[i].querySelector('.art').textContent;

            playSong(SongName); // custom function to play song
            songTitle.textContent = SongName;
            artist_name.textContent = artist;

            CurrentSongNo = i;
            updateActiveSongUI(CurrentSongNo); // optional: highlight playing song
        };

        e.stopPropagation(); // prevent event bubbling
    });
}

// ====== GLOBAL PLAY/PAUSE BUTTON FUNCTIONALITY ======
isPlaying = false;

playPauseButton.addEventListener('click', () => {
    if(CurrentSong.src == ''){
        let songName = document.querySelector('.songn').textContent;
        console.log(songName);
        playSong(songName);
        updateActiveSongUI(CurrentSongNo)
    }
    else
        isPlaying = !isPlaying;

    playPauseButton.src = isPlaying ? 'pause.png' : 'playSong.png';

    if (isPlaying) {
        CurrentSong.play();
        item[CurrentSongNo].querySelector('.song-play').src = 'pause.png';
    } else {
        CurrentSong.pause();
        item[CurrentSongNo].querySelector('.song-play').src = 'playSong.png';
    }
});



// ====== NEXT BUTTON FUNCTIONALITY ======
next.addEventListener('click', () => {
    CurrentSongNo++;
    if (CurrentSongNo >= item.length) CurrentSongNo = 0;

    let songName = item[CurrentSongNo].getElementsByClassName('songn')[0].textContent;
    let artist = item[CurrentSongNo].getElementsByClassName('art')[0].textContent;

    playSong(songName);
    songTitle.textContent = songName;
    artist_name.textContent = artist;
    updateActiveSongUI(CurrentSongNo);
});


// ====== PREVIOUS BUTTON FUNCTIONALITY ======
previous.addEventListener('click', () => {
    CurrentSongNo--;
    if (CurrentSongNo < 0) CurrentSongNo = item.length - 1;

    let songName = item[CurrentSongNo].getElementsByClassName('songn')[0].textContent;
    let artist = item[CurrentSongNo].getElementsByClassName('art')[0].textContent;

    playSong(songName);
    songTitle.textContent = songName;
    artist_name.textContent = artist;
    updateActiveSongUI(CurrentSongNo);
});


// ====== PLAY SONG FUNCTION ======
function playSong(songName) {
    CurrentSong.src = songName + '.mp3';
    CurrentSong.play();
    isPlaying = true;
    playPauseButton.src = 'pause.png';
}


// ====== HIGHLIGHT ACTIVE SONG IN UI ======
function updateActiveSongUI(index) {
    for (let li of item) {
        li.classList.remove('active-playing');
        li.querySelector('.eq-icon').style.display = 'none';
        li.querySelector('.song-play').src = 'playSong.png';
    }

    item[index].classList.add('active-playing');
    item[index].querySelector('.eq-icon').style.display = 'inline-block';
    item[index].querySelector('.song-play').src = 'pause.png';
}


// ====== AUTO PLAY NEXT SONG WHEN CURRENT ENDS ======
CurrentSong.addEventListener('ended', () => {
    next.click();
});

// LIKING and UNLIKING SONGS 
let like = document.getElementsByClassName('heart');

for (let i = 0; i < like.length; i++) {
    let liked = false;
    like[i].addEventListener('click', (e) => {
        console.log(like[i].src);
        if (liked) {
            like[i].src = 'heart.png';
            liked = false;
            if (body.classList.contains('light-theme'))
                like[i].style.filter = 'invert(0)';
            else
                like[i].style.filter = 'invert(1)';
        } else {
            like[i].src = 'heart1.png';
            liked = true;
            like[i].style.filter = 'invert(0)';
        }
        e.stopPropagation();
    });
}


const mode = document.querySelector('.mode');
const circle = document.querySelector('.modeCircle');
const body = document.body;

mode.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    // Move the switch circle
    const isLightMode = body.classList.contains('light-theme');
    circle.style.left = isLightMode ? '5px' : '65px';

    // Change mode background color
    mode.style.backgroundColor = isLightMode ? 'black' : 'white';

    let modeimage = document.querySelector('#modeCircleimg');
    modeimage.src = isLightMode ? 'sun.png' : 'moon.png';
});


// seconds to minutes time converter function
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    // Pad with zero if less than 10
    secs = secs < 10 ? '0' + secs : secs;
    return `${mins}:${secs}`;
}

// calculating the amount of song duration completed according to currenttime of song
function completed(ctime, duration) {
    let percent = (ctime * 100) / duration;
    return Math.floor(percent);
}
function PercentToCtime(percent, duration) {
    return (duration * percent) / 100
}
// songtime update 
let songtime = document.querySelector('.songtime')
let circle1 = document.querySelector('.circle')
CurrentSong.addEventListener('timeupdate', () => {
    // console.log(CurrentSong.currentTime,CurrentSong.duration);
    let duration = formatTime(CurrentSong.duration);
    songtime.innerHTML  = duration != `NaN:NaN`? `${formatTime(CurrentSong.currentTime)}/${duration}` : `0:00/0:00`;
    

    // seekbar update accoring to the time 

    circle1.style.left = `${completed(CurrentSong.currentTime, CurrentSong.duration)}%`
})


//offsetx to percentage
function offsetToPercentage(offsetX, element) {
    let width = element.clientWidth;
    let percent = (offsetX / width) * 100;
    return Math.min(Math.max(percent, 0), 100); // Clamp between 0 and 100
}

// updating seekbar as per user interaction
let seekbar = document.querySelector('.seekbar');
seekbar.addEventListener('click', (e) => {
    // console.log(e.offsetX);
    let percentage = offsetToPercentage(e.offsetX, seekbar);
    console.log(`Clicked at: ${percentage.toFixed(2)}%`);
    console.log(`song completed till: ${PercentToCtime(percentage, CurrentSong.duration)}`);

    circle1 = document.querySelector('.circle')
    circle1.style.left = `${percentage}%`
    songtime.innerHTML = `${formatTime(CurrentSong.currentTime)}/${formatTime(CurrentSong.duration)}`
    CurrentSong.currentTime = PercentToCtime(percentage.toFixed(2), CurrentSong.duration);
})

// search feature in playlist

let searchbar = document.querySelector('.search-bar');
// console.log(searchbar);
searchbar.addEventListener('input', () => {
    let query = searchbar.value.toLowerCase();
    // console.log(query.textContent);

    for (const song of item) {
        let songName = song.querySelector('.songn').textContent.toLowerCase();
        let artist = song.querySelector('.art').textContent.toLowerCase();
        console.log(songName);
        console.log(artist);

        // song.style.display = 'none'
        if (artist.includes(query) || songName.includes(query))
            song.style.display = 'flex'
        else
            song.style.display = 'none'
    }
})

// click on hamburger to see the left section


let hamburger = document.querySelector('.hamburger');
let overlay = document.querySelector('.overlay');
hamburger.addEventListener('click', () => {
    let leftside = document.querySelector('.left');
    leftside.style.left = 0;
    overlay.style.display = 'block';
})

let close = document.querySelector('.close');
close.addEventListener('click', () => {
    let leftside = document.querySelector('.left');
    leftside.style.left = '-130%';
    overlay.style.display = 'none';
})

// controlling volume
let volume = document.querySelector('#volumeControl');
let volumeicon = document.querySelector('#volume');
volume.addEventListener('input', () => {
    // console.log(volume.value);
    
    CurrentSong.volume = (volume.value)/100;
    // changing volume icon as per volume 
    if(volume.value == 0){
        volumeicon.src = 'mute.png';
    }
    else if(volume.value <50){
        volumeicon.src = 'lowvolume.png';
    }
    else{
        volumeicon.src = 'volume.png';
    }

    let volumeValue = document.querySelector('#volumeValue')
    volumeValue.textContent = `${volume.value}%`
})
// muting and unmuting by clicking on volume icon 
volumeicon.addEventListener('click', () => {
    if (volume.value > 0) {
        volume.value = 0;
        volumeicon.src = 'mute.png';
    } else {
        volume.value = 50;
        volumeicon.src = 'volume.png';
    }
});



