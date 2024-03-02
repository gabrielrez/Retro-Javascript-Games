const btns = document.querySelectorAll(".game");

const options = [0, 1, 2];
let selected = 0;
btns[selected].classList.add("active");

window.addEventListener("keydown", changeSelected);

function changeSelected(event) {
  if (event.keyCode == 38 && selected != options[0]) {
    console.log("up");
    selected -= 1;
  } else if (event.keyCode == 40 && selected != options.length - 1) {
    console.log("down");
    selected += 1;
  }
  btns.forEach((btn) => {
    btn.classList.remove("active");
  })
  btns[selected].classList.add("active");
}