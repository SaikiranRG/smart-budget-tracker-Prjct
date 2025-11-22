const API = "http://localhost:4000/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

// Load both charts
loadCategoryChart();
loadMonthlyChart();

// Pie chart
async function loadCategoryChart() {
  const res = await fetch(`${API}/charts/category-totals`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();

  const ctx = document.getElementById('categoryChart');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
      }]
    }
  });
}

// Monthly income vs expense chart
async function loadMonthlyChart() {
  const res = await fetch(`${API}/charts/monthly-summary`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();

  const ctx = document.getElementById('monthlyChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.months,
      datasets: [
        { label: "Income", data: data.income, backgroundColor: "green" },
        { label: "Expense", data: data.expense, backgroundColor: "red" }
      ]
    }
  });
}
