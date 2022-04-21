const dice = document.getElementById("dice"),
  adviceId = document.getElementById("advice-id"),
  adviceText = document.getElementById("advice-text");
/*  

View the optimal layout for the app depending on their device's screen size.

Make API calls to the Advice Slip’s API to get the advice

something extra:-

- generate new advice every 10sec, apart from the dice icon which also will generate new advice when clicked.

- create a light mode for the app, the current app design is in dark mode, create a toggle button at the top right of the page which will toggle the mode. Take note of transition effects, might award marks for it :}.

Download the project using the link above and go through the README.md file. This will provide further details about the project and help you get set up.

May the odds be ever in your favor and may the force be with you, remember that Google is your best friend. */
dice.addEventListener("click", displayAdvice);
setInterval(displayAdvice, 10000);

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
