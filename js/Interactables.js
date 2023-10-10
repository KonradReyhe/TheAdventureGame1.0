import {
  displayInteractiveMenu,
  removeInteractiveMenu,
} from "./InteractiveMenu.js";

export class Interactable {
  constructor(imageSrc, x = 30, y = 10, width = 50, height = 50, zIndex = 10) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.htmlElement = null;
  }

  addToScene(parentElement) {
    const img = document.createElement("img");
    img.src = this.imageSrc;
    img.style.position = "absolute";
    img.style.left = `${this.x}%`;
    img.style.top = `${this.y}%`;
    img.style.width = `${this.width}%`;
    img.style.height = `${this.height}%`;
    img.style.zIndex = this.zIndex;
    parentElement.appendChild(img);
    this.htmlElement = img;
  }
}

export class Item extends Interactable {
  constructor(imageSrc, x, y, width, height, zIndex = 20) {
    super(imageSrc, x, y, width, height, zIndex);
  }

  addToScene(parentElement) {
    super.addToScene(parentElement);
  }
}

export class Carrot extends Item {
  constructor(imageSrc, x, y, width, height, scene) {
    super(imageSrc, x, y, width, height, 20);
    this.scene = scene;
    this.interactive = false;

    this.addToScene(scene);

    this.htmlElement.addEventListener("click", () => {
      if (!this.interactive) {
        this.interactive = true;
        displayInteractiveMenu(
          [
            {
              text: "Take",
              action: this.takeCarrot.bind(this),
            },
          ],
          this.htmlElement
        );
      }
    });
  }

  takeCarrot() {
    this.scene.inventory.addItem(new Item(this.imageSrc, 0, 0, 10, 10));
    this.htmlElement.parentNode.removeChild(this.htmlElement);
    removeInteractiveMenu();
  }
}

export class Mushroom extends Item {
  constructor(imageSrc, x, y, width, height, scene) {
    super(imageSrc, x + 10, y, width, height, 20);

    this.scene = scene;
    this.interactive = false;

    this.addToScene(scene);

    this.htmlElement.addEventListener("click", () => {
      if (!this.interactive) {
        this.interactive = true;
        displayInteractiveMenu(
          [
            {
              text: "Take",
              action: this.takeMushroom.bind(this),
            },
          ],
          this.htmlElement
        );
      }
    });
  }

  takeMushroom() {
    if (!this.taken) {
      this.scene.inventory.addItem(new Item(this.imageSrc, 0, 0, 10, 10));
      this.htmlElement.parentNode.removeChild(this.htmlElement);
      removeInteractiveMenu();
      this.taken = true;
    }
  }
}
