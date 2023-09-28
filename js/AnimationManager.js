export { animateAnimals, animateBeetle };

const eagle = document.querySelector("#eagle");
const rabbit = document.querySelector("#rabbit");
const beetle = document.querySelector("#beetle"); 

function animateAnimals() {
  setTimeout(() => {
    animateEagleRight();
  }, 5000);
}

function animateEagleRight() {
  eagle.style.backgroundImage = "url('Animations/eagleright.png')";
  eagle.style.left = "-200px";
  eagle.style.top = "10%";
  eagle.style.transition = "none";

  setTimeout(() => {
    eagle.style.transition = "all 10s linear";
    eagle.style.left = "100%";
  }, 50);

  setTimeout(() => {
    animateRabbitLeft();
  }, 10000);
}

function animateRabbitLeft() {
  rabbit.style.backgroundImage = "url('Animations/rabbitleft.png')";
  rabbit.style.left = "100%";
  rabbit.style.right = "auto";
  rabbit.style.bottom = "0";
  rabbit.style.transition = "none";

  setTimeout(() => {
    rabbit.style.transition = "all 10s linear";
    rabbit.style.left = "-150px";
  }, 50);

  setTimeout(() => {
    animateEagleLeft();
  }, 10000);
}

function animateEagleLeft() {
  eagle.style.backgroundImage = "url('Animations/eagleleft.png')";
  eagle.style.left = "auto";
  eagle.style.right = "-200px";
  eagle.style.top = "10%";
  eagle.style.transition = "none";

  setTimeout(() => {
    eagle.style.transition = "all 10s linear";
    eagle.style.right = "100%";
  }, 50);

  setTimeout(() => {
    animateRabbitRight();
  }, 10000);
}

function animateRabbitRight() {
  rabbit.style.backgroundImage = "url('Animations/rabbitright.png')";
  rabbit.style.right = "auto";
  rabbit.style.left = "-150px";
  rabbit.style.bottom = "0";
  rabbit.style.transition = "none";

  setTimeout(() => {
    rabbit.style.transition = "all 10s linear";
    rabbit.style.left = "100%";
  }, 50);

  setTimeout(() => {
    animateEagleRight();
  }, 10000);
}

let beetleAnimated = false;

function animateBeetle() {
  if (beetleAnimated) {
    return;
  }

  const beetle = document.querySelector("#beetle");
  beetle.style.position = "absolute";
  beetle.style.left = "80%";
  beetle.style.top = "93%";
  beetle.style.width = "70px";
  beetle.style.height = "70px";

  setTimeout(() => {
    beetle.style.transition = "all 5s linear";
    beetle.style.left = "-200px";
  }, 50);

  beetleAnimated = true;
}
