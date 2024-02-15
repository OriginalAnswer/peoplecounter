const stockView = document.querySelector('.stock-view');

// stockArr 데이터를 HTML로 변환하여 .stock-view에 추가하는 함수
function renderStockData(data) {
    for (const date in data) {
        const dateDetails = data[date];
        const dateElement = document.createElement('details');
        const dateSummary = document.createElement('summary');
        dateSummary.className = 'stock-date';
        dateSummary.innerHTML = `<span class="stock-title">${date}</span><button class="stock-delete">❌</button>`;
        dateElement.appendChild(dateSummary);

        for (const time in dateDetails) {
            const timeDetails = dateDetails[time];
            const timeElement = document.createElement('details');
            const timeSummary = document.createElement('summary');
            timeSummary.innerHTML = `<span class="stock-title">${time}</span><button class="stock-delete">❌</button>`;
            timeElement.appendChild(timeSummary);

            const table = document.createElement('table');
            table.className = 'result-table';
            const tableHeader = document.createElement('tr');
            tableHeader.innerHTML = '<th>연령</th><th>남</th><th>여</th>';
            table.appendChild(tableHeader);

            for (const key in timeDetails) {
                if (key !== 'rmall' && key !== 'rwall' && key !== 'rall') {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${key}</td><td class="stock-r">${timeDetails[key]}</td><td class="stock-r">${timeDetails[key]}</td>`;
                    table.appendChild(tr);
                }
            }

            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `<td>남녀</td><td id="stock-rmall">${timeDetails['rmall']}</td><td id="stock-rwall">${timeDetails['rwall']}</td>`;
            table.appendChild(totalRow);

            const totalSum = document.createElement('tr');
            totalSum.innerHTML = `<td>총합</td><td id="stock-rall" colspan="2">${timeDetails['rall']}</td>`;
            table.appendChild(totalSum);

            timeElement.appendChild(table);
            dateElement.appendChild(timeElement);
        }

        stockView.appendChild(dateElement);
    }
}

// stockArr 데이터를 HTML로 렌더링
renderStockData(stockArr);