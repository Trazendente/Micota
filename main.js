import { loadGLTF, loadTextures } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;
  let mixer1, action1, mixer2, action2, mixer3, action3, mixer4, action4, mixer5, action5;

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(2).mind?v=1710437825729",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.castShadow = true;
    pointLight.position.y = 10;
    pointLight.position.z = 10;
    scene.add(pointLight);

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    // Modelos GLB
    const Portada1Model = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GIN_anim_V1.glb?v=1710253081220"
    );
    Portada1Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada1Model.scene.position.set(0, -0.5, 0);

    const Portada2Model = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITA_anim_V5.glb?v=1710348085755"
    );

    Portada2Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada2Model.scene.position.set(0, -0.5, 0);
   

    const Model3 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/3RONCOLA_anim_V6.glb?v=1710356395844"
    );
    Model3.scene.scale.set(0.3, 0.3, 0.3);
    Model3.scene.position.set(0, -0.5, 0);

    const Model4 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/4PALOMA_anim_V1.glb?v=1710435750120"
    );
    Model4.scene.scale.set(0.3, 0.3, 0.3);
    Model4.scene.position.set(0, -0.5, 0);

    const Model5 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITO_anim_V2.glb?v=1710361609255"
    );
    Model5.scene.scale.set(0.3, 0.3, 0.3);
    Model5.scene.position.set(0, -0.5, 0);

    const Portada1Anchor = mindarThree.addAnchor(0);
    const Portada2Anchor = mindarThree.addAnchor(1);
    const Anchor3 = mindarThree.addAnchor(2);
    const Anchor4 = mindarThree.addAnchor(3);
    const Anchor5 = mindarThree.addAnchor(4);

    Portada1Anchor.group.add(Portada1Model.scene);
    Portada2Anchor.group.add(Portada2Model.scene);
    Anchor3.group.add(Model3.scene);
    Anchor4.group.add(Model4.scene);
    Anchor5.group.add(Model5.scene);

    Portada1Anchor.onTargetFound = () => {
      // Acciones al encontrar el primer objetivo
    };

    Portada2Anchor.onTargetFound = () => {
      // Acciones al encontrar el segundo objetivo
    };

    Anchor3.onTargetFound = () => {
      // Acciones al encontrar el tercer objetivo
    };

    Anchor4.onTargetFound = () => {
      // Acciones al encontrar el cuarto objetivo
    };

    Anchor5.onTargetFound = () => {
      // Acciones al encontrar el quinto objetivo
    };

    Portada1Anchor.onTargetLost = () => {
      // Acciones al perder el primer objetivo
    };

    Portada2Anchor.onTargetLost = () => {
      // Acciones al perder el segundo objetivo
    };

    Anchor3.onTargetLost = () => {
      // Acciones al perder el tercer objetivo
    };

    Anchor4.onTargetLost = () => {
      // Acciones al perder el cuarto objetivo
    };

    Anchor5.onTargetLost = () => {
      // Acciones al perder el quinto objetivo
    };

    await mindarThree.start();

    mixer1 = new THREE.AnimationMixer(Portada1Model.scene);
    action1 = mixer1.clipAction(Portada1Model.animations[0]);
    action1.play();

    mixer2 = new THREE.AnimationMixer(Portada2Model.scene);
    action2 = mixer2.clipAction(Portada2Model.animations[0]);
    action2.play();

    mixer3 = new THREE.AnimationMixer(Model3.scene);
    action3 = mixer3.clipAction(Model3.animations[0]);
    action3.play();

    mixer4 = new THREE.AnimationMixer(Model4.scene);
    action4 = mixer4.clipAction(Model4.animations[0]);
    action4.play();

    mixer5 = new THREE.AnimationMixer(Model5.scene);
    action5 = mixer5.clipAction(Model5.animations[0]);
    action5.play();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer1.update(delta);
      mixer2.update(delta);
      mixer3.update(delta);
      mixer4.update(delta);
      mixer5.update(delta);
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

  const infoText = document.createElement("p");
  infoText.id = "infoText";
  infoText.style.fontFamily = "Segoe, sans-serif";

  document.body.appendChild(infoText);
});
