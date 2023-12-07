export const mockWithVideo = (path) => {
  navigator.mediaDevices.getUserMedia = async () => {
    return new Promise(async (resolve, reject) => {
      const video = document.createElement("video");
      video.setAttribute('loop', '');
      video.setAttribute("src", path);

      const startButton = document.createElement("button");
      startButton.innerHTML = "Start";
      startButton.style.position = 'fixed';
      startButton.style.zIndex = 10000;
      document.body.appendChild(startButton);

      const playVideo = async () => {
        try {
          const stream = video.captureStream();
          await video.play();
          document.body.removeChild(startButton);
          resolve(stream);
        } catch (error) {
          reject(error);
        }
      };

      // Agregar evento de clic al botón para iniciar la reproducción
      startButton.addEventListener('click', playVideo);

      // Opcional: Agregar evento de clic en cualquier lugar de la página para iniciar la reproducción
      document.body.addEventListener('click', playVideo);

      // Opcional: Pausar el video al principio
      video.pause();

      // Cargar el video después de la interacción del usuario
      await video.load();
    });
  };
};