import { loadGLTF } from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;
  let mixers = [];
  let actions = [];

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.castShadow = false;
    pointLight.position.y = 10;
    pointLight.position.z = 10;
    scene.add(pointLight);

    const startButton = document.getElementById("startButton");
    startButton.style.display = "none";

    const models = [
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GINfix_v1.glb?v=1710854799044",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITAfix_v1.glb?v=1710854797901",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/3COCAfix_v1.glb?v=1710854800707",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/4PALOMAfix_v1.glb?v=1710854798650",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITOfix_v1.glb?v=1710854801050",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/6VODKAfix_v1.glb?v=1710854799817",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/7SANGRIAfix_v1.glb?v=1710854800226",
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/8TINTOfix_v1.glb?v=1710854799462",
    ];

    const anchors = [];

    for (let i = 0; i < models.length; i++) {
      const model = await loadGLTF(models[i]);
      model.scene.scale.set(0.3, 0.3, 0.3);
      model.scene.position.set(0, -0.5, 0);

      const anchor = mindarThree.addAnchor(i);
      anchor.group.add(model.scene);
      anchors.push(anchor);

      const mixer = new THREE.AnimationMixer(model.scene);
      const action = mixer.clipAction(model.animations[0]);
      action.play();
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      mixers.push(mixer);
      actions.push(action);

      anchor.onTargetFound = () => {
        mixers[i].update(delta);
        renderer.render(scene, camera);
        cssRenderer.render(cssScene, camera);
      };

      anchor.onTargetLost = () => {
        mixers[i].stopAllAction();
      };
    }

    await mindarThree.start();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));
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

  startButton.addEventListener("click", () => {
    document.getElementById("backgroundAudio").play();
    start();
  });
  document.body.appendChild(startButton);
});
