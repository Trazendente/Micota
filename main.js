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
        "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/target-cr-opcion4.mind?v=1702930452080",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, scene, camera } = mindarThree;
    // Configuración de la cámara
    camera.near = 0.01; // Ajusta según sea necesario
    camera.far = 5000; // Ajusta según sea necesario

    // Configuración del audio
    const audioClipPromise = loadAudio(
      "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/audio_fix_cre_v3_high.mp3?v=1703001585354"
    );
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audio = new THREE.Audio(listener); // Utiliza THREE.Audio en lugar de THREE.PositionalAudio

    audioClipPromise.then((audioClip) => {
      audio.setBuffer(audioClip);
      // Volumen
      audio.setVolume(1.0);
    });
    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    // Oculta o elimina el botón y el texto después de iniciar
    startButton.style.display = "none";
    infoText.style.display = "none";

    const firstVideoData = {
      url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Pared-v2_MAIN.mp4?v=1703002526892",
      position: new THREE.Vector3(0, 0.23, -0.1),
      scale: 1.0, // Ajusta la escala según sea necesario
      rotation: new THREE.Euler(0, 0, 0), // Ajusta la rotación según sea necesario
    };

    const firstVideoTexture = await loadVideo(firstVideoData.url);
    const firstVideo = firstVideoTexture.image;

    const firstGeometry = new THREE.PlaneGeometry(1, 1);
    const firstMaterial = createChromaMaterial(
      firstVideoTexture,
      0x14ff09,
      0.4,
      0.2
    );
    firstMaterial.side = THREE.DoubleSide;

    const firstPlane = new THREE.Mesh(firstGeometry, firstMaterial);
    firstPlane.renderOrder = 1; // Ajusta el orden de representación
    firstPlane.rotation.x = firstVideoData.rotation.x;
    firstPlane.position.copy(firstVideoData.position);
    firstPlane.scale.multiplyScalar(firstVideoData.scale);

    const firstAnchor = mindarThree.addAnchor(0);
    firstAnchor.group.add(firstPlane);
    //firstAnchor.group.add(audio);

    firstAnchor.onTargetFound = () => {
      firstVideo.play();
      audio.play();
    };

    firstAnchor.onTargetLost = () => {
      firstVideo.pause();
      audio.pause();
    };

    const videosData = [
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2000-MAIN_V3.mp4?v=1703184989844",
        position: new THREE.Vector3(0, 0, 0),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2001-MAIN_V3.mp4?v=1703184989515",
        position: new THREE.Vector3(0, 0, 0.1),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2002-MAIN_V3.mp4?v=1703184988800",
        position: new THREE.Vector3(0, 0, 0.2),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2003-MAIN_V3.mp4?v=1703184991402",
        position: new THREE.Vector3(0, 0, 0.3),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2004-MAIN_V3.mp4?v=1703184990979",
        position: new THREE.Vector3(0, 0, 0.4),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2005-MAIN_V3.mp4?v=1703184990617",
        position: new THREE.Vector3(0, 0, 0.5),
      },
    ];

    const newVideoUrl =
      "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Piso-V1-MAINv2.mp4?v=1702499962115";
    const newVideoPosition = new THREE.Vector3(0, -0.26, 0.3);
    const newVideoTexture = await loadVideo(newVideoUrl);
    const newVideo = newVideoTexture.image;

    const newGeometry = new THREE.PlaneGeometry(1231 / 514, 1);
    const newMaterial = createChromaMaterial(
      newVideoTexture,
      0x14ff09,
      0.4,
      0.2
    );
    newMaterial.side = THREE.DoubleSide;
    newMaterial.transparent = true; // Asegura que el material sea transparente

    const newPlane = new THREE.Mesh(newGeometry, newMaterial);
    newPlane.renderOrder = 2; // Ajusta el orden de representación

    newPlane.rotation.x = Math.PI / 2;
    newPlane.position.copy(newVideoPosition);
    newPlane.scale.set(0.43, 0.8, 1);
    //newPlane.scale.multiplyScalar(0.8);

    const newAnchor = mindarThree.addAnchor(0);
    newAnchor.group.add(newPlane);
    newAnchor.group.add(audio);

    newAnchor.onTargetFound = () => {
      newVideo.play();
      // audio.play();
    };

    newAnchor.onTargetLost = () => {
      newVideo.pause();
      // audio.pause();
    };

    const videos = await Promise.all(
      videosData.map(async (videoData) => {
        const videoTexture = await loadVideo(videoData.url);
        const video = videoTexture.image;

        const geometry = new THREE.PlaneGeometry(1231 / 514, 1);
        const material = createChromaMaterial(videoTexture, 0x14ff09, 0.4, 0.2);
        material.side = THREE.DoubleSide;
        material.transparent = true; // Asegura que el material sea transparente

        const plane = new THREE.Mesh(geometry, material);
        plane.renderOrder = 3; // Ajusta el orden de representación
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
