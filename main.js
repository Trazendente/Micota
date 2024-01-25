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
      imageTargetSrc: "https://cdn.glitch.global/ffc5cd79-eafc-4d77-9023-e1e60c9cc79f/targets.mind?v=1706201047098",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, scene, camera } = mindarThree;
    camera.near = 0.01;
    camera.far = 5000;

    const audioClipPromise = loadAudio("https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/audio_fix_cre_V5_1.mp3?v=1704495193474");
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audio = new THREE.Audio(listener);

    audioClipPromise.then((audioClip) => {
      audio.setBuffer(audioClip);
      audio.setVolume(1.0);
    });

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    // VIDEO DE LA PARED-FONDO
    const paredVideoData = {
      url: "https://cdn.glitch.global/ffc5cd79-eafc-4d77-9023-e1e60c9cc79f/Portada1anim%20V1-MAIN.mp4?v=1706201030385",
      position: new THREE.Vector3(0, 0.365, -0.1),
      scale: 1.25,
      rotation: new THREE.Euler(0, 0, 0),
    };

    const paredVideoTexture = await loadVideo(paredVideoData.url);
    const paredVideo = paredVideoTexture.image;

    const paredGeometry = new THREE.PlaneGeometry(1, 1);
    const paredMaterial = createChromaMaterial(paredVideoTexture, 0x14ff09, 0.4, 0.2);
    paredMaterial.side = THREE.DoubleSide;

    const paredPlane = new THREE.Mesh(paredGeometry, paredMaterial);
    paredPlane.renderOrder = 1;
    paredPlane.rotation.x = paredVideoData.rotation.x;
    paredPlane.position.copy(paredVideoData.position);
    paredPlane.scale.multiplyScalar(paredVideoData.scale);

    const paredAnchor = mindarThree.addAnchor(0);
    paredAnchor.group.add(paredPlane);

    paredAnchor.onTargetFound = () => {
      paredVideo.play();
      audio.play();
    };

    paredAnchor.onTargetLost = () => {
      paredVideo.pause();
      audio.pause();
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "Empezar AR";
  startButton.id = "startButton";
  startButton.style.backgroundColor = "#CB4A5A";
  startButton.style.color = "#FFFFFF";
  startButton.style.fontFamily = "Segoe, sans-serif";

  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const infoText = document.createElement("p");
  infoText.id = "infoText";
  infoText.style.fontFamily = "Segoe, sans-serif";

  document.body.appendChild(infoText);
});
