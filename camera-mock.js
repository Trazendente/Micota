export const mockWithVideo = async (path) => {
  const response = await fetch(path);
  const blob = await response.blob();
  const videoUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.oncanplay = () => {
      const startButton = document.createElement("button");
      startButton.innerHTML = "start";
      startButton.style.position = 'fixed';
      startButton.style.zIndex = 10000;
      document.body.appendChild(startButton);

      startButton.addEventListener('click', () => {
        const stream = video.captureStream();
        video.play();
        document.body.removeChild(startButton);
        resolve(stream);
      });
    };

    video.setAttribute('loop', '');
    video.src = videoUrl;

    // Asegúrate de añadir el elemento de video al DOM
    document.body.appendChild(video);
  });
};
