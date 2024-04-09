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
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(16).mind?v=1710790349162",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.castShadow = false;
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const startButton = document.getElementById("startButton");
    startButton.style.display = "none";

    // Load models
    const modelUrls = [
      "https://cdn.glitch.global/1a0292cf-4e80-4980-999f-90f2d2255db8/1GINfix_v2.glb?v=1712645586228",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITAfix_v1.glb?v=1710854797901",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/3COCAfix_v1.glb?v=1710854800707",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/4PALOMAfix_v1.glb?v=1710854798650",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITOfix_v1.glb?v=1710854801050",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/6VODKAfix_v1.glb?v=1710854799817",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/7SANGRIAfix_v1.glb?v=1710854800226",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/8TINTOfix_v1.glb?v=1710854799462",
    ];

    models = await Promise.all(modelUrls.map(async (url) => await loadGLTF(url))); // Definir la variable models

    // Add anchors and models
    const anchors = models.map((model, index) => {
      const anchor = mindarThree.addAnchor(index);
      anchor.group.add(model.scene);
      
      // Establecer la misma escala y posición para todos los modelos
      model.scene.scale.set(0.3, 0.3, 0.3);
      model.scene.position.set(0, -0.5, 0);

      anchor.onTargetFound = () => {
        mixers[index] = new THREE.AnimationMixer(model.scene);
        const action = mixers[index].clipAction(model.animations[0]);
        action.play();
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
      };

      anchor.onTargetLost = () => {
        if (mixers[index]) mixers[index].stopAllAction();
      };

      return anchor;
    });

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

    // Rotar los modelos solo en el eje Y
    models.forEach((model) => {
      model.scene.rotation.y -= deltaY * 0.03; // Ajusta la sensibilidad según sea necesario
    });

    // Actualizar las coordenadas de inicio del toque
    touchStartY = touchEndY;
  });
});
