import { loadGLTF, loadTextures } from "./loader.js";
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
