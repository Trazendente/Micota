// Desarrollado por Trazendente Studio Interactivo
import { loadGLTF } from "./loader.js";
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
        "https://cdn.glitch.global/4ae5c157-47dd-4688-afdf-006929cf3c12/targets.mind?v=1720721733921",
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
    const modelUrl = "https://cdn.glitch.global/4ae5c157-47dd-4688-afdf-006929cf3c12/Rosas_V8_.glb?v=1720809237600";

    const model = await loadGLTF(modelUrl);

    // Add anchor and model
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(model.scene);
    
    // Establecer la escala y posición para el modelo
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, 0, 0);
    model.scene.rotation.set(0, 0, 0);

    anchor.onTargetFound = () => {
      const mixer = new THREE.AnimationMixer(model.scene);
      mixers.push(mixer);
      const action = mixer.clipAction(model.animations[0]);
      action.play();
      action.setLoop(THREE.LoopRepeat); // Cambiado para que el bucle sea infinito
      action.clampWhenFinished = false; // Asegurarse de que no se detenga

      // Mostrar los botones cuando se encuentra el objetivo
      document.getElementById("button1").style.display = "block";
      document.getElementById("button2").style.display = "block";
    };

    anchor.onTargetLost = () => {
      if (mixers[0]) mixers[0].stopAllAction();

      // Ocultar los botones cuando se pierde el objetivo
      document.getElementById("button1").style.display = "none";
      document.getElementById("button2").style.display = "none";
    };

    await mindarThree.start();

    // Animation loop
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixers.forEach((mixer) => {
        if (mixer) mixer.update(delta);
      });
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
