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
            { name: 'gameSound', src: '/audio/gameSound.mp3' },
            { name: 'smallChickenSound', src: '/audio/smallChickenSound.mp3' },
            { name: 'chickenSound', src: '/audio/chickenSound.mp3' },
            { name: 'walkingSound', src: 'audio/running.mp3' },
            { name: 'jumpSound', src: 'audio/jump.mp3' },
            { name: 'throwSound', src: 'audio/throw.mp3' },
            { name: 'snoring', src: '/audio/snoring.mp3' },
            { name: 'bottleSound', src: 'audio/bottle.mp3' },
            { name: 'breakingGlassSound', src: 'audio/glass.mp3' },
            { name: 'characterHurtSound', src: 'audio/pain.mp3' },
            { name: 'coinSound', src: 'audio/coinPickup.mp3' },
            { name: 'gameOverSound', src: 'audio/gameOver.mp3' },
            { name: 'winSound', src: 'audio/win.mp3' },
            { name: 'endbossFightSound', src: './audio/endboss.mp3' },
            { name: 'endbossHurt', src: './audio/endbossHurt.mp3' }         
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
     * @param {number} The volume at which to play the audio (0.0 to 1.0).
     * @public
     */
    playAudio(name, volume ) {
        const defaultVolume = 0.4
      if (!this.isMuted()){
          const audioObject = this.audios.find(audio => audio.name === name);
          if (audioObject) {
              audioObject.audio.volume = !volume ? defaultVolume  : volume;
              audioObject.audio.currentTime = 0; // Reset to the beginning
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
    pauseAllAudios(restartGame) {
        this.audios.forEach(audio => {
            if(restartGame) {
                audio.audio.pause();
            audio.audio.currentTime=0;
            }
         else {audio.audio.pause()}
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

        /**
     * Mutes or unmutes the sound.
     * @param {boolean} mute - True to mute, false to unmute.
     * @public
     */
    muteGameSound(mute) {
        const gameSound = this.audios.find(audio => audio.name === 'gameSound');
        if (gameSound && mute || this.isMuted()) {
            gameSound.audio.pause();
        }
        else {
            gameSound.audio.muted = false;
            gameSound.audio.play();
            
                }
        }


    /**
   * Starts playing the game sound.
   * @public
   */
    startGameSound() {
        const gameSound = this.audios.find(audio => audio.name === 'gameSound');
            gameSound.audio.loop = true;
            gameSound.audio.play();
            gameSound.audio.volume = 0.2
            gameSound.audio.muted = this.isMuted() ? true : false;

    }

}