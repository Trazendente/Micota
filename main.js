import { CSS3DObject } from "./CSS3DRenderer.js";
import { loadGLTF } from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let mixers = [];
  let experienceStarted = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let models = [];

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

    const { renderer, scene, camera } = mindarThree;

    const startButton = document.getElementById("startButton");
    startButton.style.display = "none";

    // Load models
    const modelUrls = [
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GINfix_v1.glb?v=1710854799044",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITAfix_v1.glb?v=1710854797901",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/3COCAfix_v1.glb?v=1710854800707",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/4PALOMAfix_v1.glb?v=1710854798650",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITOfix_v1.glb?v=1710854801050",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/6VODKAfix_v1.glb?v=1710854799817",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/7SANGRIAfix_v1.glb?v=1710854800226",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/8TINTOfix_v1.glb?v=1710854799462",
    ];

    models = await Promise.all(modelUrls.map(async (url) => await loadGLTF(url)));

    // Add anchors and models
    const anchors = models.map((model, index) => {
      const anchor = mindarThree.addAnchor(index);
      
      const div = document.createElement('div');
      div.appendChild(model.domElement);
      div.style.pointerEvents = 'none';
      
      anchor.group.add(div);
      anchor.group.style.transformStyle = 'preserve-3d';

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
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchmove", (event) => {
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;

    // Calcular la diferencia entre el inicio y el final del toque
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Rotar los modelos en función del movimiento del dedo
    models.forEach((model) => {
      model.scene.style.transform = `rotateY(${deltaX * 0.1}deg) rotateX(${-deltaY * 0.1}deg)`;
    });

    // Actualizar las coordenadas de inicio del toque
    touchStartX = touchEndX;
    touchStartY = touchEndY;
  });
});
