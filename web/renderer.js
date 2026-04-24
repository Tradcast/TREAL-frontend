const navButtons = [...document.querySelectorAll(".nav-btn")];
const pages = [...document.querySelectorAll(".page")];
const setupForm = document.getElementById("setup-form");
const setupFeedback = document.getElementById("setup-feedback");
const pnlValue = document.getElementById("pnl-value");
const balanceValue = document.getElementById("balance-value");
const freeBalanceValue = document.getElementById("free-balance-value");
const inPositionValue = document.getElementById("in-position-value");
const tradeStatus = document.getElementById("trade-status");

const tradeState = { balance: 1500, freeBalance: 1400, inPosition: 100, pnl: 0.002 };

function setActivePage(pageId) {
  pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.target === pageId));
}

function formatNumber(value) {
  return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderTradeState() {
  const pnlPercent = tradeState.pnl * 100;
  pnlValue.textContent = `${pnlPercent >= 0 ? "+" : ""}${pnlPercent.toFixed(2)}%`;
  balanceValue.textContent = formatNumber(tradeState.balance);
  freeBalanceValue.textContent = formatNumber(tradeState.freeBalance);
  inPositionValue.textContent = formatNumber(tradeState.inPosition);
}

navButtons.forEach((button) => button.addEventListener("click", () => setActivePage(button.dataset.target)));

setupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(setupForm);
  localStorage.setItem("treal.setup", JSON.stringify(Object.fromEntries(formData.entries())));
  setupFeedback.textContent = "Saved locally in Tauri dev build.";
});

["long-btn", "short-btn", "close-btn", "claim-exit-btn"].forEach((id) => {
  const el = document.getElementById(id);
  el?.addEventListener("click", () => {
    tradeState.pnl = Number((tradeState.pnl + (Math.random() - 0.5) * 0.02).toFixed(4));
    tradeState.balance = Math.max(0, tradeState.balance + tradeState.balance * (tradeState.pnl * 0.05));
    tradeState.freeBalance = Math.max(0, tradeState.balance - tradeState.inPosition);
    if (id === "close-btn") {
      tradeState.inPosition = 0;
      tradeState.freeBalance = tradeState.balance;
    }
    renderTradeState();
    if (tradeStatus) tradeStatus.textContent = `${id.replace("-btn", "").toUpperCase()} clicked (development mock)`;
  });
});

renderTradeState();
