import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/Addons.js';

const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
camera.position.z=30;
renderer.render(scene,camera);

const orbitControls=new OrbitControls(camera,renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x +=0.0005;
  torus.rotation.y +=0.0005;
  torus.rotation.z+=0.0005;
  orbitControls.update();
  renderer.render(scene,camera);
}
const moonTexture= new THREE.TextureLoader().load('moon.jpg');
const normalTexture= new THREE.TextureLoader().load('moonbumps.jpg')
const geometry= new THREE.SphereGeometry(5,32,16);
const material= new THREE.MeshStandardMaterial({
  map:moonTexture,
  normalMap:normalTexture
});
const torus=new THREE.Mesh(geometry,material);
scene.add(torus);
const pointLight= new THREE.PointLight(0xffffff);
const ambientLight= new THREE.AmbientLight(0xffffff,2);
const lightHelper=new THREE.PointLightHelper(pointLight);
const gridHelper= new THREE.GridHelper(200,50);


pointLight.position.set(8,8,8);
scene.add(pointLight,ambientLight);
/*scene.add(lightHelper,gridHelper);*/

animate();



function addStar(){
  const geometry=new THREE.SphereGeometry(0.25,24,24);
  const material= new THREE.MeshStandardMaterial({color:0xffffff});
  const star= new THREE.Mesh(geometry,material);
  //spawn the stars iin random positions
  const[x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar);

const spaceTexture= new THREE.TextureLoader().load('space.jpg');
scene.background=spaceTexture;

torus.position.z=10;
torus.position.x=-10;

function moveCamera(){
  const t= document.body.getBoundingClientRect().top;
  camera.position.z=t*(-0.01);
  camera.position.x=t*(-0.0002);
  camera.rotation.y=t*(-0.02);
  camera.rotation.z=t*(0.1);
}
document.body.onscroll=moveCamera;