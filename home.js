const validPin = 2246;
let transactions = [];

// Helpers
function getBalance() {
  return Number(document.getElementById("available-balance").innerText);
}
function setBalance(amount) {
  document.getElementById("available-balance").innerText = amount;
}
function addTransaction(type, amount, extra = "") {
  const entry = {
    type,
    amount,
    extra,
    date: new Date().toLocaleString()
  };
  transactions.unshift(entry);
  loadTransactions();
}
function loadTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = `<p class="text-gray-500">No transactions yet.</p>`;
    return;
  }

  transactions.forEach(tx => {
    const card = document.createElement("div");
    card.className = "p-3 rounded-lg shadow bg-[#F4F5F7]";
    card.innerHTML = `
      <div class="flex justify-between">
        <span class="font-semibold">${tx.type}</span>
        <span class="text-sm text-gray-500">${tx.date}</span>
      </div>
      <p class="text-blue-600">Amount: $${tx.amount}</p>
      <p class="text-sm text-gray-600">${tx.extra}</p>
    `;
    list.appendChild(card);
  });
}
function showSection(sectionId) {
  document.querySelectorAll(".all-form-section > div").forEach((sec) => {
    sec.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
  if (sectionId === "transaction-parent") loadTransactions();
}

// Add Money
document.getElementById("add-money-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const bank = document.getElementById("bank").value;
  const account = document.getElementById("add-account").value;
  const amount = Number(document.getElementById("add-amount").value);
  const pin = Number(document.getElementById("add-pin").value);

  if (account.length < 11 || isNaN(amount) || amount <= 0 || pin !== validPin) {
    alert("❌ Invalid input or wrong PIN");
    return;
  }

  setBalance(getBalance() + amount);
  addTransaction("Add Money", amount, `(${bank})`);
  alert(`✅ $${amount} added from ${bank}`);

  document.getElementById("add-account").value = "";
  document.getElementById("add-amount").value = "";
  document.getElementById("add-pin").value = "";
});

// Cash Out
document.getElementById("cashout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const account = document.getElementById("cashout-account").value;
  const amount = Number(document.getElementById("cashout-amount").value);
  const pin = Number(document.getElementById("cashout-pin").value);

  if (account.length < 11 || isNaN(amount) || amount <= 0 || pin !== validPin || amount > getBalance()) {
    alert("❌ Invalid input, wrong PIN, or insufficient balance");
    return;
  }

  setBalance(getBalance() - amount);
  addTransaction("Cash Out", amount, `(Agent: ${account})`);
  alert(`✅ $${amount} withdrawn`);

  document.getElementById("cashout-account").value = "";
  document.getElementById("cashout-amount").value = "";
  document.getElementById("cashout-pin").value = "";
});

// Transfer
document.getElementById("transfer-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const receiver = document.getElementById("transfer-account").value;
  const amount = Number(document.getElementById("transfer-amount").value);
  const pin = Number(document.getElementById("transfer-pin").value);

  if (receiver.length < 11 || isNaN(amount) || amount <= 0 || pin !== validPin || amount > getBalance()) {
    alert("❌ Invalid input, wrong PIN, or insufficient balance");
    return;
  }

  setBalance(getBalance() - amount);
  addTransaction("Transfer", amount, `(To: ${receiver})`);
  alert(`✅ $${amount} transferred`);

  document.getElementById("transfer-account").value = "";
  document.getElementById("transfer-amount").value = "";
  document.getElementById("transfer-pin").value = "";
});

// Bonus
document.getElementById("bonus-btn").addEventListener("click", function () {
  const bonus = 500;
  setBalance(getBalance() + bonus);
  addTransaction("Bonus", bonus);
  alert(`🎉 Bonus received: $${bonus}`);
});

// Bill
document.getElementById("bill-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const type = document.getElementById("bill-type").value;
  const amount = Number(document.getElementById("bill-amount").value);
  const pin = Number(document.getElementById("bill-pin").value);

  if (isNaN(amount) || amount <= 0 || pin !== validPin || amount > getBalance()) {
    alert("❌ Invalid bill info or insufficient balance");
    return;
  }

  setBalance(getBalance() - amount);
  addTransaction("Bill Payment", amount, `(${type})`);
  alert(`✅ Paid $${amount} for ${type}`);

  document.getElementById("bill-amount").value = "";
  document.getElementById("bill-pin").value = "";
});

// Toggle
document.getElementById("add-money-button").addEventListener("click", () => showSection("add-money-parent"));
document.getElementById("cash-out-button").addEventListener("click", () => showSection("cash-out-parent"));
document.getElementById("transfer-button").addEventListener("click", () => showSection("transfer-parent"));
document.getElementById("bonus-button").addEventListener("click", () => showSection("bonus-parent"));
document.getElementById("bill-button").addEventListener("click", () => showSection("bill-parent"));
document.getElementById("transaction-button").addEventListener("click", () => showSection("transaction-parent"));

// Load transactions at startup
document.addEventListener("DOMContentLoaded", loadTransactions);
 