let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  let list = document.getElementsByName("game");
  let result = document.getElementById("result");

  list.forEach((value) => {
    if (value.checked) {
      startGame({
        myNum: value.value,
        youNum: getYourNum(),
        callBack: (result) => {
          this.result.innerText = result;

          let blink_speed = 500;
          let show = true;
          let interv = setInterval(function () {
            if (show) {
              this.result.innerText = "";
              show = false;
            } else {
              this.result.innerText = result;
              show = true;
            }
          }, blink_speed);
          setTimeout(() => {
            clearInterval(interv);
            startBtn.disabled = false;
          }, 2000);
        },
      });
    }
  });
});

function getYourNum() {
  return Math.floor(Math.random() * 3) + 1;
}

function startGame({ myNum, youNum, callBack }) {
  let myImg = document.getElementById("my_img");
  setGameImage(myImg, myNum);

  let youImg = document.getElementById("you_img");
  setGameImage(youImg, youNum);

  if (myNum == youNum) {
    callBack("비겼습니다.");
    return;
  }

  if ((myNum % 3) + 1 == youNum) {
    callBack("졌습니다.");
    return;
  }

  callBack("이겼습니다.");
}

function setGameImage(imgElement, num) {
  let img = "";

  if (num == 1) {
    img = "img/scissor.png";
  } else if (num == 2) {
    img = "img/rock.png";
  } else {
    img = "img/paper.png";
  }

  imgElement.src = img;
}
