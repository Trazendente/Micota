import { loadGLTF } from "./loader.js";
import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let mixers = [];
  let experienceStarted = false;
  let touchStartY = 0;
  let touchEndY = 0;
  let models = []; // Definir la variable models

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/e5e8f7de-a20d-45de-9a1f-9d2d18cd2c32/targets.mind?v=1724682790314",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.castShadow = false;
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const startButton = document.getElementById("startButton");
    startButton.style.display = "none";

    // Load a single model
    const modelUrl =
      "https://cdn.glitch.global/e5e8f7de-a20d-45de-9a1f-9d2d18cd2c32/CerebroMicotaV7.glb?v=1724703636072";
    const model = await loadGLTF(modelUrl);
    models.push(model);

    // Load the video
    const videoUrl =
      "https://cdn.glitch.global/e5e8f7de-a20d-45de-9a1f-9d2d18cd2c32/Cerebrovideo-MAIN_V2.mp4?v=1724682711670"; // Reemplaza con la URL de tu video
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.setAttribute("playsinline", "true");

    // Create a VideoTexture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    videoTexture.encoding = THREE.sRGBEncoding;
    videoTexture.needsUpdate = true;

    const videoMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      toneMapped: false, // Esto evitará que se aplique el mapeo de tono que podría estar causando el brillo adicional
    });

    // Create a plane for the video
    const scaleFactor = 0.76;
    const videoGeometry = new THREE.PlaneGeometry(
      1.34 * scaleFactor,
      0.752 * scaleFactor
    );

    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    videoMesh.position.set(0, 0, 0); // Posición del video

    // Add anchor and model
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(model.scene);
    anchor.group.add(videoMesh);

    // Establecer la escala y posición para el modelo
    model.scene.scale.set(0.3, 0.3, 0.3);
    model.scene.position.set(0, 0.5, .2);
    model.scene.rotation.set(0.5, 0, 0);

    anchor.onTargetFound = () => {
      video.play(); // Reproducir el video cuando se detecte el objetivo
      const mixer = new THREE.AnimationMixer(model.scene);
      mixers.push(mixer);
      const action = mixer.clipAction(model.animations[0]);
      action.play();
      action.setLoop(THREE.LoopRepeat); // Cambiado para que el bucle sea infinito
      action.clampWhenFinished = false; // Asegurarse de que no se detenga

      // Mostrar los botones cuando se encuentra el objetivo
      document.getElementById("button1").style.display = "block";
      document.getElementById("button2").style.display = "block";
       document.getElementById("button3").style.display = "block";
    };

    anchor.onTargetLost = () => {
      video.pause(); // Pausar el video cuando se pierda el objetivo
      if (mixers[0]) mixers[0].stopAllAction();

      // Ocultar los botones cuando se pierde el objetivo
      document.getElementById("button1").style.display = "none";
      document.getElementById("button2").style.display = "none";
       document.getElementById("button3").style.display = "none";
    };

    await mindarThree.start();

    // Animation loop
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixers.forEach((mixer) => {
        if (mixer) mixer.update(delta);
      });

      // Actualizar la textura del video en cada cuadro
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        videoTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  };

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    document.getElementById("backgroundAudio").play();
    start();
    startButton.style.display = "none"; // Ocultar el botón al hacer clic
  });

  // Detectar eventos táctiles para rotar modelos
  document.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchmove", (event) => {
    touchEndY = event.touches[0].clientY;

    // Calcular la diferencia entre el inicio y el final del toque solo en el eje Y
    const deltaY = touchEndY - touchStartY;

    // Rotar el modelo solo en el eje Y
    if (models.length > 0) {
      models[0].scene.rotation.y -= deltaY * 0.03; // Ajusta la sensibilidad según sea necesario
    }

    // Actualizar las coordenadas de inicio del toque
    touchStartY = touchEndY;
  });
});
