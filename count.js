// 초기 데이터
let stockArr = JSON.parse(localStorage.getItem('stockArr')) || {};
let realCounter = JSON.parse(localStorage.getItem('realCounter')) || {rmall: 0, rwall: 0, rall: 0};



// 페이지 로드 시 realCounter 테이블에 출력
Object.keys(realCounter).forEach(function(key){
    const r = document.getElementById(key);
    r.innerText = realCounter[key];
})

// const parsedRealCounter = JSON.parse(localStorage.getItem("realCounter"));


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
          stockResult(); // 기록 업데이트
          saveToLocalStorage(); // 로컬 스토리지에 저장
      }
    });
  });
function stockResult(){    
        const date = new Date();
        const Y = String(date.getFullYear());
        const M = String(date.getMonth() + 1).padStart(2, '0');
        const D = String(date.getDate()).padStart(2, '0');
        const DY = String(date.getDay());
        const wArr = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
    const dArr = `${Y}년 ${M}월 ${D}일 ${wArr[DY]}`;

        let PeopleCounterApp = JSON.parse(localStorage.getItem('PeopleCounterApp'));
        const H = PeopleCounterApp.recordingTime;
        const HH = String(parseInt(PeopleCounterApp.recordingTime) + 1);
    const hArr = `${H}:00 - ${HH}:00`;

    if (!stockArr[dArr]) {
        stockArr[dArr] = {};
      }
      if (!stockArr[dArr][hArr]) {
        stockArr[dArr][hArr] = {};
      }
      stockArr[dArr][hArr] = realCounter;

}
// 로컬 스토리지에 데이터 저장
function saveToLocalStorage() {
    localStorage.setItem('stockArr', JSON.stringify(stockArr));
    localStorage.setItem('realCounter', JSON.stringify(realCounter));
  }





// +++++++++++++++

// console.log(stockArr)
// console.log(stockArr['2024년 02월 15일 목요일'])
const stockView = document.querySelector('.stock-view');
function printStock(){
  const dv = document.createElement('div');
  dv.classList.add('stock-header');
  dv.innerHTML =`<span class="stock-title">기록</span>
  <button class="stock-delete">전체삭제❌</button>`;
  stockView.appendChild(dv);


  const dvDetail = document.createElement('details');
  const dvSummeary = document.createElement('summary');
  // 이 아래부터는 순회 요소
  const dts = document.createElement('details');//순환할때마다 새로운 details
      const stcDATE = document.createElement('summary');
            stcDATE.classList.add('stock-date');
            stcDATE.innerHTML = `<span class="stock-title">${DATE}</span>
                              <button class="stock-delete">❌</button>
                              `
      const stcTIME = document.createElement('details');
            stcTIME.classList.add('stock-time');
            stcTIME.innerHTML = `
            <summary>
                <span class="stock-title">${TIME}</span>
                <button class="stock-delete">❌</button>
            </summary>
            <table>
                <tr>
                    <th>연령</th><th>남</th><th>여</th>
                </tr>
                <tr>
                    <td>10대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>20대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>30대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>40대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>50대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>60대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>70대</td><td></td><td></td>
                </tr>
                <tr>
                    <td>남녀</td><td></td><td></td>
                </tr>
                <tr>
                    <td>총합</td><td colspan="2"></td>
                </tr>
            </table>
            
                              `
      const stcTIMEtitle = document.createElement('summary');
            stcTIMEtitle.classList.add('stock-title');
  // 프린트
  dvDetail.appendChild(stcDATE);
  dvDetail.appendChild(stcTIME);
  stockView.appendChild(dvDetail);

}
// printStock()

Object.keys(stockArr).forEach(function(DATE){console.log(DATE);
  Object.keys(stockArr[DATE]).forEach(function(TIME){console.log(TIME);
                                    console.log(stockArr[DATE]);
    Object.keys(stockArr[DATE][TIME]).forEach(function(r){console.log(r);
                                    // console.log(stockArr[d][t][r]);
          }
        )  
      }
    )  
  }
)
