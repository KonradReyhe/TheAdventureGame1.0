export class AudioManager {
  constructor(
    volumeControlId = null, 
    audioElementId = null,
    musicInfoId = null,
    volumeGameId = null,
    isAutoPlay = false,
    volumeLabelId = null,
    volumeSliderId = null,
    volumeSliderHiddenByDefault = true
  ) {
    this.volumeControlId = volumeControlId;
    this.audioElementId = audioElementId;
    this.musicInfoId = musicInfoId;
    this.volumeGameId = volumeGameId;
    this.volumeSliderId = volumeSliderId;
    this.globalVolume = 0;
    this.currentVolume = 0; 

    this.audioElement = this._fetchElement(this.audioElementId);
    this.volumeControl = this._fetchElement(this.volumeControlId);
    this.volumeLabel = this._fetchElement(this.volumeLabelId);
    this.volumeSlider = this._fetchElement(this.volumeSliderId);

    if (this.volumeSlider && volumeSliderHiddenByDefault) {
      this.volumeSlider.classList.add("volume-control-hidden"); 
      this.audioElement.volume = 0; 
    }
  }

  _fetchElement(elementId) {
    return elementId ? document.getElementById(elementId) : null;
  }

  playClickSound() {
    const clickSound = this._fetchElement("mirrorSound");
    if (clickSound) {
      clickSound.volume = this.globalVolume;
      clickSound.play();
    }
  }

  toggleVolumeControl() {
    this.volumeControl.classList.toggle("volume-control-hidden");
    if (this.volumeLabel) {
      this.volumeLabel.classList.toggle("volume-control-hidden");
    }
    if (this.volumeSlider) {
      this.volumeSlider.classList.toggle("volume-control-hidden");
    }
  }

  updateVolume(volume) {
    if (
      typeof volume === "number" &&
      !isNaN(volume) &&
      volume >= 0 &&
      volume <= 1
    ) {
      this.audioElement.volume = volume;
      this.globalVolume = volume; 
      this.currentVolume = volume; 
    } else {
      console.error(
        `Invalid volume value: ${volume}. Volume should be a number between 0 and 1.`
      );
    }
  }

  playSound(soundId) {
    const soundElement = this._fetchElement(soundId);
    if (soundElement) {
      soundElement.volume = this.globalVolume;

      
      let playPromise = soundElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.error("Audio play error:", error));
      }
    } else {
      console.error(`No element found with ID: ${soundId}`);
    }
  }

  changeAudioSource(source) {
    this.audioElement.src = source;
    this.audioElement.load();
    this.audioElement.play();
  }

  setupVolumeControl() {
    if (!this.volumeSlider) {
      console.error(`Element with id "${this.volumeSliderId}" not found.`);
      return;
    }

    const musicInfo = this._fetchElement(this.musicInfoId);
    musicInfo.classList.add("bottom-left");

    this.volumeSlider.addEventListener("input", () => {
      
      const volume = Number(this.volumeSlider.value) / 100;
      this.updateVolume(volume);

      if (volume > 0) {
        this.audioElement.play();
        musicInfo.style.display = "block";
      } else {
        this.audioElement.pause();
        musicInfo.style.display = "none";
      }

      
      const volumeGame = this._fetchElement(this.volumeGameId);
      if (volumeGame) {
        volumeGame.value = this.volumeSlider.value;
      }
    });

    const initialVolume = this.volumeSlider.value
      ? Number(this.volumeSlider.value) / 100
      : 0;
    this.updateVolume(initialVolume);
    if (initialVolume > 0) {
      this.audioElement.play();
    }
    return initialVolume;
  }

  setVolumeLabel(label) {
    if (this.volumeLabel) {
      this.volumeLabel.textContent = label;
    }
  }

  playPickUpSound() {
    const pickupSound = this._fetchElement("clickSound");
    if (pickupSound) {
      pickupSound.volume = this.globalVolume;
      pickupSound.play();
    }
  }

  setAudioSourceAndPlay(soundId, source) {
    const soundElement = this._fetchElement(soundId);
    if (soundElement) {
      soundElement.src = source;
      soundElement.load();
      soundElement.volume = this.globalVolume; 
      soundElement.play();
    }
  }

  playForestFootstepsSound() {
    const forestFootstepsSound = this._fetchElement("forestFootstepsSound");
    if (forestFootstepsSound) {
      forestFootstepsSound.volume = this.globalVolume;
      forestFootstepsSound.play();
    }
  }

  stopForestFootstepsSound() {
    const forestFootstepsSound = this._fetchElement("forestFootstepsSound");
    if (forestFootstepsSound) {
      forestFootstepsSound.pause();
      forestFootstepsSound.currentTime = 0;
    }
  }
}
