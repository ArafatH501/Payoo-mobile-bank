const validPin = 2246;

// Helper functions
function getBalance() {
  return Number(document.getElementById("available-balance").innerText);
}
function setBalance(amount) {
  document.getElementById("available-balance").innerText = amount;
}
function addTransaction(type, amount, extra = "") {
  const list = document.getElementById("transaction-list");
  const li = document.createElement("li");
  li.innerText = `${type}: $${amount} ${extra}`;
  list.prepend(li);
}
function showSection(sectionId) {
  document.querySelectorAll(".all-form-section > div").forEach((sec) => {
    sec.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

// ========== Add Money ==========
document.getElementById("add-money-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const bank = document.getElementById("bank").value;
  const account = document.getElementById("add-account").value;
  const amount = Number(document.getElementById("add-amount").value);
  const pin = Number(document.getElementById("add-pin").value);

  if (account.length < 11) {
    alert("❌ Please provide a valid account number");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("❌ Please provide a valid amount");
    return;
  }
  if (pin !== validPin) {
    alert("❌ Wrong PIN");
    return;
  }

  const newBalance = getBalance() + amount;
  setBalance(newBalance);
  alert(`✅ $${amount} added successfully from ${bank}`);
  addTransaction("Add Money", amount, `(${bank})`);

  document.getElementById("add-account").value = "";
  document.getElementById("add-amount").value = "";
  document.getElementById("add-pin").value = "";
});

// ========== Cash Out ==========
document.getElementById("cashout-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const account = document.getElementById("cashout-account").value;
  const amount = Number(document.getElementById("cashout-amount").value);
  const pin = Number(document.getElementById("cashout-pin").value);

  if (account.length < 11) {
    alert("❌ Invalid agent number");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("❌ Invalid amount");
    return;
  }
  if (pin !== validPin) {
    alert("❌ Wrong PIN");
    return;
  }
  if (amount > getBalance()) {
    alert("❌ Insufficient Balance");
    return;
  }

  const newBalance = getBalance() - amount;
  setBalance(newBalance);
  alert(`✅ $${amount} withdrawn successfully`);
  addTransaction("Cash Out", amount, `(Agent: ${account})`);

  document.getElementById("cashout-account").value = "";
  document.getElementById("cashout-amount").value = "";
  document.getElementById("cashout-pin").value = "";
});

// ========== Transfer ==========
document.getElementById("transfer-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const receiver = document.getElementById("transfer-account").value;
  const amount = Number(document.getElementById("transfer-amount").value);
  const pin = Number(document.getElementById("transfer-pin").value);

  if (receiver.length < 11) {
    alert("❌ Invalid receiver number");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("❌ Invalid amount");
    return;
  }
  if (pin !== validPin) {
    alert("❌ Wrong PIN");
    return;
  }
  if (amount > getBalance()) {
    alert("❌ Insufficient Balance");
    return;
  }

  const newBalance = getBalance() - amount;
  setBalance(newBalance);
  alert(`✅ $${amount} transferred successfully`);
  addTransaction("Transfer", amount, `(To: ${receiver})`);

  document.getElementById("transfer-account").value = "";
  document.getElementById("transfer-amount").value = "";
  document.getElementById("transfer-pin").value = "";
});

// ========== Bonus ==========
document.getElementById("bonus-btn").addEventListener("click", function () {
  const bonus = 500;
  setBalance(getBalance() + bonus);
  alert(`🎉 You received a $${bonus} bonus!`);
  addTransaction("Bonus", bonus);
});

// ========== Pay Bill ==========
document.getElementById("bill-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const type = document.getElementById("bill-type").value;
  const amount = Number(document.getElementById("bill-amount").value);
  const pin = Number(document.getElementById("bill-pin").value);

  if (isNaN(amount) || amount <= 0) {
    alert("❌ Invalid bill amount");
    return;
  }
  if (pin !== validPin) {
    alert("❌ Wrong PIN");
    return;
  }
  if (amount > getBalance()) {
    alert("❌ Insufficient Balance");
    return;
  }

  const newBalance = getBalance() - amount;
  setBalance(newBalance);
  alert(`✅ Paid $${amount} for ${type} bill`);
  addTransaction("Bill Payment", amount, `(${type})`);

  document.getElementById("bill-amount").value = "";
  document.getElementById("bill-pin").value = "";
});

// ========== Section Toggle ==========
document.getElementById("add-money-button").addEventListener("click", () => showSection("add-money-parent"));
document.getElementById("cash-out-button").addEventListener("click", () => showSection("cash-out-parent"));
document.getElementById("transfer-button").addEventListener("click", () => showSection("transfer-parent"));
document.getElementById("bonus-button").addEventListener("click", () => showSection("bonus-parent"));
document.getElementById("bill-button").addEventListener("click", () => showSection("bill-parent"));
document.getElementById("transaction-button").addEventListener("click", () => showSection("transaction-parent"));
