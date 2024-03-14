import { loadGLTF, loadTextures } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;
  let mixer1, action1, mixer2, action2, mixer3, action3, mixer4, action4;

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets%20(1).mind?v=1710447146335",
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
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/1GIN_anim_V1.glb?v=1710253081220"
    );
    Model4.scene.scale.set(0.3, 0.3, 0.3);
    Model4.scene.position.set(0, -0.5, 0);

   

    const Portada1Anchor = mindarThree.addAnchor(0);
    const Portada2Anchor = mindarThree.addAnchor(1);
    const Anchor3 = mindarThree.addAnchor(2);
    const Anchor4 = mindarThree.addAnchor(3);
    const Anchor5 = mindarThree.addAnchor(4);

    Portada1Anchor.group.add(Portada1Model.scene);
    Portada2Anchor.group.add(Portada2Model.scene);
    Anchor3.group.add(Model3.scene);
    Anchor4.group.add(Model4.scene);
   

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


    await mindarThree.start();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      if (mixer1) mixer1.update(delta);
      if (mixer2) mixer2.update(delta);
      if (mixer3) mixer3.update(delta);
      if (mixer4) mixer4.update(delta);
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
