let chart;
let originalData = [];

window.onload = function () {
  fetch('data/data.csv')
    .then(response => response.text())
    .then(text => {
      const rows = text.trim().split('\n').slice(1); // skip header
      originalData = rows.map(row => {
        const [date, value] = row.split(',');
        return { date, value: parseFloat(value) };
      });
      drawChart(originalData);
    });
};

function drawChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  const labels = data.map(d => d.date);
  const values = data.map(d => d.value);

  if (chart) chart.destroy(); // Clear old chart

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Value',
        data: values,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Date' }
        },
        y: {
          title: { display: true, text: 'Value' }
        }
      }
    }
  });
}

function filterData() {
  const from = document.getElementById('from-date').value;
  const to = document.getElementById('to-date').value;

  const filtered = originalData.filter(d => {
    return (!from || d.date >= from) && (!to || d.date <= to);
  });

  drawChart(filtered);
}
