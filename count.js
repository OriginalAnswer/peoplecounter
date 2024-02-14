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
    function addCount(AG) {
        if (!realCount[AG]) {
            realCount[AG] = 0;
        }
        realCount[AG]++;
        updateDisplay(AG);
        saveToLocalStorage();
    }
    
// 화면 표시 업데이트
    function updateDisplay(AG) {
        const resultElement = document.getElementById(AG);
        if (resultElement) {
            resultElement.textContent = realCount[AG];
        }
    }


// 로컬 스토리지에 데이터 저장 함수 정의
function saveToLocalStorage() {
    localStorage.setItem('realCount', JSON.stringify(realCount));
}
