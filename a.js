// 초기 데이터 설정
let stockArr = JSON.parse(localStorage.getItem('stockArr')) || {};
let realCounter = JSON.parse(localStorage.getItem('realCounter')) || {rmall: 0, rwall: 0, rall: 0};

// 페이지 로딩 시 로컬 스토리지 값 가져오기
const parsedRealCounter = JSON.parse(localStorage.getItem("realCounter"));
const parsedStockArr = JSON.parse(localStorage.getItem("stockArr"));

// 값 존재 시 테이블 업데이트
if (parsedRealCounter && parsedStockArr) {
  updateTable(parsedRealCounter);
  updateTotal(parsedRealCounter);
}

// 버튼 클릭 시 이벤트 처리
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const dataTitle = this.dataset.title; // 클릭한 버튼의 data-title 속성 값
    updateResult(dataTitle); // 결과 업데이트
    updateTable(); // 테이블 업데이트

    const storedData = localStorage.getItem('PeopleCounter');
    const status = JSON.parse(storedData).status;
    if (status === 'recording') {
        updateRecord(); // 기록 업데이트
        saveToLocalStorage(); // 로컬 스토리지에 저장
    }
  });
});

// 결과 업데이트 함수
function updateResult(dataTitle) {
  const resultElement = document.getElementById(dataTitle);
  const currentValue = parseInt(resultElement.innerText);
  resultElement.innerText = currentValue + 1;
  realCounter[dataTitle] = currentValue + 1;
}

// 테이블 업데이트 함수
function updateTable() {
    const rmElements = document.querySelectorAll('.rm');
    const rwElements = document.querySelectorAll('.rw');
    let rmTotal = 0;
    let rwTotal = 0;
    rmElements.forEach(element => {
        const value = parseInt(element.innerText);
        const rw = document.getElementById(element.id);
        rmTotal += value;
    });
  rwElements.forEach(element => {
    const value = parseInt(element.innerText);
    rwTotal += value;
  });
  document.getElementById('rmall').innerText = rmTotal;
  document.getElementById('rwall').innerText = rwTotal;
  document.getElementById('rall').innerText = rmTotal + rwTotal;
  realCounter.rmall = rmTotal;
  realCounter.rwall = rwTotal;
  realCounter.rall = rmTotal + rwTotal;
}

// 기록 업데이트 함수
function updateRecord() {
  const date = new Date();
  const Y = String(date.getFullYear());
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const D = String(date.getDate()).padStart(2, '0');
  const dArr = `${Y}${M}${D}`;

  const H = date.getHours();
  const hArr = `${H}:00 - ${H + 1}:00`;

  const realResults = {};
  document.querySelectorAll('.result-table td').forEach(td => {
    const key = td.id;
    const value = parseInt(td.innerText);
    realResults[key] = value;
  });

  if (!stockArr[dArr]) {
    stockArr[dArr] = {};
  }
  if (!stockArr[dArr][hArr]) {
    stockArr[dArr][hArr] = {};
  }
  stockArr[dArr][hArr] = realResults;
}

// 총합 업데이트 함수
function updateTotal(data) {
  document.getElementById('rmall').innerText = data.rmall;
  document.getElementById('rwall').innerText = data.rwall;
  document.getElementById('rall').innerText = data.rall;
}

// 로컬 스토리지에 데이터 저장하는 함수
function saveToLocalStorage() {
  localStorage.setItem('stockArr', JSON.stringify(stockArr));
  localStorage.setItem('realCounter', JSON.stringify(realCounter));
}
