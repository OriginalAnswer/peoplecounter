// 초기 데이터
let stockArr = JSON.parse(localStorage.getItem('stockArr')) || {};
let realCounter = JSON.parse(localStorage.getItem('realCounter')) || {rmall: 0, rwall: 0, rall: 0};






Object.keys(realCounter).forEach(function(key){
    const r = document.getElementById(key);
    r.innerText = realCounter[key];
})











const parsedRealCounter = JSON.parse(localStorage.getItem("realCounter"));


// 테이블 업데이트 함수
function updateTotal() {
    let rmTotal = 0;
    let rwTotal = 0;
    const rmElements = document.querySelectorAll('.rm');
    const rwElements = document.querySelectorAll('.rw');
    rmElements.forEach(r => {
        const v = parseInt(r.innerText);
        rmTotal += v;
    });
    rwElements.forEach(r => {
        const v = parseInt(r.innerText);
        rwTotal += v;
    });
    realCounter.rmall = rmTotal;
    realCounter.rwall = rwTotal;
    realCounter.rall = rmTotal + rwTotal;
    saveToLocalStorage();
}
function printResult(AnG) {
    const r = document.getElementById(AnG);
    const v = parseInt(r.innerText);
    r.innerText = v + 1;
    realCounter[AnG] = v + 1;
  }
function printTable(){
    document.getElementById('rmall').innerText = realCounter.rmall;
    document.getElementById('rwall').innerText = realCounter.rwall;
    document.getElementById('rall').innerText = realCounter.rall;
}
// 버튼 클릭
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const AnG = this.dataset.title; // 클릭한 버튼의 data-title 속성 값
      printResult(AnG); 
      updateTotal(); 
      printTable();
      const storedData = localStorage.getItem('PeopleCounterApp');
      const status = JSON.parse(storedData).status;
      if (status === 'recording') {
        //   updateRecord(); // 기록 업데이트
          saveToLocalStorage(); // 로컬 스토리지에 저장
      }
    });
  });




// 로컬 스토리지에 데이터 저장
function saveToLocalStorage() {
    // localStorage.setItem('stockArr', JSON.stringify(stockArr));
    localStorage.setItem('realCounter', JSON.stringify(realCounter));
  }
  