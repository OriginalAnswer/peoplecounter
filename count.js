const btnContainer = document.querySelector('.btn-container');
const resultTable = document.querySelector('.result-table');
const rmall = document.getElementById('rmall');
const rwall = document.getElementById('rwall');
const rall = document.getElementById('rall');

// 로컬 스토리지에서 데이터 불러오기
let realCount = JSON.parse(localStorage.getItem('realCount')) || {};

// 각 버튼에 클릭 이벤트 리스너 추가
    btnContainer.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const AG = btn.dataset['title'];
            addCount(AG);
        });
    });
// 인구수 증가 함수 정의
    function addCount(key) {
        if (!realCount[key]) {
            realCount[key] = 0;
        }
        realCount[key]++;
        updateDisplay(key);
        saveToLocalStorage();
    }
    
// 화면 표시 업데이트
    function updateDisplay(key) {
        const resultElement = document.getElementById(key);
        if (resultElement) {
            resultElement.textContent = realCount[key];
        }
    }

// 총합
    resultTable.querySelectorAll('.rm').forEach(rm => {
        rm.addEventListener('change', () => {
            const n = Number(rm.innerText);
            updateTotals(n, 'rm');
        });
    });
    function updateTotals(){
        
    }


// 로컬 스토리지에 데이터 저장 함수 정의
function saveToLocalStorage() {
    localStorage.setItem('realCount', JSON.stringify(realCount));
}
