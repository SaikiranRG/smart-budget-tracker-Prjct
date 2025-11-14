const API_BASE = 'http://localhost:4000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

const transactionForm = document.getElementById('transactionForm');
const transactionsTable = document.querySelector('#transactionsTable tbody');

// Add new transaction
transactionForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;

  const res = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ type, category, amount, date, description })
  });

  const data = await res.json();
  alert(data.message);
  loadTransactions();
});

// Load all transactions
async function loadTransactions() {
  const res = await fetch(`${API_BASE}/transactions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();

  transactionsTable.innerHTML = '';
  data.transactions.forEach(t => {
    const row = `
      <tr>
        <td>${t.type}</td>
        <td>${t.category}</td>
        <td>${t.amount}</td>
        <td>${t.date}</td>
        <td>${t.description}</td>
      </tr>
    `;
    transactionsTable.innerHTML += row;
  });
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

loadTransactions();
