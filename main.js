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
      imageTargetSrc:
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(16).mind?v=1710790349162",
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

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    // Modelos GLB
    const Portada1Model = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/1GINfix_v1.glb?v=1710778506403"
    );
    Portada1Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada1Model.scene.position.set(0, -0.5, 0);

    const Portada2Model = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/2MARGARITAfix_v1.glb?v=1710778506778"
    );

    Portada2Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada2Model.scene.position.set(0, -0.5, 0);

    const Model3 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/3COCAfix_v1.glb?v=1710778507550"
    );
    Model3.scene.scale.set(0.3, 0.3, 0.3);
    Model3.scene.position.set(0, -0.5, 0);

    const Model4 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/4PALOMAfix_v1.glb?v=1710778507894"
    );
    Model4.scene.scale.set(0.3, 0.3, 0.3);
    Model4.scene.position.set(0, -0.5, 0);

    const Model5 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/5MOJITOfix_v1.glb?v=1710778508344"
    );
    Model5.scene.scale.set(0.3, 0.3, 0.3);
    Model5.scene.position.set(0, -0.5, 0);

    const Model6 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/6VODKAfix_v1.glb?v=1710778508728"
    );
    Model6.scene.scale.set(0.3, 0.3, 0.3);
    Model6.scene.position.set(0, -0.5, 0);

    const Model7 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/7SANGRIAfix_v1.glb?v=1710778509192"
    );
    Model7.scene.scale.set(0.3, 0.3, 0.3);
    Model7.scene.position.set(0, -0.5, 0);

    const Model8 = await loadGLTF(
      "https://cdn.glitch.global/532f8e34-feb5-4a7c-94c4-2f60eabb529e/8TINTOfix_v1.glb?v=1710778509647"
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
      mixer1 = new THREE.AnimationMixer(Portada1Model.scene);
      action1 = mixer1.clipAction(Portada1Model.animations[0]);
      action1.play();
    };

    Portada2Anchor.onTargetFound = () => {
      mixer2 = new THREE.AnimationMixer(Portada2Model.scene);
      action2 = mixer2.clipAction(Portada2Model.animations[0]);
      action2.play();
    };

    Anchor3.onTargetFound = () => {
      mixer3 = new THREE.AnimationMixer(Model3.scene);
      action3 = mixer3.clipAction(Model3.animations[0]);
      action3.play();
    };

    Anchor4.onTargetFound = () => {
      mixer4 = new THREE.AnimationMixer(Model4.scene);
      action4 = mixer4.clipAction(Model4.animations[0]);
      action4.play();
    };

    Anchor5.onTargetFound = () => {
      mixer5 = new THREE.AnimationMixer(Model5.scene);
      action5 = mixer5.clipAction(Model5.animations[0]);
      action5.play();
    };

    Anchor6.onTargetFound = () => {
      mixer6 = new THREE.AnimationMixer(Model6.scene);
      action6 = mixer6.clipAction(Model6.animations[0]);
      action6.play();
    };

    Anchor7.onTargetFound = () => {
      mixer7 = new THREE.AnimationMixer(Model7.scene);
      action7 = mixer7.clipAction(Model7.animations[0]);
      action7.play();
    };

    Anchor8.onTargetFound = () => {
      mixer8 = new THREE.AnimationMixer(Model8.scene);
      action8 = mixer8.clipAction(Model8.animations[0]);
      action8.play();
    };

    Portada1Anchor.onTargetLost = () => {
      mixer1.stopAllAction();
    };

    Portada2Anchor.onTargetLost = () => {
      mixer2.stopAllAction();
    };

    Anchor3.onTargetLost = () => {
      mixer3.stopAllAction();
    };

    Anchor4.onTargetLost = () => {
      mixer4.stopAllAction();
    };

    Anchor5.onTargetLost = () => {
      mixer5.stopAllAction();
    };

    Anchor6.onTargetLost = () => {
      mixer6.stopAllAction();
    };

    Anchor7.onTargetLost = () => {
      mixer7.stopAllAction();
    };

    Anchor8.onTargetLost = () => {
      mixer8.stopAllAction();
    };

    await mindarThree.start();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      if (mixer1) mixer1.update(delta);
      if (mixer2) mixer2.update(delta);
      if (mixer3) mixer3.update(delta);
      if (mixer4) mixer4.update(delta);
      if (mixer5) mixer5.update(delta);
      if (mixer6) mixer6.update(delta);
      if (mixer7) mixer7.update(delta);
      if (mixer8) mixer8.update(delta);
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
