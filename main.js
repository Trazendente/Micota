import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";
import { createChromaMaterial } from "./chroma-video.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
    let experienceStarted = false;
  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/target-cr.mind?v=1701976017267",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, scene, camera } = mindarThree;
    // Configuración de la cámara
  camera.near = 0.01; // Ajusta según sea necesario
  camera.far = 5000; // Ajusta según sea necesario


    // Configuración del audio
    const audioClipPromise = loadAudio(
      "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/AUDIO_CR_V1_2.mp3?v=1702306241238"
    );
    const audioClip = await audioClipPromise;
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audio = new THREE.PositionalAudio(listener);
    audio.setBuffer(audioClip);
    audio.setRefDistance(100);
    // Volumen
    audio.setVolume(9.0);

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    // Oculta o elimina el botón y el texto después de iniciar
    startButton.style.display = "none";
    infoText.style.display = "none";

    const videosData = [
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2000-MAIN.mp4?v=1702332451877",
        position: new THREE.Vector3(0, 0, 0),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2001-Main-Punto.mp4?v=1702581311594",
        position: new THREE.Vector3(0, 0, 0.1),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2002-Main-Punto.mp4?v=1702581088879",
        position: new THREE.Vector3(0, 0, 0.2),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2003-MAIN.mp4?v=1702332456514",
        position: new THREE.Vector3(0, 0, 0.3),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2004-MAIN.mp4?v=1702332457314",
        position: new THREE.Vector3(0, 0, 0.4),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2005-MAIN.mp4?v=1702332458527",
        position: new THREE.Vector3(0, 0, 0.5),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Piso-V1-MAINv2.mp4?v=1702499962115",
        position: new THREE.Vector3(0, -0.25, 0.3),
        rotation: new THREE.Euler(-Math.PI / 2, 0, Math.PI), // Rotación de 90 grados en el eje Y
        scale: new THREE.Vector3(0.5, 0.7, 0.5), // Agregar escala
      },
    ];

    const videos = await Promise.all(
      videosData.map(async (videoData) => {
        const videoTexture = await loadVideo(videoData.url);
        const video = videoTexture.image;

        const geometry = new THREE.PlaneGeometry(1, 1080 / 1080);
        const material = createChromaMaterial(videoTexture, 0x14ff09, 0.4, 0.2);
        const plane = new THREE.Mesh(geometry, material);
        
        plane.rotation.x = 0;
        plane.position.copy(videoData.position);
        plane.scale.multiplyScalar(0.5);

        if (videoData.rotation) {
          plane.rotation.copy(videoData.rotation);
        }
        if (videoData.scale) {
          plane.scale.copy(videoData.scale);
        }

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);
        anchor.group.add(audio);

        anchor.onTargetFound = () => {
          video.play();
          audio.play();
        };

        anchor.onTargetLost = () => {
          video.pause();
          audio.pause();
        };

        return { video, plane };
      })
    );

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      videos.forEach(({ video, plane }) => {});

      renderer.render(scene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "Empezar AR";
  startButton.id = "startButton";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const infoText = document.createElement("p");
  infoText.textContent = "Presiona 'Empezar AR' para comenzar";
  infoText.id = "infoText";
  document.body.appendChild(infoText);
});
