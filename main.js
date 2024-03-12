import { loadGLTF, loadTextures } from "./loader.js";

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
        "https://cdn.glitch.global/ffc5cd79-eafc-4d77-9023-e1e60c9cc79f/targets.mind?v=1706201047098",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, scene, camera } = mindarThree;
    camera.near = 0.01;
    camera.far = 5000;

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    // Modelos GLB
    const Portada1Model = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GIN_anim_V1.glb?v=1710253081220"
    );
    Portada1Model.scene.scale.set(1, 1, 1);
    Portada1Model.scene.position.set(0, 0, 0);

    const Portada2Model = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITA_anim_V1.glb?v=1710253082050"
    );

    const Portada1Anchor = mindarThree.addAnchor(0);
    const Portada2Anchor = mindarThree.addAnchor(1);

    Portada1Anchor.group.add(Portada1Model.scene);
    Portada2Anchor.group.add(Portada2Model.scene);

    Portada1Anchor.onTargetFound = () => {
      // Acciones al encontrar el primer objetivo
    };

    Portada2Anchor.onTargetFound = () => {
      // Acciones al encontrar el segundo objetivo
    };

    Portada1Anchor.onTargetLost = () => {
      // Acciones al perder el primer objetivo
    };

    Portada2Anchor.onTargetLost = () => {
      // Acciones al perder el segundo objetivo
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  const mixer1 = new THREE.AnimationMixer(Portada1Model.scene);
  const action1 = mixer1.clipAction(Portada1Model.animations[0]);
  action1.play();

  const mixer2 = new THREE.AnimationMixer(Portada2Model.scene);
  const action2 = mixer2.clipAction(Portada2Model.animations[0]);
  action2.play();

  const clock = new THREE.Clock();
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    mixer1.update(delta);
    mixer2.update(delta);
    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);
  });

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
