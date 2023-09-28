import {
  displayInteractiveMenu,
  removeInteractiveMenu,
} from "./InteractiveMenu.js";
import { AudioManager } from "./AudioManager.js";
import { gameSceneAudioManager } from "../main.js";

export function setupEnvelopeInteraction(character, inventory) {
  const envelopeElement = document.querySelector(
    'img[src="Items/envelope.png"]'
  );
  envelopeElement.addEventListener("click", (event) => {
    addEnvelopeToInventory(event, envelopeElement, inventory);
  });
}

function addEnvelopeToInventory(event, envelopeElement, inventory) {
  const menuOptions = [
    {
      text:
        inventory.textManager.translations[inventory.language].takeEnvelope ||
        "Take envelope",
      onClick: () => {
        const menu = document.querySelector(".interactive-menu");
        removeInteractiveMenu(menu);
        envelopeElement.remove();

        inventory.addItemToInventory({
          id: 3,
          name: { en: "Envelope", de: "Briefumschlag" },
          image: "Items/envelope.png",
          clickAction: (event) => {
            inventory.openEnvelope(event, event.currentTarget);
          },
        });

        inventory.textManager.updateTextWindow(
          inventory.textManager.translations[inventory.language]
            .takeEnvelopeToInventory || "I should probably open the envelope..."
        );

        gameSceneAudioManager.playSound("envelopeSound"); 
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

  inventory.textManager.updateTextWindow(
    inventory.textManager.translations[inventory.language].clickEnvelope ||
      "I wonder what's in the envelope...?"
  );
}
