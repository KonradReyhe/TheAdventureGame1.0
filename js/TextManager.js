export class TextManager {
  constructor(translations, currentLanguage) {
    this.translations = translations;
    this.currentLanguage = currentLanguage;
    this.textWindow = document.getElementById("textWindow");
  }

  setCurrentLanguage(language) {
    this.currentLanguage = language;
  }

  updateTextWindow(message) {
    this.textWindow.textContent = message;
  }

  getText(key) {
    if (
      this.translations &&
      this.translations[this.currentLanguage] &&
      this.translations[this.currentLanguage][key]
    ) {
      return this.translations[this.currentLanguage][key];
    } else {
      console.error(`Text for the key "${key}" does not exist`);
      return `Missing key: ${key}`;
    }
  }

  updateLabel(selector, text, attribute = "innerText") {
    const label = document.querySelector(selector);
    if (label) {
      label[attribute] = text;
    }
  }

  updateAllTexts() {
    this.updateLabel(
      "#startButton",
      this.translations[this.currentLanguage].startGame
    );
    this.updateLabel(
      "#playerName",
      this.translations[this.currentLanguage].enterName,
      "placeholder"
    );
    this.updateLabel(
      "#characterSelection label",
      this.translations[this.currentLanguage].selectCharacter
    );

    this.updateLabel(
      "#languageSelection label",
      this.translations[this.currentLanguage].language
    );
    this.updateLabel(
      "#volumeLabel",
      this.translations[this.currentLanguage].volume
    );
    this.updateLabel(
      "#volumeControlGame #volumeLabel",
      this.translations[this.currentLanguage].volume
    );
    this.updateLabel(
      "#gameDescription",
      this.translations[this.currentLanguage].gameDescription
    );
    this.updatePickUpCarrotText();

    this.setErrorText();
    this.updateGoFurtherButtonText();
    this.updateGoBackHomeButtonText();
    this.updateLabel(
      "#startButton",
      this.translations[this.currentLanguage].startGame
    );
    this.updateGoFurtherButtonText();
    this.updateGoBackHomeButtonText();
    this.updateGoToOldMansHouseButtonText();
    this.updateGameTitle();
  }

  setErrorText() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent =
      this.translations[this.currentLanguage].errorMessage;
  }
  displayWelcomeMessage(playerName) {
    const welcomeMessage = this.translations[
      this.currentLanguage
    ].welcomeMessage.replace("{playerName}", playerName);
    this.updateTextWindow(welcomeMessage);
  }

  showEggMessage() {
    const eggMessage = this.translations[this.currentLanguage].eggMessage;
    this.updateTextWindow(eggMessage);
  }

  showHouseCloseMessage() {
    const houseCloseMessage =
      this.translations[this.currentLanguage].houseCloseMessage;
    this.updateTextWindow(houseCloseMessage);
  }

  updatePickUpCarrotText() {
    const pickUpCarrotButton = document.getElementById("pickUpCarrotButton");
    if (pickUpCarrotButton) {
      pickUpCarrotButton.textContent =
        this.translations[this.currentLanguage].pickUpCarrot;
    }
  }

  showCarrotMessage() {
    this.updateTextWindow(
      this.translations[this.currentLanguage].carrotMessage
    );
  }

  updateGoFurtherButtonText() {
    this.updateLabel("#goFurtherButton", this.getText("goFurther"));
  }

  updateGameTitle() {
    this.updateLabel("#gameTitle", this.getText("gameTitle"));
  }

  updateGoBackHomeButtonText() {
    this.updateLabel("#goBackHomeButton", this.getText("goBackHome"));
  }
  updateGoToOldMansHouseButtonText() {
    this.updateLabel(
      "#goToOldMansHouseButton",
      this.getText("goToOldMansHouse")
    );
  }
}
