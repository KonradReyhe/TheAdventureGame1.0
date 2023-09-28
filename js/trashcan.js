
import {
  displayInteractiveMenu,
  removeInteractiveMenu,
} from "./InteractiveMenu.js";
import { Interactable, Item } from "./Interactables.js";

import { animateBeetle } from "./AnimationManager.js";

export class TrashCan {
  constructor() {
    this.mirrorTaken = false;
    this.isOpen = false; 
  }

  setMirrorTaken(value) {
    this.mirrorTaken = value;
  }

  isMirrorTaken() {
    return this.mirrorTaken;
  }

  setOpen(value) {
    this.isOpen = value; 
  }

  isOpened() {
    return this.isOpen; 
  }
}

export function setupTrashcanClosedInteraction(
  inventory,
  languageManager,
  audioManager
) {
  const trashcanClosed = new Interactable(
    "Interactables/TrashcanClosed.png",
    0,
    0,
    10,
    25
  );

  trashcanClosed.addToScene(document.getElementById("gameScene"));

  const trashcanClosedElement = document.querySelector(
    'img[src="Interactables/TrashcanClosed.png"]'
  );
  trashcanClosedElement.style.right = "0";
  trashcanClosedElement.style.left = "unset";
  trashcanClosedElement.style.bottom = "-1%";
  trashcanClosedElement.style.top = "unset";

  let trashcanMenuVisible = false;

  trashcanClosedElement.addEventListener("click", (event) => {
    animateBeetle();
    const textWindow = document.getElementById("textWindow");
    if (textWindow) {
      textWindow.textContent =
        languageManager.textManager.translations[
          languageManager.currentLanguage
        ].trashcanEmptyMessage;
    }

    const menuOptions = [
      {
        text: languageManager.textManager.translations[
          languageManager.currentLanguage
        ].openTrashcan,
        onClick: () => {
          const trashcanClosedElement = document.querySelector(
            'img[src="Interactables/TrashcanClosed.png"]'
          );

          if (trashcanClosedElement) {
            trashcanClosedElement.remove();
            setupTrashcanOpenInteraction(
              inventory,
              languageManager,
              audioManager
            );
          }

          inventory.trashCan.setOpen(true);

          const menu = document.querySelector(".interactive-menu");
          removeInteractiveMenu(menu);
          trashcanMenuVisible = false;

          const textWindow = document.getElementById("textWindow");
          if (textWindow) {
            textWindow.textContent =
              languageManager.textManager.translations[
                languageManager.currentLanguage
              ].trashcanOpenMessage;
          }
          inventory.trashCan.setOpen(true);
        },
      },
    ];

    const menu = document.querySelector(".interactive-menu");

    if (!trashcanMenuVisible) {
      if (menu) {
        removeInteractiveMenu(menu);
      }

      displayInteractiveMenu(menuOptions, event.clientX, event.clientY);

      trashcanMenuVisible = true;
    } else {
      removeInteractiveMenu(menu);
      trashcanMenuVisible = false;
    }
  });
}

export function setupTrashcanOpenInteraction(
  inventory,
  languageManager,
  audioManager
) {
  const trashcanOpen = new Interactable(
    "Interactables/TrashcanOpen.png",
    0,
    0,
    13,
    23
  );

  trashcanOpen.addToScene(document.getElementById("gameScene"));

  const trashcanOpenElement = document.querySelector(
    'img[src="Interactables/TrashcanOpen.png"]'
  );
  trashcanOpenElement.style.right = "0";
  trashcanOpenElement.style.left = "unset";
  trashcanOpenElement.style.bottom = "-1%";
  trashcanOpenElement.style.top = "unset";

  let trashcanOpenMenuVisible = false;

  trashcanOpenElement.addEventListener("click", (event) => {
    animateBeetle();
    const menuOptions = [
      {
        text: languageManager.textManager.translations[
          languageManager.currentLanguage
        ].lookIntoTrashcan,

        onClick: () => {
          const textWindow = document.getElementById("textWindow");

          if (inventory.trashCan.isMirrorTaken()) {
            if (textWindow) {
              textWindow.textContent =
                languageManager.textManager.translations[
                  languageManager.currentLanguage
                ].nothingElseInTrashcanMessage;
            }
          } else {
            if (textWindow) {
              textWindow.textContent =
                languageManager.textManager.translations[
                  languageManager.currentLanguage
                ].lookIntoTrashcanMessage;
            }

            displayMirror(
              inventory,
              event.clientX,
              event.clientY,
              languageManager,
              audioManager
            );
          }

          inventory.trashCan.setOpen(false);

          const menu = document.querySelector(".interactive-menu");
          removeInteractiveMenu(menu);
          trashcanOpenMenuVisible = false;
        },
      },
      {
        text: languageManager.textManager.translations[
          languageManager.currentLanguage
        ].closeTrashcan,
        onClick: () => {
          const trashcanOpenElement = document.querySelector(
            'img[src="Interactables/TrashcanOpen.png"]'
          );

          if (trashcanOpenElement) {
            trashcanOpenElement.remove();
            setupTrashcanClosedInteraction(
              inventory,
              languageManager,
              audioManager
            );
          }

          const menu = document.querySelector(".interactive-menu");
          removeInteractiveMenu(menu);
          trashcanOpenMenuVisible = false;

          const textWindow = document.getElementById("textWindow");
          if (textWindow) {
            textWindow.textContent =
              languageManager.textManager.translations[
                languageManager.currentLanguage
              ].trashcanClosedMessage;
          }
          inventory.trashCan.setOpen(false);
        },
      },
    ];

    const menu = document.querySelector(".interactive-menu");

    if (!trashcanOpenMenuVisible) {
      if (menu) {
        removeInteractiveMenu(menu);
      }

      displayInteractiveMenu(menuOptions, event.clientX, event.clientY);

      trashcanOpenMenuVisible = true;
    } else {
      removeInteractiveMenu(menu);
      trashcanOpenMenuVisible = false;
    }
  });
}

export function displayMirror(
  inventory,
  clientX,
  clientY,
  languageManager,
  audioManager
) {
  if (inventory.trashCan.isMirrorTaken()) {
    return;
  }

  const mirror = new Item("Items/Mirror.png", 0, 0, 5, 10);
  mirror.addToScene(document.getElementById("gameScene"));

  const mirrorElement = document.querySelector('img[src="Items/Mirror.png"]');
  mirrorElement.style.right = "0";
  mirrorElement.style.left = "unset";
  mirrorElement.style.bottom = "30%";
  mirrorElement.style.top = "unset";

  const menuOptions = [
    {
      text: languageManager.textManager.translations[
        languageManager.currentLanguage
      ].takeMirror,
      onClick: () => {
        inventory.trashCan.setMirrorTaken(true);
        audioManager.playClickSound();
        inventory.addItemToInventory({
          id: 2,
          name: { en: "Mirror", de: "Spiegel" },
          image: "Items/Mirror.png",
          clickAction: () => {
            const textWindow = document.getElementById("textWindow");
            if (textWindow) {
              textWindow.textContent =
                languageManager.textManager.translations[
                  languageManager.currentLanguage
                ].mirrorMessage;
            }
          },
        });

        const textWindow = document.getElementById("textWindow");
        if (textWindow) {
          textWindow.textContent =
            languageManager.textManager.translations[
              languageManager.currentLanguage
            ].mirrorTakenMessage;
        }

        mirrorElement.remove();
        removeInteractiveMenu(document.querySelector(".interactive-menu"));
      },
    },
    {
      text: languageManager.textManager.translations[
        languageManager.currentLanguage
      ].putMirrorBack,
      onClick: () => {
        inventory.trashCan.setMirrorTaken(false);

        const textWindow = document.getElementById("textWindow");
        if (textWindow) {
          textWindow.textContent =
            languageManager.textManager.translations[
              languageManager.currentLanguage
            ].putMirrorBackMessage;
        }

        mirrorElement.remove();
        removeInteractiveMenu(document.querySelector(".interactive-menu"));
      },
    },
  ];

  displayInteractiveMenu(menuOptions, clientX, clientY);
}
