export default class SoundFX {
  constructor(file, config) {
    const throttle = (fn, delay) => {
      let lastCall = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    };

    const validateURI = (file) =>
      file ? file : console.error('Requires valid URI path for "file"');

    const validateVolume = (volume) => {
      if (volume && typeof volume === 'number' && volume > 0 && volume < 1) {
        return volume;
      } else {
        console.error('sfx "volume" must be a number between 0.0 and 1.0');
        return 1.0;
      }
    };
    const validateThrottleMs = (throttleMs) => {
      if (throttleMs && typeof throttleMs === 'number' && throttleMs > 0) {
        return throttleMs;
      } else {
        console.error('sfx "throttle" must be a number greater than zero');
        return 0;
      }
    };
    const volume = validateVolume(config && config.volume);
    const throttleMs = validateThrottleMs(config && config.throttleMs);
    const appendAudioElement = (file) => {
      // hack to force browser
      // to preload audio file

      // hash function: https://stackoverflow.com/a/8831937/11330825
      const hash = (str) => {
        var hash = 0;
        if (str.length === 0) {
          return hash;
        }
        for (var i = 0; i < str.length; i++) {
          var char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
      };
      const id = `soundfx-${hash(file)}`;
      let audioElement = document.createElement('audio');

      audioElement.id = id;
      audioElement.src = file;
      audioElement.preload = 'auto';

      document.body.appendChild(audioElement);
      return file;
    };

    this.file = appendAudioElement(validateURI(file));
    this.volume = volume;
    this.throttleMs = throttleMs;
    this.play = throttleMs > 0 ? throttle(this.play, throttleMs) : this.play;
    this.validateVolume = validateVolume;
  }

  play = () => {

    const audioElement = new Audio(this.file);
    audioElement.load();
    audioElement.addEventListener('loadeddata', () => {
      audioElement.volume = this.volume;

      const audioElementPromised = audioElement.play();

      audioElementPromised
        .then(() => {
          // autoplay started, everyting is ok
        })
        .catch((error) => {
          console.log(`Problem playing file: ${this.file}"`);
        });
    });

    return this;
  };
}
