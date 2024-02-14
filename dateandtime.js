
function getDate() {
    const today = document.querySelector('#realdate');
    // const wArr = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
    const wArr = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
    const mArr = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    let date = new Date();
    const d = String(date.getDate());
    const m = date.getMonth();
    const y = String(date.getFullYear());
    const dy = String(date.getDay());
    today.innerText = `${y}년 ${m+1}월 ${d}일 ${wArr[dy]}`;
}

function getTime() {
    const time = document.querySelector('#realtime');
    const date = new Date();
    const h = String(date.getHours()).padStart(2,"0");
    const m = String(date.getMinutes()).padStart(2,"0");
    const s = String(date.getSeconds()).padStart(2,"0");
    time.innerText = `${h}:${m}:${s}`;

    let PeopleCounterApp = JSON.parse(localStorage.getItem('PeopleCounterApp'));
    let rt = PeopleCounterApp.recordingTime
    if(rt !== h){
        localStorage.setItem('PeopleCounterApp', JSON.stringify({ 
            "status": "recording",
            "recordingTime" : h
         }));
    }
}

getDate();
getTime();
setInterval(getTime, 1000);