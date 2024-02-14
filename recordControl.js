const recordBtn = document.getElementById('record');
const playBtn = document.getElementById('play');
const refrashBtn = document.getElementById('refrash');


recordBtn.addEventListener('click', () => {
    const date = new Date();
    const H = String(date.getHours()).padStart(2, '0');
    localStorage.setItem('PeopleCounterApp', JSON.stringify({ 
        "status": "recording",
        "recordingTime" : H
     }));
    playpause();
});
function playpause(){
    const storedData = localStorage.getItem('PeopleCounterApp');
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
    const storedData = localStorage.getItem('PeopleCounterApp');
    let ST = JSON.parse(storedData).status;
    let H = JSON.parse(storedData).recordingTime;
    if (ST === 'recording') {
        ST = 'pause';
        H = H
        localStorage.setItem('PeopleCounterApp', JSON.stringify({ 
            "status": ST,
            "recordingTime" : H
        }));
    } else if (ST === 'pause') {
        ST = 'recording';
        H = H
        localStorage.setItem('PeopleCounterApp', JSON.stringify({ 
            "status": ST,
            "recordingTime" : H
         }));
    } else {

    }
    playpause();
});

// 페이지 로드 시 버튼 아이콘 초기 설정
window.addEventListener('load', () => {
    const storedData = localStorage.getItem('PeopleCounterApp');
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
    localStorage.removeItem('PeopleCounterApp');
    localStorage.removeItem('realCounter');
    realCounter = {};
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>';
    const resultTableCells = document.querySelectorAll(".result-table .r");
    resultTableCells.forEach((cell) => {
        cell.innerText = 0;
    });

  // 총합 값 0으로 초기화
  document.getElementById("rmall").innerText = 0;
  document.getElementById("rwall").innerText = 0;
  document.getElementById("rall").innerText = 0;
});