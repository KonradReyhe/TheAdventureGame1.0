export class Character {
  constructor() {
    this.character = "male"; 
    this.playerName = "";
    this.walkSprites = [];
    this.currentSpriteIndex = 0;
    this.isWalking = false;
    this.walkAnimationFrameCounter = 0;
    this.walkAnimationFrameThreshold = 30;

    this.createAndPositionCharacter();
  }

  setCharacter(character, playerName = "") {
    this.character = character;
    this.playerName = playerName;
    this.loadWalkSprites();

    
    this.updateIdleSprite();
  }

  loadWalkSprites() {
    this.walkSprites = []; 
    let spriteCount = this.character === "male" ? 8 : 4; 

    for (let i = 1; i <= spriteCount; i++) {
      const img = new Image();
      img.src = `Characters/${this.character}Walk${i}.png`;
      img.onload = () => {
        img.height = 400;
      };
      this.walkSprites.push(img);
    }
  }

  createAndPositionCharacter() {
    const gameScene = document.getElementById("gameScene");

    const characterSprite = document.createElement("img");
    characterSprite.id = "characterSprite";
    characterSprite.style.position = "absolute";
    characterSprite.style.height = "400px";
    characterSprite.style.width = "auto";
    characterSprite.style.zIndex = 5;

    gameScene.appendChild(characterSprite);

    this.updateIdleSprite(); 

    characterSprite.style.left = "45%";
    characterSprite.style.bottom = "-5%";

    this.characterSprite = characterSprite;
  }

  updateIdleSprite() {
    const characterSprite = document.getElementById("characterSprite");
    if (this.character === "male") {
      characterSprite.src = "Characters/maleIdle.png";
    } else if (this.character === "female") {
      characterSprite.src = "Characters/femaleIdle.png";
    }
  }

  updateSprite() {
    const characterSprite = document.getElementById("characterSprite");
    characterSprite.src = this.walkSprites[this.currentSpriteIndex].src;
    this.currentSpriteIndex =
      (this.currentSpriteIndex + 1) % this.walkSprites.length;
  }

  walk(x, y) {
    if (this.isWalking) return;

    this.isWalking = true;

    const gameScene = document.getElementById("gameScene");
    const gameSceneRect = gameScene.getBoundingClientRect();

    const characterSprite = document.getElementById("characterSprite");
    const characterSpriteRect = characterSprite.getBoundingClientRect();
    x = Math.max(
      gameSceneRect.left,
      Math.min(x, gameSceneRect.right - characterSpriteRect.width)
    );
    y = Math.max(
      gameSceneRect.top,
      Math.min(y, gameSceneRect.bottom - characterSpriteRect.height)
    );

    const startX = characterSprite.offsetLeft;
    const startBottom = parseInt(characterSprite.style.bottom, 10);

    const steps = 150;
    const dx = (x - startX) / steps;
    let currentStep = 0;

    const angle = Math.atan2(y - characterSprite.offsetTop, x - startX);
    const isWalkingLeft = angle > Math.PI / 2 || angle < -Math.PI / 2;
    characterSprite.style.transform = isWalkingLeft ? "scaleX(-1)" : "";

    const animate = () => {
      if (currentStep < steps) {
        characterSprite.style.left = startX + currentStep * dx + "px";
        characterSprite.style.bottom = startBottom + "px";
        currentStep++;

        if (
          this.walkAnimationFrameCounter >= this.walkAnimationFrameThreshold
        ) {
          this.updateSprite();
          this.walkAnimationFrameCounter = 0;
        } else {
          this.walkAnimationFrameCounter++;
        }

        requestAnimationFrame(animate);
      } else {
        this.isWalking = false;
        this.updateIdleSprite(); 
      }
    };

    requestAnimationFrame(animate);
  }

  walkToLeft() {
    const gameScene = document.getElementById("gameScene");
    const gameSceneRect = gameScene.getBoundingClientRect();

    const x = gameSceneRect.left;
    const y = gameSceneRect.top;

    this.walk(x, y);
  }

  updatePosition(newPosition) {
    const characterSprite = document.getElementById("characterSprite");
    if (characterSprite) {
      characterSprite.style.left = newPosition.x + "px";
      characterSprite.style.bottom = newPosition.y;
    }
  }
}
