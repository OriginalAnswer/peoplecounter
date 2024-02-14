// 각 버튼 요소 가져오기
const btnContainer = document.querySelector('.btn-container');

// 로컬 스토리지에서 데이터 불러오기
let populationData = JSON.parse(localStorage.getItem('populationData')) || {};

// 각 버튼에 클릭 이벤트 리스너 추가
btnContainer.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.id;
        increasePopulation(id);
    });
});

// 인구수 증가 함수 정의
function increasePopulation(key) {
    if (!populationData[key]) {
        populationData[key] = 0;
    }
    populationData[key]++;
    updateDisplay(key);
    saveToLocalStorage();
}

// 화면 표시 업데이트 함수 정의
function updateDisplay(key) {
    const resultElement = document.getElementById(key.replace('btn', 'r'));
    if (resultElement) {
        resultElement.textContent = populationData[key];
    }
}

// 로컬 스토리지에 데이터 저장 함수 정의
function saveToLocalStorage() {
    localStorage.setItem('populationData', JSON.stringify(populationData));
}

// 페이지 로드 시 데이터 표시 업데이트
window.addEventListener('load', () => {
    for (const key in populationData) {
        updateDisplay(key);
    }
});
// ++++++++++++++++++++++++++++++
// 페이지 로드 시 데이터 표시 업데이트
window.addEventListener('load', () => {
    updateTotals();
});

// 테이블 내의 모든 숫자를 더하고 결과를 업데이트하는 함수 정의
function updateTotals() {
    let totalMale = 0;
    let totalFemale = 0;
    let totalAll = 0;

    const resultTable = document.querySelector('.result table');
    if (resultTable) {
        const rows = resultTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 3) { // 각 행에 3개의 셀이 있다고 가정
                const maleCount = parseInt(cells[1].textContent) || 0;
                const femaleCount = parseInt(cells[2].textContent) || 0;

                totalMale += maleCount;
                totalFemale += femaleCount;
                totalAll += (maleCount + femaleCount);
            }
        });
    }

    // 결과 업데이트
    const rmall = document.getElementById('rmall');
    const rwall = document.getElementById('rwall');
    const rall = document.getElementById('rall');

    if (rmall) {
        rmall.textContent = totalMale;
    }
    if (rwall) {
        rwall.textContent = totalFemale;
    }
    if (rall) {
        rall.textContent = totalAll;
    }
}
