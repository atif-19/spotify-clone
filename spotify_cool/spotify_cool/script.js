
// play pause button
let playPauseButton = document.getElementById('play-button');
let isPlaying  = false;
playPauseButton.addEventListener('click', () =>{
    isPlaying = !isPlaying;
    playPauseButton.src = isPlaying ? 'pause.png' : 'playSong.png';
    // playPause.src = isPlaying ? 'pause.png' : 'playSong.png';
    isPlaying ? CurrentSong.play() : CurrentSong.pause();
});

let mode = document.getElementById('next');
mode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.getElementsByClassName('dark-mode')[0].style = 'filter: invert(1);'
    }
    else{
        document.body.style = 'filter: invert(0);'
    }
});

let showbtn = document.querySelector('.show-btn');
showbtn.addEventListener('click', () => {
    showbtn.textContent = showbtn.textContent === 'Show all' ? 'Show Less' : 'Show all';
});

let songs = document.querySelectorAll('.songplaylist li');
let songTitle = document.querySelector('.song-title');
let artist_name = document.querySelector('.artist');
let AllplayPause =  document.querySelectorAll('.song-play');
let alleqicons = document.querySelectorAll('.eq-icon');
songs.forEach((btn) => {
    btn.addEventListener('click', () => {
        songs.forEach((otherBtn) => {
            if (otherBtn) {
                otherBtn.closest('li').classList.remove('active-playing');
            }
        });
        let parentLi = btn.closest('li');
        parentLi.classList.add('active-playing');
        let songName = parentLi.querySelector('.songn').textContent;
        let artist = parentLi.querySelector('.art').textContent;
        songTitle.textContent = songName;
        artist_name.textContent = artist;
        
        isPlaying = true;
        playPauseButton.src = 'pause.png';
        alleqicons.forEach((icon) => {
            icon.style.display = 'none';
        });
        AllplayPause.forEach((icon) => {
            // console.log('icon:', icon);
            icon.src = 'playSong.png';
        });
        let eqicon = parentLi.querySelector('.eq-icon');
        let playIcon = parentLi.querySelector('.song-play');
        playIcon.src = 'pause.png';
        eqicon.style.display = 'inline-block';

    });
});

let like = document.querySelectorAll('.heart');
let isliked = false;

like.forEach((heart) => {
    heart.addEventListener('click', (e) => {
        heart.classList.toggle('liked');
        heart.src = heart.classList.contains('liked') ? 'heart1.png' : 'heart.png';
        e.stopPropagation();
        // heart.style.filter = heart.classList.contains('liked') ? 'invert(1)' : 'invert(0)';
    });
});

let playlist = document.querySelector('.songplaylist');
let Totalsongs = playlist.querySelectorAll('li');
let totalSongsCount = Totalsongs.length;

let newdiv = document.createElement('div');
newdiv.className = 'total-songs';
newdiv.textContent = `Total Songs: ${totalSongsCount}`;
newdiv.style.fontSize = '20px';
newdiv.style.fontWeight = 'bold';

// playlist.insertAdjacentElement('afterbegin', newdiv);

heading = playlist.getElementsByTagName('h3')[0];
heading.innerHTML = `Playlist <span class="total-songs">Total Songs: ${totalSongsCount}</span>`;


let searchinput = document.getElementsByClassName('search-bar')[0];
searchinput.addEventListener('input',()=>{
    let songs =  document.querySelectorAll('.songn');
    let artists = document.querySelectorAll('.art');
    
    let query = searchinput.value.toLowerCase();
    songs.forEach((song, index) => {
        let songName = song.textContent.toLowerCase();
        let artistName = artists[index].textContent.toLowerCase();
        
        if (songName.includes(query) || artistName.includes(query)) {
            song.closest('li').style.display = 'block';
        } else {
            song.closest('li').style.display = 'none';
        }
    });
})

// right  section auto scrolls to the top if we click on any song 

let songItems = document.querySelectorAll('.song-play');
let rightSection = document.querySelector('.right');

songItems.forEach((item) => {
    item.addEventListener('click', () => {
        rightSection.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// add event listner to the song items in the playlist
// to play the song when clicked
let CurrentSong = new Audio();
function playSong(songName) {
    CurrentSong.src = songName + '.mp3';
    console.log('Playing song:', songName + '.mp3');
    CurrentSong.play();
}


let item = document.querySelector('.songplaylist').getElementsByTagName('li');


for (const songItem of item) {
    songItem.addEventListener('click', () => {
        let SongName = songItem.getElementsByClassName('songn')[0].textContent;
        // CurrentSong = songItem.querySelector('audio');
        console.log('Song Name:', SongName);
        playSong(SongName);
    });
}

