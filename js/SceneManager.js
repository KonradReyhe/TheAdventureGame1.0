import { TextManager } from "./TextManager.js";
import {
  displayInteractiveMenu,
  removeInteractiveMenu,
} from "./InteractiveMenu.js";
import { AudioManager } from "./AudioManager.js";
import {
  setupTrashcanClosedInteraction,
  setupTrashcanOpenInteraction,
} from "./trashcan.js";
import { LanguageManager } from "./LanguageManager.js";
import { Interactable } from "./Interactables.js";
import { gameSceneAudioManager } from "../main.js";

const SCENES = {
  STARTING_SCREEN: "startingScreen",
  GAME_SCENE: "gameScene",
};

const IMAGE_PATHS = {
  FORREST_PATH: "/TheAdventureGame1.0/Backgrounds/Forrest_Path.jpg",
  HOME: "../Backgrounds/home.jpg",
  CARROT: "../Items/carrot.png",
  MAILBOX: "Interactables/mailbox.png",
};

export class SceneManager {
  constructor(languageManager, trashCan) {
    
    this.currentScene = SCENES.STARTING_SCREEN;
    this.homeScene = null;
    this.textManager = new TextManager();
    this.audioManager = new AudioManager();
    this.carrotElement = null;
    this.trashCan = null;
    this.hasCarrotBeenPickedUp = false;
    this.isMailboxAdded = false;
    this.homeInteractables = [];
    this.currentMenu = null;
    this.languageManager = languageManager;
    this.trashCan = trashCan; 
  }

  setup(character, inventory, trashCan) {
    this.character = character;
    this.characterSprite = this.character.characterSprite;
    this.inventory = inventory;
  }

  startGame(textManager, playerName) {
    this.textManager = textManager;
    this.switchScene(SCENES.STARTING_SCREEN, SCENES.GAME_SCENE);
    this.playerName = playerName || this.playerName;
    this.delayedWelcomeMessage();
    this.homeScene =
      this.homeScene || document.getElementById(SCENES.GAME_SCENE);
  }

  switchScene(from, to) {
    this.hideScene(from);
    this.showScene(to);
  }

  hideScene(sceneName) {
    document.getElementById(sceneName).style.display = "none";
  }

  showScene(sceneName) {
    document.getElementById(sceneName).style.display = "block";
  }

  delayedWelcomeMessage() {
    setTimeout(
      () => this.textManager.displayWelcomeMessage(this.playerName),
      0
    );
  }

  addInteractableToScene(src, clickAction) {
    const interactable = document.createElement("img");
    Object.assign(interactable.style, {
      position: "absolute",
      left: "30%",
      bottom: "10%",
      width: "50px",
      height: "50px",
    });
    interactable.src = src;
    interactable.className = "interactable";
    interactable.addEventListener("click", clickAction);
    if (src === IMAGE_PATHS.CARROT) {
      interactable.id = "carrot"; 
    }
    document.getElementById(SCENES.GAME_SCENE).appendChild(interactable);
    return interactable;
  }

  goToOldMansHouse() {
    this.removeHomeInteractables();

    const { goButton, transitionCover, backgroundImg } =
      this.getElementsFromDOM();

    const trashcanOpenElement = document.querySelector(
      'img[src="Interactables/TrashcanOpen.png"]'
    );
    if (trashcanOpenElement) trashcanOpenElement.remove();

    const trashcanClosedElement = document.querySelector(
      'img[src="Interactables/TrashcanClosed.png"]'
    );
    if (trashcanClosedElement) trashcanClosedElement.remove();

    const mailbox = document.getElementById("mailbox");
    if (mailbox) mailbox.remove();

    this.character.walkToLeft();

    if (goButton) goButton.remove();

    this.transitionScenes(
      transitionCover,
      backgroundImg,
      "/TheAdventureGame1.0/Backgrounds/Forrest_Path.jpg",
      this.handleForestTransition.bind(this)
  );
  
  }

  getElementsFromDOM() {
    return {
      gameScene: document.getElementById("gameScene"),
      goButton: document.querySelector(".go-button"),
      transitionCover: document.getElementById("transition-cover"),
      trashcanClosedElement: document.querySelector(
        'img[src="Interactables/TrashcanClosed.png"]'
      ),
      trashcanOpenElement: document.querySelector(
        'img[src="Interactables/TrashcanOpen.png"]'
      ),
      mailbox: document.getElementById("mailbox"),
      backgroundImg: document.querySelector("#gameScene .background"),
    };
  }

  transitionScenes(transitionCover, backgroundImg, backgroundSrc, callback) {
    transitionCover.style.display = "block";
    gameSceneAudioManager.playSound("forestFootstepsSound");

    setTimeout(() => {
      const newBackground = new Image();
      newBackground.src = backgroundSrc;
      newBackground.onload = () => {
        backgroundImg.src = newBackground.src;
        callback.call(this);
        transitionCover.style.display = "none";
      };
    }, 2000);
  }

  handleForestTransition() {
    this.textManager.showHouseCloseMessage();
    const { gameScene, gameSceneRect, characterWidth } =
      this.getSceneAndCharacterDimensions();
    const newCharacterPosition = {
      x: gameSceneRect.width * 0.8 - characterWidth / 2,
      y: "1%",
    };
    this.character.updatePosition(newCharacterPosition);
    if (!this.hasCarrotBeenPickedUp) {
      this.carrotElement = this.addInteractableToScene(
        IMAGE_PATHS.CARROT,
        this.handleCarrotInteraction.bind(this)
      );
    }
    this.createGoFurtherButton(gameScene);
  }

  getSceneAndCharacterDimensions() {
    const gameScene = document.getElementById(SCENES.GAME_SCENE);
    return {
      gameScene,
      gameSceneRect: gameScene.getBoundingClientRect(),
      characterWidth: this.characterSprite.offsetWidth,
    };
  }

  handleCarrotInteraction(event) {
    event.preventDefault();
    const menu = (this.currentMenu = displayInteractiveMenu(
      [
        {
          text: this.textManager.getText("pickUpCarrot"),
          onClick: this.pickUpCarrot.bind(this),
        },
      ],
      event.clientX,
      event.clientY
    ));
  }

  pickUpCarrot() {
    this.inventory.addItemToInventory({
      id: 3,
      name: { en: "Carrot", de: "Karotte" },
      image: IMAGE_PATHS.CARROT,
      clickAction: () => this.textManager.showCarrotMessage(),
    });
    this.hasCarrotBeenPickedUp = true;
    this.carrotElement.remove();
    removeInteractiveMenu(this.currentMenu);
    this.textManager.showCarrotMessage();
    gameSceneAudioManager.playSound("clickSound");
  }

  createGoFurtherButton(gameScene) {
    const goFurtherButton = this.createButton(
      this.textManager.getText("goFurther"),
      "go-button",
      this.goToNextScene
    );
    gameScene.appendChild(goFurtherButton);
    const goBackButton = this.createButton(
      this.textManager.getText("goBackHome"),
      "go-home-button",
      this.goBackHome.bind(this)
    );

    gameScene.appendChild(goBackButton);
  }

  createButton(text, className, clickHandler) {
    const button = document.createElement("button");
    button.innerText = text;
    button.className = className;
    button.style.position = "absolute";
    button.addEventListener("click", clickHandler);
    return button;
  }

  goToNextScene() {
    console.log("Moving to the next scene...");
  }

  goBackHome() {
    const { gameScene, transitionCover, backgroundImg } =
      this.getElementsFromDOM();
    this.removeCarrotFromScene();
    this.transitionScenes(
      transitionCover,
      backgroundImg,
      IMAGE_PATHS.HOME,
      this.handleHomeTransition.bind(this)
    );
  }

  removeCarrotFromScene() {
    const carrotElement = document.getElementById("carrot");
    if (carrotElement) {
      carrotElement.remove();
    }
  }

  createGoToOldMansHouseButton() {
    const gameScene = document.querySelector("#gameScene"); 
    const goToOldMansHouseButton = document.createElement("button");
    goToOldMansHouseButton.id = "goToOldMansHouseButton";
    goToOldMansHouseButton.innerText =
      this.languageManager.textManager.getText("goToOldMansHouse");

    gameScene.appendChild(goToOldMansHouseButton);
    
  }

  handleHomeTransition() {
    const goFurtherButton = document.querySelector(".go-button");
    if (goFurtherButton) {
      goFurtherButton.remove();
    }
    const goBackButton = document.querySelector(".go-home-button");
    if (goBackButton) {
      goBackButton.remove();
    }

    const { gameScene, gameSceneRect, characterWidth } =
      this.getSceneAndCharacterDimensions();
    const currentLanguage = this.languageManager.getCurrentLanguage();
    this.languageManager.setCurrentLanguage(currentLanguage);

    
    if (this.trashCan && this.trashCan.isOpened()) {
      setupTrashcanOpenInteraction(
        this.inventory,
        this.languageManager,
        gameSceneAudioManager
      );
    } else {
      setupTrashcanClosedInteraction(
        this.inventory,
        this.languageManager,
        gameSceneAudioManager
      );
    }

    this.homeInteractables.push(this.trashCan);

    const newCharacterPosition = {
      x: gameSceneRect.width * 0.15 - characterWidth / 2,
      y: "1%",
    };
    this.character.updatePosition(newCharacterPosition);
    this.createGoButton(gameScene);

    this.addMailboxToHomeScene();
  }

  addMailboxToHomeScene() {
    let mailboxElement = new Interactable(
      "Interactables/mailbox.png",
      60,
      75,
      15,
      30
    );
    mailboxElement.addToScene(document.getElementById(SCENES.GAME_SCENE));
    if (mailboxElement && mailboxElement.htmlElement) {
      this.homeInteractables.push(mailboxElement.htmlElement);
    }
  }

  createGoButton(gameScene) {
    const goButton = this.createButton(
      this.textManager.getText("goToOldMansHouse"), 
      "go-button",
      this.goToOldMansHouse.bind(this)
    );
    gameScene.appendChild(goButton);
    this.homeInteractables.push(goButton);
  }

  removeHomeInteractables() {
    for (let interactable of this.homeInteractables) {
      if (interactable && interactable.parentNode) {
        interactable.parentNode.removeChild(interactable);
      }
    }
    this.homeInteractables = []; 
  }
}
