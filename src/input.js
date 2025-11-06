export class InputHandler {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0 };

    // Funzione di callback opzionale (es. per il lancio)

    // 🔹 Eventi tastiera
    window.addEventListener('keydown', e => {
      const key = e.key.toLowerCase();
      this.keys[key] = true;

      // Se preme SPACE → emetti evento "launch"
      if (e.code === 'Space' && typeof this.onLaunch === 'function') {
        this.onLaunch();
      }
    });

    window.addEventListener('keyup', e => {
      const key = e.key.toLowerCase();
      this.keys[key] = false;
    });

    // 🔹 Mouse movimento normalizzato
    window.addEventListener('mousemove', e => {
      this.mouse.x = (e.clientX / innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    });
  }
}
