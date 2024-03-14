import { loadGLTF, loadTextures } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;
  let mixer1,
    action1,
    mixer2,
    action2,
    mixer3,
    action3,
    mixer4,
    action4,
    mixer5,
    action5,
    mixer6,
    action6,
    mixer7,
    action7,
    mixer8,
    action8;

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: [
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(5).mind?v=1710443269990",
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(6).mind?v=1710443300527",
      ],

      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.castShadow = true;
    pointLight.position.y = 10;
    pointLight.position.z = 10;
    scene.add(pointLight);

    const ambientLight2 = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight2);

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
    Portada2Model.scene.rotation.x = Math.PI;

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

    const Model6 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITO_anim_V2.glb?v=1710361609255"
    );
    Model6.scene.scale.set(0.3, 0.3, 0.3);
    Model6.scene.position.set(0, -0.5, 0);

    const Model7 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITO_anim_V2.glb?v=1710361609255"
    );
    Model7.scene.scale.set(0.3, 0.3, 0.3);
    Model7.scene.position.set(0, -0.5, 0);

    const Model8 = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/5MOJITO_anim_V2.glb?v=1710361609255"
    );
    Model8.scene.scale.set(0.3, 0.3, 0.3);
    Model8.scene.position.set(0, -0.5, 0);

    const Portada1Anchor = mindarThree.addAnchor(0);
    const Portada2Anchor = mindarThree.addAnchor(1);
    const Anchor3 = mindarThree.addAnchor(2);
    const Anchor4 = mindarThree.addAnchor(3);
    const Anchor5 = mindarThree.addAnchor(4);
    const Anchor6 = mindarThree.addAnchor(5);
    const Anchor7 = mindarThree.addAnchor(6);
    const Anchor8 = mindarThree.addAnchor(7);

    Portada1Anchor.group.add(Portada1Model.scene);
    Portada2Anchor.group.add(Portada2Model.scene);
    Anchor3.group.add(Model3.scene);
    Anchor4.group.add(Model4.scene);
    Anchor5.group.add(Model5.scene);
    Anchor6.group.add(Model6.scene);
    Anchor7.group.add(Model7.scene);
    Anchor8.group.add(Model8.scene);

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

    Anchor6.onTargetFound = () => {
      // Acciones al encontrar el sexto objetivo
    };

    Anchor7.onTargetFound = () => {
      // Acciones al encontrar el séptimo objetivo
    };

    Anchor8.onTargetFound = () => {
      // Acciones al encontrar el octavo objetivo
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

    Anchor6.onTargetLost = () => {
      // Acciones al perder el sexto objetivo
    };

    Anchor7.onTargetLost = () => {
      // Acciones al perder el séptimo objetivo
    };

    Anchor8.onTargetLost = () => {
      // Acciones al perder el octavo objetivo
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

    mixer6 = new THREE.AnimationMixer(Model6.scene);
    action6 = mixer6.clipAction(Model6.animations[0]);
    action6.play();

    mixer7 = new THREE.AnimationMixer(Model7.scene);
    action7 = mixer7.clipAction(Model7.animations[0]);
    action7.play();

    mixer8 = new THREE.AnimationMixer(Model8.scene);
    action8 = mixer8.clipAction(Model8.animations[0]);
    action8.play();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer1.update(delta);
      mixer2.update(delta);
      mixer3.update(delta);
      mixer4.update(delta);
      mixer5.update(delta);
      mixer6.update(delta);
      mixer7.update(delta);
      mixer8.update(delta);
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
