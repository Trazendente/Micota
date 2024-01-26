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

    const audioClipPromisePrimero = loadAudio("https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/1.Documentary%20Piano%20Loop_1.mp3?v=1706202845698");
    const audioClipPromiseSegunda = loadAudio("https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/loop_bg.mp3?v=1706202898010");

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioPrimero = new THREE.Audio(listener);
    const audioSegunda = new THREE.Audio(listener);

    audioClipPromisePrimero.then((audioClip) => {
      audioPrimero.setBuffer(audioClip);
      audioPrimero.setVolume(1.0);
    });

    audioClipPromiseSegunda.then((audioClip) => {
      audioSegunda.setBuffer(audioClip);
      audioSegunda.setVolume(0.1);
    });

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    // VIDEO DE LA PARED-FONDO
    const Portada1 = {
      url: "https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/Portada1anim%20V2-MAIN.mp4?v=17062033995425",
      position: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(764 / 1002 * 1.33, 1.335, 1), // Ajusta la escala según las dimensiones originales
      rotation: new THREE.Euler(0, 0, 0),
    };

    // VIDEO DE LA SEGUNDA PORTADA
    const Portada2 = {
      url: "https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/Portada2anim%20V2-MAIN.mp4?v=1706203398665",
      position: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(764 / 1002 * 1.33, 1.335, 1),  // Ajusta la escala según las dimensiones originales
      rotation: new THREE.Euler(0, 0, 0),
    };

    const Portada1Texture = await loadVideo(Portada1.url);
    const Portada2Texture = await loadVideo(Portada2.url);

    const Portada1Video = Portada1Texture.image;
    const Portada2Video = Portada2Texture.image;

    const Portada1Geometry = new THREE.PlaneGeometry(1, 1);
    const Portada2Geometry = new THREE.PlaneGeometry(1, 1);

    const Portada1Material = new THREE.MeshBasicMaterial({ map: Portada1Texture });
    const Portada2Material = new THREE.MeshBasicMaterial({ map: Portada2Texture });

    const Portada1Plane = new THREE.Mesh(Portada1Geometry, Portada1Material);
    const Portada2Plane = new THREE.Mesh(Portada2Geometry, Portada2Material);

    Portada1Plane.rotation.x = Portada1.rotation.x;
    Portada1Plane.position.copy(Portada1.position);
    Portada1Plane.scale.copy(Portada1.scale);

    Portada2Plane.rotation.x = Portada2.rotation.x;
    Portada2Plane.position.copy(Portada2.position);
    Portada2Plane.scale.copy(Portada2.scale);

    const Portada1Anchor = mindarThree.addAnchor(0);
    const Portada2Anchor = mindarThree.addAnchor(1);

    Portada1Anchor.group.add(Portada1Plane);
    Portada2Anchor.group.add(Portada2Plane);

    Portada1Anchor.onTargetFound = () => {
      Portada1Video.play();
      audioPrimero.play();
    };

    Portada2Anchor.onTargetFound = () => {
      Portada2Video.play();
      audioSegunda.play();
    };

    Portada1Anchor.onTargetLost = () => {
      Portada1Video.pause();
      audioPrimero.pause();
    };

    Portada2Anchor.onTargetLost = () => {
      Portada2Video.pause();
      audioSegunda.pause();
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "COMENZAR";
  startButton.id = "startButton";
  startButton.style.backgroundColor = "#C9262E";
  startButton.style.color = "#FFFFFF";
  startButton.style.fontFamily = "Segoe, sans-serif";

  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const infoText = document.createElement("p");
  infoText.id = "infoText";
  infoText.style.fontFamily = "Segoe, sans-serif";

  document.body.appendChild(infoText);
});
