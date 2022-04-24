const dice = document.getElementById("dice"),
  adviceId = document.getElementById("advice-id"),
  adviceText = document.getElementById("advice-text"),
  toggleBtn = document.querySelectorAll(".toggle-btn");

function displayAdvice() {
  async function getAdvice() {
    try {
      const adviceObject = await fetch("https://api.adviceslip.com/advice");
      if (!adviceObject.ok) throw new Error("Failed to fetch advice 😔");
      const realAdvice = await adviceObject.json();
      const { advice, id } = realAdvice.slip;
      adviceText.classList.add("animate");
      adviceText.innerText = `"${advice}"`;
      adviceId.innerText = `#${id}`;
    } catch (error) {
      adviceText.innerText = error.name + " : " + error.message;
    }
  }
  getAdvice();
  adviceText.classList.remove("animate");
}
function toggleMode(e) {
  if (e.currentTarget.classList.contains("dark-mode")) {
    document.documentElement.setAttribute("color-mode", "dark");
    return;
  }
  document.documentElement.setAttribute("color-mode", "light");
}

dice.addEventListener("click", displayAdvice);
toggleBtn.forEach((btn) => {
  btn.addEventListener("click", toggleMode);
});

setInterval(displayAdvice, 10000);
