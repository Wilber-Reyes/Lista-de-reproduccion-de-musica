const playlist = document.getElementById('playlist');
const addSongInput = document.getElementById('addSongInput');
const addSongBtn = document.getElementById('addSongBtn');
const progressBar = document.getElementById('progressBar');
let audioPlayer = new Audio();
let songs = JSON.parse(localStorage.getItem('songs')) || [];

function savePlaylist() {
    localStorage.setItem('songs', JSON.stringify(songs));
}

function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        const playBtn = document.createElement('button');
        playBtn.textContent = 'Play';
        playBtn.addEventListener('click', () => {
            if (audioPlayer.src !== song.url) {
                audioPlayer.src = song.url;
                audioPlayer.play();
            } else {
                audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
            }
        });
        const img = document.createElement('img');
        img.src = song.cover || 'default-cover.jpg';
        img.alt = 'Song Cover';
        img.className = 'song-cover';
        li.textContent = song.name;
        li.appendChild(img);
        li.appendChild(playBtn);
        playlist.appendChild(li);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
            songs.splice(index, 1);
            savePlaylist();
            updatePlaylist();
        });
        li.textContent = song.name;
        li.appendChild(playBtn);
        li.appendChild(deleteBtn);
        playlist.appendChild(li);
    });
}

function updatePlaylist() {
    playlist.innerHTML = '';
    loadPlaylist();
}

function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
}

audioPlayer.addEventListener('timeupdate', updateProgressBar);

addSongBtn.addEventListener('click', () => {
    const file = addSongInput.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const song = { name: file.name, url };
        songs.push(song);
        savePlaylist();
        updatePlaylist();
    }
});

loadPlaylist();
