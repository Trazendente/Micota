import { loadGLTF, loadTextures } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;
  let mixer1, action1, mixer2, action2; // Definimos las variables fuera de la función start para que estén accesibles en toda la función

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/targets.mind?v=1710257025773",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    // Reducir la intensidad de la luz
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Reducir la intensidad a 1
    directionalLight.position.set(0, 100, 50);
    directionalLight.castShadow = false;
    scene.add(directionalLight);

    // Aumentar el tamaño del mapa de sombras
    directionalLight.shadow.mapSize.width = 2048; // Aumentar el tamaño del mapa de sombras
    directionalLight.shadow.mapSize.height = 2048;

    // Ajustar la posición y dirección de la luz
    directionalLight.position.set(100, 200, 100); // Cambiar la posición de la luz

    // Ajustar las propiedades de las sombras
    directionalLight.shadow.bias = -0.002; // Ajustar el bias de las sombras
    directionalLight.shadow.radius = 5; // Ajustar el radio de las sombras

    // Agregar luces ambientales adicionales si es necesario
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ajustar la intensidad según sea necesario
    scene.add(ambientLight);

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
    Portada1Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada1Model.scene.position.set(0, -0.5, 0);

    const Portada2Model = await loadGLTF(
      "https://cdn.glitch.global/b24066b4-44c1-4e97-82b5-a492cc7e9f6f/2MARGARITA_anim_V1.glb?v=1710253082050"
    );

    Portada2Model.scene.scale.set(0.3, 0.3, 0.3);
    Portada2Model.scene.position.set(0, -0.5, 0);

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

    // Crear mezcladores y reproducir acciones dentro de la función start
    mixer1 = new THREE.AnimationMixer(Portada1Model.scene);
    action1 = mixer1.clipAction(Portada1Model.animations[0]);
    action1.play();

    mixer2 = new THREE.AnimationMixer(Portada2Model.scene);
    action2 = mixer2.clipAction(Portada2Model.animations[0]);
    action2.play();

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer1.update(delta);
      mixer2.update(delta);
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "COMENZAR";
  startButton.id = "startButton";
  startButton.classList.add("circle-button"); // Agregar una clase para aplicar estilos CSS
  startButton.style.backgroundColor = "#e7357b";
  startButton.style.color = "#FFFFFF";
  startButton.style.fontFamily = "Segoe, sans-serif";

  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const infoText = document.createElement("p");
  infoText.id = "infoText";
  infoText.style.fontFamily = "Segoe, sans-serif";

  document.body.appendChild(infoText);
});
