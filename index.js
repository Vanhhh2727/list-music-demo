const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/y2mate.com - Chàng Trai Bất Tử.mp3',
        displayName: 'Chang trai bat tu',
        cover: 'assets/chang trai bat tu.jpg',
        artist: 'An Vu - Sino',
    },
    {
        path: 'assets/y2mate.com - B RAY ANH LUÔN NHƯ VẬY feat cậu bảo LYRIC VIDEO.mp3',
        displayName: 'Anh luon nhu vay',
        cover: 'assets/anh luon nhu vay.jpg',
        artist: 'B RAY',
    },
    {
        path: 'assets/y2mate.com - dự báo thời tiết hôm nay mưa storm version feat Phúc Du.mp3',
        displayName: 'Du bao thoi tiet',
        cover: 'assets/dự báo thời tiết hôm nay mưa - storm version (feat. Phúc Du).jpg',
        artist: 'GREY D',
    },
    {
        path: 'assets/y2mate.com - Em Có Nhớ Anh Không Lofi Ver Hiya x Freak D.mp3',
        displayName: 'Em co nho anh khong',
        cover: 'assets/em co nho anh khong.jpg',
        artist: 'Hiya',
    },
    {
        path: 'assets/y2mate.com - Hẹn một mai Bùi Anh Tuấn.mp3',
        displayName: 'Hen mot ngay mai',
        cover: 'assets/hen mot mai.jpg',
        artist: 'Bui Anh Tuan',
    },
    {
        path: 'assets/y2mate.com - Lý Do Nào Để Quay Lại Với Nhau Par SG x NewoulZLyrics.mp3',
        displayName: 'Ly do nao de quay lai voi nhau',
        cover: 'assets/ly do nao de quay lai voi nhau.jpg',
        artist: 'PAR SG, New$oulZ',
    },
    {
        path: 'assets/y2mate.com - Nắng Lung Linh Nguyễn Thương x BellLofi Ver Chỉ vì hôm đấy nắng lung linh lung linh.mp3',
        displayName: 'Nang lung linh',
        cover: 'assets/nang lung linh.jpg',
        artist: 'Nguyen Thuong',
    },
    {
        path: 'assets/y2mate.com - Obito Hà Nội ft VSTRA.mp3',
        displayName: 'Ha Noi',
        cover: 'assets/Obito - Hà Nội .jpg',
        artist: 'Obito, Shiki, VSTRA',
    },
    {
        path: 'assets/y2mate.com - overtied Dab ftChilythoi Lyrics video.mp3',
        displayName: 'overtied',
        cover: 'assets/overtired.jpg',
        artist: 'Dad, Chilythoi',
    },
    {
        path: 'assets/y2mate.com - tlinh nữ siêu anh hùng OFFICIAL VISUALIZER.mp3',
        displayName: 'Nu sieu anh hung',
        cover: 'assets/nu sieu anh hung.jpg',
        artist: 'tlinh',
    },
    {
        path: 'assets/y2mate.com - tlinh thế giới thần tiên OFFICIAL VISUALIZER.mp3',
        displayName: 'The gioi than tien',
        cover: 'assets/the gioi than tien.jpg',
        artist: 'tlinh',
    },
    {
        path: 'assets/y2mate.com - VSTRA PHONG.mp3',
        displayName: 'Phong',
        cover: 'assets/VSTRA - PHONG.jpg',
        artist: 'VSTRA, TGSN, Tyronee',
    },
    {
        path: 'assets/y2mate.com - ĐỪNG ĐỂ NƯỚC MẮT RƠI VSTRA.mp3',
        displayName: 'Dung de nuoc mat roi',
        cover: 'assets/ĐỪNG ĐỂ NƯỚC MẮT RƠI - VSTRA.jpeg',
        artist: 'VSTRA, TGSN, Tyronee, Obito',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);