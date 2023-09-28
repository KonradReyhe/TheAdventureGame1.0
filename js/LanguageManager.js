import { TextManager } from "./TextManager.js";

export class LanguageManager {
  static currentLanguage = "en"; 
  constructor(audioManager) {

    this.audioManager = audioManager;
    this.defaultLanguage = "en";
    this.currentLanguage = localStorage.getItem('gameLanguage') || this.defaultLanguage;

    this.translations = {
      en: {
        startGame: "Start Game",
        enterName: "Enter your name",
        selectCharacter: "Select your character:",
        language: "Language:",
        volume: "Volume:",
        musicInfo: "🎵 Please Calm My Mind - Lesfm",
        gameTitle: "The Adventure Game",
        gameDescription:
          "Join us in an exciting click and point adventure through a magical world full of challenges and mysteries.",
        male: "Male",
        errorMessage: "Please enter your name before starting the game.",
        welcomeMessage:
          "You are now in front of your home, {playerName}. Good luck on your adventure!",
        letterGreeting: "Greetings adventurer,",
        letterContent: `Our community is in peril, and I seek your aid in a most urgent matter. For generations, a dragon has terrorized our village and hoarded a treasure that rightfully belongs to us all. I have sketched the directions on the envelope leading to the residence of an elderly gentleman whom you must meet. He holds the knowledge you will need to defeat the dragon and recover the treasure.
    
        But more important than the treasure itself is the restoration of peace and justice to our land. The old man will guide you on your journey and tell you where to go. The road ahead is treacherous and filled with danger, but I believe that you have the heart and courage to undertake this quest.
  
        The fate of our community rests in your hands, adventurer. May the gods guide you on your journey.`,
        letterSignature: "Sincerely,",
        letterSender: "An Anonymous Sender",
        openTrashcan: "Open trashcan",
        lookIntoTrashcan: "Look into trashcan",
        closeTrashcan: "Close trashcan",
        takeMirror: "Take mirror",
        putMirrorBack: "Put mirror back",
        takeEnvelope: "Take envelope",
        openEnvelope: "Open envelope",
        eggMessage: "It's just an egg...",
        clickEnvelope: "I wonder what's in the envelope...?",
        takeEnvelopeToInventory: "I should probably open the envelope...",
        openLetter:
          "This letter carries a grave message... I must embark on this quest to help the village.",
        trashcanEmptyMessage: "I don't have anything to throw away.",
        trashcanOpenMessage: "It smells...",
        lookIntoTrashcanMessage: "It's a mirror, it looks nice.",
        mirrorTakenMessage: "This mirror might be useful later.",
        putMirrorBackMessage: "Maybe I should have taken the mirror...",
        nothingElseInTrashcanMessage:
          "There is nothing else of use in there...",
        trashcanClosedMessage: "That's better...",
        goToOldMansHouse: "Go to the old man's house",
        mirrorMessage: "I can see my reflection in it...",
        houseCloseMessage: "The house of the old man should be very close.",
        pickUpCarrot: "Pick up carrot",
        carrotMessage: "This is a carrot!",
        goFurther: "Go further",
        goBackHome: "Go back home",
        underDevelopment: "Under Development",
      },
      de: {
        startGame: "Spiel starten",
        eggMessage: "Es ist nur ein Ei...",
        enterName: "Gib deinen Namen ein",
        selectCharacter: "Wähle deinen Charakter:",
        language: "Sprache:",
        volume: "Lautstärke:",
        musicInfo: "🎵 Please Calm My Mind - Lesfm",
        gameTitle: "Das Abenteuerspiel",
        gameDescription:
          "Begleiten Sie uns auf einem spannenden Point-and-Click-Abenteuer durch eine magische Welt voller Herausforderungen und Geheimnissen.",
        male: "Männlich",
        errorMessage:
          "Bitte geben Sie Ihren Namen ein, bevor Sie das Spiel starten.",
        welcomeMessage:
          "Du stehst jetzt vor deinem Haus, {playerName}. Viel Erfolg bei deinem Abenteuer!",
        letterGreeting: "Sei gegrüßt Abenteurer,",
        letterContent: `Unsere Gemeinschaft schwebt in Gefahr, und ich suche deine Hilfe in einer äußerst dringlichen Angelegenheit. Seit Generationen terrorisiert ein Drache unser Dorf und hortet einen Schatz, der allen rechtmäßig gehört. Ich habe die Wegbeschreibung auf dem Umschlag skizziert, die zum Wohnsitz eines älteren Herrn führt, den du treffen musst. Er besitzt das Wissen, das du benötigst, um den Drachen zu besiegen und den Schatz zurückzuerobern.

        Doch wichtiger als der Schatz selbst ist die Wiederherstellung von Frieden und Gerechtigkeit in unserem Land. Der alte Mann wird dich auf deiner Reise leiten und dir sagen, wohin du gehen musst. Der Weg vor dir ist tückisch und voller Gefahren, aber ich glaube, dass du das Herz und den Mut hast, dich auf dieses Abenteuer einzulassen.
        
        Das Schicksal unserer Gemeinschaft liegt in deinen Händen, Abenteurer. Mögen die Götter dich auf deiner Reise führen.`,
        letterSignature: "Hochachtungsvoll,",
        letterSender: "Ein anonymer Absender",
        openTrashcan: "Mülleimer öffnen",
        lookIntoTrashcan: "In den Mülleimer schauen",
        closeTrashcan: "Mülleimer schließen",
        takeMirror: "Spiegel nehmen",
        putMirrorBack: "Spiegel zurücklegen",
        takeEnvelope: "Brief nehmen",
        openEnvelope: "Briefumschlag öffnen",
        clickEnvelope: "Ich frage mich, was im Umschlag ist...",
        takeEnvelopeToInventory:
          "Ich sollte den Umschlag wahrscheinlich öffnen...",
        openLetter:
          "Dieser Brief enthält eine ernste Botschaft... Ich muss mich auf diese Mission begeben, um dem Dorf zu helfen.",
        trashcanEmptyMessage: "Ich habe nichts zum Wegwerfen.",
        trashcanOpenMessage: "Es stinkt...",
        lookIntoTrashcanMessage: "Es ist ein Spiegel, er sieht nett aus.",
        mirrorTakenMessage: "Dieser Spiegel könnte später nützlich sein.",
        putMirrorBackMessage:
          "Vielleicht hätte ich den Spiegel nehmen sollen...",
        nothingElseInTrashcanMessage: "Es gibt nichts mehr von Nutzen darin...",
        trashcanClosedMessage: "Das ist besser...",
        goToOldMansHouse: "Gehe zum Haus des alten Mannes",
        mirrorMessage: "Ich sehe mein Spiegelbild darin...",
        houseCloseMessage:
          "Das Haus des alten Mannes sollte ganz in der Nähe sein.",
        pickUpCarrot: "Karotte aufheben",
        carrotMessage: "Das ist eine Karotte!",
        goFurther: "Weiter gehen",
        goBackHome: "Nach Hause gehen",
        underDevelopment: "In Entwicklung",
      },
    };
    this.textManager = new TextManager(
      this.translations,
      this.currentLanguage,

    );
    this.updateTexts();
  }

  changeLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('gameLanguage', language); 
    this.textManager.setCurrentLanguage(language);
    this.updateTexts();
    this.audioManager.setVolumeLabel(
      this.translations[this.currentLanguage]["volume"]
    );
    this.textManager.updatePickUpCarrotText();
    this.textManager.updateGoFurtherButtonText();
    this.textManager.updateGoBackHomeButtonText();

  }

  updateTexts() {
    this.textManager.updateAllTexts();
    this.setOptionsButtonText();
    this.audioManager.setVolumeLabel(
      this.translations[this.currentLanguage]["volume"]
    );
  }

  setOptionsButtonText() {
    const optionsButton = document.getElementById("optionsButton");
    if (this.currentLanguage === "de") {
      optionsButton.textContent = "Optionen";
    } else {
      optionsButton.textContent = "Options";
    }
  }

  setCurrentLanguage(lang) {
    LanguageManager.currentLanguage = lang;
  }

  getCurrentLanguage() {
    return LanguageManager.currentLanguage;
  }
}
