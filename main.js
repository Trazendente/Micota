import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";

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
      url: "https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/portada1anim_V2-converted.mp4?v=1706203006619",
      position: new THREE.Vector3(0, 0.365, -0.1),
      scale: 1.25,
      rotation: new THREE.Euler(0, 0, 0),
    };

    const segundaVideoData = {
      url: "https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/portada2anim_V2-converted.mp4?v=1706203008331",
      position: new THREE.Vector3(0, 0, -0.1), // Adjust the position as needed
      scale: 1, // Adjust the scale as needed
      rotation: new THREE.Euler(0, 0, 0),
    };

    const paredVideoTexture = await loadVideo(paredVideoData.url);
    const segundaVideoTexture = await loadVideo(segundaVideoData.url);

    const paredVideo = paredVideoTexture.image;
    const segundaVideo = segundaVideoTexture.image;

    const paredGeometry = new THREE.PlaneGeometry(1, 1);
    const segundaGeometry = new THREE.PlaneGeometry(1, 1); // Use appropriate geometry

    const paredMaterial = new THREE.MeshBasicMaterial({ map: paredVideoTexture });
    const segundaMaterial = new THREE.MeshBasicMaterial({ map: segundaVideoTexture });

    const paredPlane = new THREE.Mesh(paredGeometry, paredMaterial);
    const segundaPlane = new THREE.Mesh(segundaGeometry, segundaMaterial);

    paredPlane.rotation.x = paredVideoData.rotation.x;
    paredPlane.position.copy(paredVideoData.position);
    paredPlane.scale.multiplyScalar(paredVideoData.scale);

    segundaPlane.rotation.x = segundaVideoData.rotation.x;
    segundaPlane.position.copy(segundaVideoData.position);
    segundaPlane.scale.multiplyScalar(segundaVideoData.scale);

    const paredAnchor = mindarThree.addAnchor(0);
    const segundaAnchor = mindarThree.addAnchor(1); // Use a different index for the second anchor

    paredAnchor.group.add(paredPlane);
    segundaAnchor.group.add(segundaPlane);

    paredAnchor.onTargetFound = () => {
      paredVideo.play();
      audio.play();
    };

    segundaAnchor.onTargetFound = () => {
      segundaVideo.play();
      audio.play(); // Adjust if you want the same audio for both videos
    };

    paredAnchor.onTargetLost = () => {
      paredVideo.pause();
      audio.pause();
    };

    segundaAnchor.onTargetLost = () => {
      segundaVideo.pause();
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
