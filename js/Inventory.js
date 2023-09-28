import {
  displayInteractiveMenu,
  removeInteractiveMenu,
} from "./InteractiveMenu.js";
import { TextManager } from "./TextManager.js";
import { AudioManager } from "./AudioManager.js";
import { TrashCan } from "./trashcan.js";

export class Inventory {
  constructor(language, languageManager, sceneManager, character, trashCan) {
    this.languageManager = languageManager; 
    this.inventorySlots = document.querySelectorAll(".inventory-slot");
    this.language = language;
    this.textManager = this.languageManager.textManager;
    this.trashCan = trashCan;
    this.envelopeOpened = false;
    this.sceneManager = sceneManager;
    this.character = character; 
    this.audioManager = new AudioManager();

    this.addItemToInventory({
      id: 1,
      name: { en: "Egg", de: "Ei" },
      image: "Items/egg.png",
      clickAction: () => {
        this.textManager.showEggMessage();
      },
    });
  }

  addItemToInventory(item) {
    if (!item) return;

    const inventorySlotsArray = Array.from(this.inventorySlots);
    const slot = inventorySlotsArray.find((slot) => !slot.dataset.itemId);

    if (slot) {
      slot.dataset.itemId = item.id;
      slot.style.backgroundImage = `url(${item.image})`;
      slot.title = item.name[this.language];

      if (item.clickAction) {
        slot.addEventListener("click", item.clickAction);
      }

      slot.addEventListener("mouseenter", () => {
        if (slot.dataset.itemId !== "") {
          this.displayTooltip(item.name);
        }
      });

      slot.addEventListener("mouseleave", () => {
        if (slot.dataset.itemId !== "") {
          this.removeTooltip();
        }
      });

      if (slot.dataset.itemId === "2") {
        slot.addEventListener("click", (event) => {
          if (slot.dataset.itemId === "2" && !this.trashCan.isMirrorTaken()) {
            this.putMirrorBack(event, slot);
          }
        });
      }
    }
  }

  displayLetter() {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    const letter = document.createElement("div");
    letter.classList.add("letter");
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      letterContainer.remove();
    });
    const letterContent = document.createElement("div");
    letterContent.innerHTML = `${
      this.textManager.translations[this.language].letterGreeting
    }${"<br><br>"}${
      this.textManager.translations[this.language].letterContent
    }${"<br><br>"}${
      this.textManager.translations[this.language].letterSignature
    }${"<br><br>"}${this.textManager.translations[this.language].letterSender}`;
    letter.appendChild(letterContent);
    letter.appendChild(closeButton);
    letterContainer.appendChild(letter);
    const gameScene = document.getElementById("gameScene");
    gameScene.appendChild(letterContainer);
  }

  openEnvelope(event, slot) {
    if (this.envelopeOpened) {
      this.displayLetter();
      return;
    }

    const menuOptions = [
      {
        text: this.language === "en" ? "Open envelope" : "Briefumschlag öffnen",
        onClick: () => {
          const menu = document.querySelector(".interactive-menu");
          removeInteractiveMenu(menu);
          slot.style.backgroundImage = 'url("Items/openEnvelope.png")';
          const letterContainer = document.createElement("div");
          letterContainer.classList.add("letter-container");
          const letter = document.createElement("div");
          letter.classList.add("letter");
          const closeButton = document.createElement("button");
          closeButton.classList.add("close-button");
          closeButton.textContent = "X";
          closeButton.addEventListener("click", () => {
            letterContainer.remove();
            const goButton = document.createElement("button");
            goButton.classList.add("go-button");
            goButton.textContent =
              this.textManager.translations[this.language].goToOldMansHouse ||
              "Go to the old man's house";
            goButton.addEventListener("click", () => {
              this.sceneManager.goToOldMansHouse(this.character);
            });
            const gameScene = document.getElementById("gameScene");
            gameScene.appendChild(goButton);
          });
          const letterContent = document.createElement("div");
          letterContent.innerHTML = `${
            this.textManager.translations[this.language].letterGreeting
          }${"<br><br>"}${
            this.textManager.translations[this.language].letterContent
          }${"<br><br>"}${
            this.textManager.translations[this.language].letterSignature
          }${"<br><br>"}${
            this.textManager.translations[this.language].letterSender
          }`;
          letter.appendChild(letterContent);
          letter.appendChild(closeButton);
          letterContainer.appendChild(letter);
          const gameScene = document.getElementById("gameScene");
          gameScene.appendChild(letterContainer);
          this.audioManager.playSound("bingSound");

          this.textManager.updateTextWindow(
            this.textManager.translations[this.language].openLetter ||
              "This letter carries a grave message... I must embark on this quest to help the village."
          );
          this.envelopeOpened = true;
        },
      },
    ];
    const menu = document.querySelector(".interactive-menu");
    if (!menu) {
      const newMenu = displayInteractiveMenu(menuOptions);
      newMenu.style.left = `${event.pageX}px`;
      newMenu.style.top = `${event.pageY}px`;
    } else {
      removeInteractiveMenu(menu);
    }
  }

  displayTooltip(itemName) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("inventory-tooltip");
    tooltip.innerText = itemName[this.language];
    document.body.appendChild(tooltip);
    window.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.pageX + 15}px`;
      tooltip.style.top = `${event.pageY}px`;
    });
  }

  removeTooltip() {
    const tooltip = document.querySelector(".inventory-tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  putMirrorBack(event, slot) {
    const menuOptions = [
      {
        text: "Put mirror back",
        onClick: () => {
          const menu = document.querySelector(".interactive-menu");
          removeInteractiveMenu(menu);
          slot.dataset.itemId = "";
          slot.style.backgroundImage = "";
          slot.title = "";
          displayMirror();
        },
      },
    ];
    const menu = document.querySelector(".interactive-menu");
    if (!menu) {
      const newMenu = displayInteractiveMenu(menuOptions);
      newMenu.style.left = `${event.pageX}px`;
      newMenu.style.top = `${event.pageY}px`;
    } else {
      removeInteractiveMenu(menu);
    }
  }

  updateInventoryLanguage(language) {
    this.language = language;
    this.inventorySlots.forEach((slot) => {
      if (slot.dataset.itemId === "1") {
        slot.title = language === "de" ? "Ei" : "Egg";
      }
    });
  }
}

export function updateInventoryPosition() {
  const textWindow = document.getElementById("textWindow");
  const inventoryContainer = document.querySelector(".inventory-container");
  if (textWindow && inventoryContainer) {
    const textWindowRect = textWindow.getBoundingClientRect();
    inventoryContainer.style.left = `${textWindowRect.right + 10}px`;
    inventoryContainer.style.top = `${textWindowRect.top}px`;
  }
}

window.addEventListener("resize", updateInventoryPosition);
updateInventoryPosition();
