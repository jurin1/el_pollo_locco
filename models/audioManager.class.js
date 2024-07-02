/**
 * @class AudioManager
 * @classdesc Manages audio playback for the game.
 */
class AudioManager {
  /**
   * Creates an instance of AudioManager.
   * Initializes the audio list and loads all audio files.
   */
  constructor() {
      /**
       * Array to store audio objects.
       * @type {Array<{name: string, audio: HTMLAudioElement}>}
       * @private
       */
      this.audios = []; 

      /**
       * List of audio files to be loaded.
       * @type {Array<{name: string, src: string}>}
       * @private
       */
      const audioList = [
          //{ name: 'gameSound', src: '/audio/gameSound.mp3' },
          { name: 'smallChickenSound', src: '/audio/smallChickenSound.mp3' },
          { name: 'chickenSound', src: '/audio/chickenSound.mp3' },
          { name: 'walking_sound', src: 'audio/running.mp3' },
          { name: 'jump_sound', src: 'audio/jump.mp3' },
          { name: 'throw_sound', src: 'audio/throw.mp3' },
          { name: 'bottle_sound', src: 'audio/bottle.mp3' },
          { name: 'breaking_glass_sound', src: 'audio/glass.mp3' },
          { name: 'hurt_sound', src: 'audio/pain.mp3' },
          { name: 'coin_sound', src: 'audio/coinPickup.mp3' },
          { name: 'gameOver_sound', src: 'audio/gameOver.mp3' },
          { name: 'win_sound', src: 'audio/win.mp3' },
          { name: 'endBossFight_sound', src: './audio/endboss.mp3' }        
      ];
  
      this.loadAudios(audioList);
  }

  /**
   * Loads audio files from the provided list.
   * @param {Array<{name: string, src: string}>} audioList - List of audio files to load.
   * @private
   */
  loadAudios(audioList) {
      audioList.forEach(audio => {
          const audioElement = new Audio(audio.src);
          this.audios.push({ name: audio.name, audio: audioElement });
      });
  }

  /**
   * Plays the specified audio.
   * @param {string} name - The name of the audio to play.
   * @param {number} [volume=0.7] - The volume at which to play the audio (0.0 to 1.0).
   * @public
   */
  playAudio(name, volume = 0.7) {
      if (!this.isMuted()){
          const audioObject = this.audios.find(audio => audio.name === name);
          if (audioObject) {
              audioObject.audio.volume = volume; 
              audioObject.audio.play(); 
          } else {
              console.error(`Audio ${name} not found.`);
          }
      }
  }

  /**
   * Pauses the specified audio.
   * @param {string} name - The name of the audio to pause.
   * @public
   */
  pauseAudio(name) {
      const audioObject = this.audios.find(audio => audio.name === name);
      if (audioObject) {
          audioObject.audio.pause();
      } else {
          console.error(`Audio ${name} not found.`);
      }
  }

  /**
   * Pauses all currently playing audio.
   * @public
   */
  pauseAllAudios() {
      this.audios.forEach(audio => {
          audio.audio.pause();
      });
  }

  /**
   * Checks if the sound is muted.
   * @returns {boolean} True if the sound is muted, false otherwise.
   * @public
   */
  isMuted() {
      const isMuted = JSON.parse(localStorage.getItem('soundMuted'));
      return isMuted;
  }
}