fetch('data/sample.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').map(row => row.split(','));
    const table = document.createElement('table');
    rows.forEach((row, index) => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const cellElement = document.createElement(index === 0 ? 'th' : 'td');
        cellElement.textContent = cell;
        tr.appendChild(cellElement);
      });
      table.appendChild(tr);
    });
    const container = document.getElementById('table-container');
    container.innerHTML = '';
    container.appendChild(table);
  })
  .catch(error => {
    document.getElementById('table-container').innerHTML = 'Error loading CSV file.';
    console.error('Error fetching CSV:', error);
  });
