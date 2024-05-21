class AudioManager {
    constructor() {
      this.audios = []; 

      
      const audioList = [
        // { name: 'gameSound', src: '/audio/gameSound.mp3' },
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
  
    loadAudios(audioList) {
      audioList.forEach(audio => {
        const audioElement = new Audio(audio.src);
        this.audios.push({ name: audio.name, audio: audioElement });
      });
    }
  
    playAudio(name, volume = 0.3) {
      if (!this.isMuted()){
      const audioObject = this.audios.find(audio => audio.name === name);
        if (audioObject) {
            audioObject.audio.volume = volume; 
            audioObject.audio.play(); 
        } else {
            console.error(`Audio ${name} nicht gefunden.`);
        }
      }
    }
  
    pauseAudio(name) {
      const audioObject = this.audios.find(audio => audio.name === name);
      if (audioObject) {
        audioObject.audio.pause(); // Audio pausieren, falls gefunden
      } else {
        console.error(`Audio ${name} nicht gefunden.`);
      }
    }

    pauseAllAudios() {
      this.audios.forEach(audio => {
          audio.audio.pause();
      });
    }

    isMuted() {
      const isMuted = JSON.parse(localStorage.getItem('soundMuted'));
      return isMuted;
    }
}

  
  
  