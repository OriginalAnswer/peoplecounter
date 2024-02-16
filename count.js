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
          createStockView();
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


// ++++++++++++++++++++++++++++++++++++++++++++


function createStockView() {
  const stockView = document.querySelector('.stock-view');
  const stockList = document.querySelector('.stock-list');
  stockList.innerHTML = ''; // 기존 내용 초기화

  Object.entries(stockArr).forEach(([date, times]) => {
      const dateDetails = document.createElement('details');
      dateDetails.classList.add('stock-date');

      const dateSummary = document.createElement('summary');
      const dateTitle = document.createElement('span');
      dateTitle.classList.add('stock-title');
      dateTitle.textContent = date;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('stock-delete');
      deleteButton.textContent = '❌';
      deleteButton.addEventListener('click', () => {
        // 클릭된 요소의 부모 요소를 찾아 삭제
        dateDetails.remove();
        // 삭제된 데이터를 stockArr에서도 삭제
        delete stockArr[date];
        saveToLocalStorage();
      });
      dateSummary.appendChild(dateTitle);
      dateSummary.appendChild(deleteButton);
      dateDetails.appendChild(dateSummary);

      Object.entries(times).forEach(([time, data]) => {
          const timeDetails = document.createElement('details');
          timeDetails.classList.add('stock-time');

          const timeSummary = document.createElement('summary');
          const timeTitle = document.createElement('span');
          timeTitle.classList.add('stock-title');
          timeTitle.textContent = time;
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('stock-delete');
          deleteButton.textContent = '❌';
          deleteButton.addEventListener('click', () => {
            // 클릭된 요소의 부모 요소를 찾아 삭제
            // timeSummary.remove();
            timeDetails.remove();
            // 삭제된 데이터를 stockArr에서도 삭제
            delete stockArr[date][time];
            saveToLocalStorage();
          });
          timeSummary.appendChild(timeTitle);
          timeSummary.appendChild(deleteButton);
          timeDetails.appendChild(timeSummary);

          const table = document.createElement('table');
          table.classList.add('result-table');
                    //테이블 헤더, 연령 남 여
                    const tableHead = document.createElement('thead');
                    const headRow = document.createElement('tr');
                    ['연령', '남', '여'].forEach(text => {
                        const th = document.createElement('th');
                        th.textContent = text;
                        headRow.appendChild(th);
                    });
                    tableHead.appendChild(headRow);
                    table.appendChild(tableHead);
          //테이블 로우
          const tableBody = document.createElement('tbody');
          ['10대', '20대', '30대', '40대', '50대', '60대', '70대'].forEach(age => {
              const bodyRow = document.createElement('tr');//로우
              const ageCell = document.createElement('td');//td
                    ageCell.textContent = age;//구분td 안에 위 [] 안의 글자 순서대로 입력.
              bodyRow.appendChild(ageCell);//tr>tb

                    ['m', 'w'].forEach(gender => { //아래 data는 시간대(time)안의 객체. data[r숫자w]
                        const count = data[`r${age.replace('대', '')}${gender}`] || 0; //위위[]에서 숫자만 남기려고 data[r숫자w]
                        const countCell = document.createElement('td');
                        countCell.textContent = count;//카운트 td안에 data[id]값 넣기
                        bodyRow.appendChild(countCell);//tr>tb+tb+tb 모르겠네...
                    });
                    tableBody.appendChild(bodyRow);
          });
          const totalMWRow =  document.createElement('tr');
          totalMWRow.innerHTML = `
          <td>남녀</td>
          <td class="stock-rmall">${data['rmall']}</td>
          <td class="stock-rwall">${data['rwall']}</td>`;
          const totalRow =  document.createElement('tr');
          totalRow.innerHTML =`
          <td>총합</td>
          <td class="stock-rall" colspan="2">${data['rall']}</td>
          `;
          tableBody.appendChild(totalMWRow);
          tableBody.appendChild(totalRow);
           
          table.appendChild(tableBody);
          timeDetails.appendChild(table);
          dateDetails.appendChild(timeDetails);
      });
      stockList.appendChild(dateDetails);
  });
}

createStockView();
