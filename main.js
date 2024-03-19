import { loadGLTF, loadTextures } from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let mixers = []; // Array para almacenar los mixers
  const start = async () => {
    if (experienceStarted) {
      return;
    }

    let experienceStarted = true; // Corrección en la declaración de la variable
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(16).mind?v=1710790349162",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.castShadow = false;
    pointLight.position.y = 10;
    pointLight.position.z = 10;
    scene.add(pointLight);

    const startButton = document.getElementById("startButton");

    startButton.style.display = "none";

    // Modelos GLB
    const coctel1 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GINfix_v1.glb?v=1710854799044"
    );
    coctel1.scene.scale.set(0.3, 0.3, 0.3);
    coctel1.scene.position.set(0, -0.5, 0);

    const coctel2 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITAfix_v1.glb?v=1710854797901"
    );

    coctel2.scene.scale.set(0.3, 0.3, 0.3);
    coctel2.scene.position.set(0, -0.5, 0);

    const coctel3 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/3COCAfix_v1.glb?v=1710854800707"
    );
    coctel3.scene.scale.set(0.3, 0.3, 0.3);
    coctel3.scene.position.set(0, -0.5, 0);

    const coctel4 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/4PALOMAfix_v1.glb?v=1710854798650"
    );
    coctel4.scene.scale.set(0.3, 0.3, 0.3);
    coctel4.scene.position.set(0, -0.5, 0);

    const coctel5 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITOfix_v1.glb?v=1710854801050"
    );
    coctel5.scene.scale.set(0.3, 0.3, 0.3);
    coctel5.scene.position.set(0, -0.5, 0);

    const coctel6 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/6VODKAfix_v1.glb?v=1710854799817"
    );
    coctel6.scene.scale.set(0.3, 0.3, 0.3);
    coctel6.scene.position.set(0, -0.5, 0);

    const coctel7 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/7SANGRIAfix_v1.glb?v=1710854800226"
    );
    coctel7.scene.scale.set(0.3, 0.3, 0.3);
    coctel7.scene.position.set(0, -0.5, 0);

    const coctel8 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/8TINTOfix_v1.glb?v=1710854799462"
    );
    coctel8.scene.scale.set(0.3, 0.3, 0.3);
    coctel8.scene.position.set(0, -0.5, 0);

    const anchors = [];
    for (let i = 0; i < 8; i++) {
      anchors[i] = mindarThree.addAnchor(i);
    }

    const models = [coctel1, coctel2, coctel3, coctel4, coctel5, coctel6, coctel7, coctel8];

    for (let i = 0; i < models.length; i++) {
      anchors[i].group.add(models[i].scene);

      anchors[i].onTargetFound = () => {
        mixers[i] = new THREE.AnimationMixer(models[i].scene);
        const action = mixers[i].clipAction(models[i].animations[0]);
        action.play();
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true; // Mantener el estado final de la animación
      };

      anchors[i].onTargetLost = () => {
        if (mixers[i]) mixers[i].stopAllAction();
      };
    }

    await mindarThree.start();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      for (const mixer of mixers) {
        if (mixer) mixer.update(delta);
      }
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "COMENZAR";
  startButton.id = "startButton";
  startButton.classList.add("circle-button");
  startButton.style.backgroundColor = "#a62424";
  startButton.style.color = "#FFFFFF";
  startButton.style.fontFamily = "Segoe, sans-serif";

  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("backgroundAudio").play();
    start();
  });
});