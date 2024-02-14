const recordBtn = document.getElementById('record');
const playBtn = document.getElementById('play');
const refrashBtn = document.getElementById('refrash');

recordBtn.addEventListener('click', () => {
    localStorage.setItem('PeopleCounter', JSON.stringify({ "status": "recording" }));
    playpause();
});
function playpause(){
    const storedData = localStorage.getItem('PeopleCounter');
    const status = JSON.parse(storedData).status;
    if (status === 'recording') {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (status === 'pause') {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i>';
    }
}
playBtn.addEventListener('click', () => {
    const storedData = localStorage.getItem('PeopleCounter');
    const status = JSON.parse(storedData).status;
    if (status === 'recording') {
        localStorage.setItem('PeopleCounter', JSON.stringify({ "status": "pause" }));
    } else if (status === 'pause') {
        localStorage.setItem('PeopleCounter', JSON.stringify({ "status": "recording" }));
    }
    playpause();
});

// 페이지 로드 시 버튼 아이콘 초기 설정
window.addEventListener('load', () => {
    const storedData = localStorage.getItem('PeopleCounter');
    if (storedData) {
        const { status } = JSON.parse(storedData);
        if (status === 'pause') {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        else if (status === 'recording') {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            playBtn.innerHTML = '<i class="fa-solid fa-play"> </i><i class="fa-solid fa-pause"></i>';
        }
    }
});

refrashBtn.addEventListener('click', () => {
    localStorage.removeItem('PeopleCounter');
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i>';
});