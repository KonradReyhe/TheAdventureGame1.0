import { SceneManager } from "./js/SceneManager.js";
import { Character } from "./js/Character.js";
import { AudioManager } from "./js/AudioManager.js";
import { LanguageManager } from "./js/LanguageManager.js";
import { animateAnimals } from "./js/AnimationManager.js";
import { Inventory, updateInventoryPosition } from "./js/Inventory.js";
import { setupTrashcanClosedInteraction } from "./js/trashcan.js";
import { Interactable, Item } from "./js/Interactables.js";
import { setupEnvelopeInteraction } from "./js/envelope.js";
import { TrashCan } from "./js/trashcan.js";

let globalVolume = 0;
let playerNameGlobal = "";

export const gameSceneAudioManager = new AudioManager(
  "volumeControlGame",
  "gameSceneMusic",
  "music-info",
  "volumeGame",
  false,
  "volumeLabelGame",
  "volumeGame",
  true
);

const languageManager = new LanguageManager(gameSceneAudioManager);
const trashCan = new TrashCan();
window.gameState = {
  trashCanOpen: false,
};
const sceneManager = new SceneManager(languageManager, trashCan);

const character = new Character(sceneManager);
const inventory = new Inventory(
  languageManager.currentLanguage,
  languageManager,
  sceneManager,
  character,
  trashCan
);

sceneManager.setup(character, inventory);

const startingScreenAudioManager = new AudioManager(
  "volume",
  "startingScreenMusic",
  "music-info",
  "volumeGame",
  true,
  "volumeLabel",
  "volume",
  false
);

function showErrorMessageFor(duration) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.classList.toggle("error-message-hidden");
  errorMessage.classList.toggle("error-message-visible");

  setTimeout(() => {
    errorMessage.classList.toggle("error-message-visible");
    errorMessage.classList.toggle("error-message-hidden");
  }, duration);
}

function setupGameEnvironment() {
  playerNameGlobal = document.getElementById("playerName").value;
  if (!playerNameGlobal) {
    showErrorMessageFor(5000);
    return;
  }

  const selectedCharacter = document.getElementById("character").value;
  character.setCharacter(selectedCharacter);
  const startingVolume = startingScreenAudioManager.currentVolume;
  gameSceneAudioManager.updateVolume(startingVolume);
  gameSceneAudioManager.playSound("bingSound");

  gameSceneAudioManager.changeAudioSource("Sounds/scene1.mp3");
  gameSceneAudioManager.updateVolume(globalVolume);

  sceneManager.startGame(languageManager.textManager, playerNameGlobal);

  const mailbox = new Interactable("Interactables/mailbox.png", 60, 75, 15, 30);
  mailbox.addToScene(document.getElementById("gameScene"));
  mailbox.htmlElement.id = "mailbox";

  const envelope = new Item("Items/envelope.png", 62, 80, 3.5, 7);
  envelope.addToScene(document.getElementById("gameScene"));

  updateInventoryPosition();
  setupEnvelopeInteraction(character, inventory, languageManager);
  if (trashCan.isOpened()) {
    setupTrashcanOpenInteraction(
      inventory,
      languageManager,
      gameSceneAudioManager
    );
  } else {
    setupTrashcanClosedInteraction(
      inventory,
      languageManager,
      gameSceneAudioManager
    );
  }

  character.setCharacter(selectedCharacter, playerNameGlobal);
}

function handleLanguageChange(event) {
  const selectedLanguage = event.target.value;
  languageManager.changeLanguage(selectedLanguage);
  inventory.updateInventoryLanguage(selectedLanguage);
  languageManager.updateTexts();

  
  if (playerNameGlobal) {
    playerNameGlobal =
      languageManager.translations[selectedLanguage][playerNameGlobal] ||
      playerNameGlobal;
  }

  const characterOptions = document.getElementById("character").options;
  Array.from(characterOptions).forEach((option) => {
    option.text = languageManager.translations[selectedLanguage][option.value];
  });

  const goButton = document.querySelector(".go-button");
  if (goButton)
    goButton.innerText =
      languageManager.translations[selectedLanguage].goFurther || "Go further";

  const goHomeButton = document.querySelector(".go-home-button");
  if (goHomeButton)
    goHomeButton.innerText =
      languageManager.translations[selectedLanguage].goBackHome ||
      "Go back home";
}

function handleGameSceneClick(event) {
  const screenHeight = window.innerHeight;
  if (event.clientY > screenHeight / 2) {
    const clickAnimation = document.createElement("div");
    clickAnimation.className = "click-animation";
    clickAnimation.style.left = event.clientX + "px";
    clickAnimation.style.top = event.clientY + "px";

    document.getElementById("gameScene").appendChild(clickAnimation);

    setTimeout(() => clickAnimation.classList.add("expand"), 10);
    setTimeout(() => clickAnimation.remove(), 300);

    character.walk(event.clientX, event.clientY);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startingScreenAudioManager.setupVolumeControl();
  gameSceneAudioManager.setupVolumeControl();

  if (gameSceneAudioManager.currentVolume > 0) {
    document.getElementById("music-info").style.display = "block";
  } else {
    document.getElementById("music-info").style.display = "none";
  }

  animateAnimals();

  document
    .getElementById("language")
    .addEventListener("change", handleLanguageChange);
  document
    .getElementById("startButton")
    .addEventListener("click", setupGameEnvironment);
  document
    .getElementById("optionsButton")
    .addEventListener(
      "click",
      gameSceneAudioManager.toggleVolumeControl.bind(gameSceneAudioManager)
    );
  document
    .getElementById("volumeGame")
    .addEventListener("input", (event) =>
      gameSceneAudioManager.updateVolume(event.target.value / 100)
    );
  document
    .getElementById("gameScene")
    .addEventListener("click", handleGameSceneClick);

  document.getElementById("volume").addEventListener("input", (event) => {
    const volumeValue = event.target.value / 100;
    startingScreenAudioManager.updateVolume(volumeValue);
    globalVolume = volumeValue;
  });

  document
    .getElementById("startButton")
    .addEventListener("click", () =>
      startingScreenAudioManager.updateVolume(0)
    );
  const initialLanguage = document.getElementById("language").value;
  languageManager.changeLanguage(initialLanguage);
  handleLanguageChange({ target: { value: initialLanguage } });
});
