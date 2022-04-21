const dice = document.getElementById("dice");
const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");

dice.addEventListener("click", displayAdvice);

function displayAdvice() {
  async function getAdvice() {
    try {
      const adviceObject = await fetch("https://api.adviceslip.com/advice");
      if (adviceObject.ok) {
        const realAdvice = await adviceObject.json();
        const { advice, id } = realAdvice.slip;
        adviceText.classList.add("animate");
        adviceText.innerText = `"${advice}"`;
        adviceId.innerText = `#${id}`;
      } else {
        throw new Error("Failed to fetch advice 😔");
      }
    } catch (error) {
      adviceText.innerText = error.name + ": Failed to fetch advice 😔";
    }
  }
  getAdvice();
  adviceText.classList.remove("animate");
}
