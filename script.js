let resetbtn = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const winPatterns = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [6, 4, 2], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
let turn0 = true;

const Resetbtn = () => {
  turn0 = true;
  enableboxes();
  hideWinner();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent overwriting a box

    if (turn0) {
      box.innerText = "X"; 
      turn0 = false;       
    } else {
      box.innerText = "0"; 
      turn0 = true;       
    }

    checkWinner();
    checkDraw(); // Check if the game is a draw after every move
  });
});

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // Clear text in boxes
  }
};

const disabledboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => { 
  msg.innerText = winner === "Draw" 
    ? "It's a Draw!" 
    : `Congratulations! Winner is ${winner}`;
  
  msgContainer.classList.add("show"); // Add the 'show' class to trigger the transition
  disabledboxes(); // Disable all boxes after a winner or draw
};

const hideWinner = () => {
  msgContainer.classList.remove("show"); // Remove the 'show' class to hide the message
};


const checkWinner = () => {
  for (let patterns of winPatterns) { 
    let posval1 = boxes[patterns[0]].innerText;
    let posval2 = boxes[patterns[1]].innerText;
    let posval3 = boxes[patterns[2]].innerText;

    // Check if the three positions match and are not empty
    if (posval1 !== "" && posval1 === posval2 && posval2 === posval3) {
      console.log("Winner:", posval1);
      showWinner(posval1); 
      return; // Stop further checks if a winner is found
    }
  }
};

const checkDraw = () => {
  // Check if all boxes are filled and no winner is declared
  const allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  
  if (allFilled && msgContainer.style.display !== "block") { // Only declare a draw if no winner has been declared
    console.log("Draw match");
    showWinner("Draw");
  }
};

// Event listeners for reset and new buttons
resetbtn.addEventListener("click", Resetbtn);
newbtn.addEventListener("click", Resetbtn);
