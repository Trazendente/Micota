import {loadGLTF, loadVideo} from "./loader.js";
import {mockWithVideo} from './camera-mock.js';
import {createChromaMaterial} from './chroma-video.js';

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      mockWithVideo("https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/course-banner1.mp4?v=1701962148008");
      
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/course-banner.mind?v=1701962173820",
      });
      const {renderer, scene, camera} = mindarThree;

      const video = await loadVideo("https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/guitar-player.mp4?v=1701962207762");
      video.pause();
      const texture = new THREE.VideoTexture(video);

      const geometry = new THREE.PlaneGeometry(1, 1080/1920);
      //const material = new THREE.MeshBasicMaterial({map: texture});
      const material = createChromaMaterial(texture, 0x00ff00);
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = Math.PI/2;
      plane.position.y = 0.7;
      plane.scale.multiplyScalar(4);

      const anchor = mindarThree.addAnchor(0);
      anchor.group.add(plane);

      anchor.onTargetFound = () => {
        video.play();
      }
      anchor.onTargetLost = () => {
        video.pause();
      }

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    } catch (error) {
      console.error("Error in start:", error);

      // Añadir más información de depuración
      console.log("Error details:", JSON.stringify(error, null, 2));

      // También puedes intentar lanzar el error nuevamente para ver si la consola proporciona más información
      throw error;
    }
  }

  // Agregar botón de inicio
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});
