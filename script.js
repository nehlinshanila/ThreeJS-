// alert('this is an alert');

// scene, camera and renderer

var scene = new THREE.Scene();
// where all objects and lights go

var camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //fov
  0.1, //*aspect ratio and
  1000 //near far plane
); //array camera, cube camera, orthographic camera
// perspective cam, stereo cam. perspective cam mimics human eye
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
//web gl renderer= best, css2d, css3d, svg
renderer.setClearColor("#e5e5e5"); //backhround col
renderer.setSize(window.innerWidth, window.innerHeight); //size of renderer

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// first object
// var geometry = new THREE.SphereGeometry(2, 500, 500); //1 for radius, 10, 10 for width and height
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x808080 });
// var mesh = new THREE.Mesh(geometry, material);

// moving the mesh to see texture long method
// mesh.position.x = -2;
// mesh.position.y = 2;
// mesh.position.z = -2;
// short method down

// mesh.position.set(-2,2,-2)

// mesh.rotation.set(45,0,0);
// mesh.scale.set(1,2,1);

// scene.add(mesh);


// for multiple objects
meshX =-10;
for(var i = 0; i < 15; i++){
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) *10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}

// 2nd object
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({ color: 0x808080 });
// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0,2,0)

// scene.add(mesh);


var light = new THREE.PointLight(0xffc0cb, 2, 1000);
// light.position.set(10, 0, 25);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffc0cb, 2, 1000);
light.position.set(10, 0, 25);
scene.add(light);

// so that objects dont distort while moving tab
var render = function () {
  requestAnimationFrame(render);

  //   mesh.rotation.x += 0.05;
  //   mesh.rotation.y += 0.01;
  //   mesh.scale.x -= 0.01;

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    // intersects[i].object.material.color.set(0xff0000);
    //pasting that and changing mesh to intersect
    this.tl = new TimelineMax(); //to pause animation
    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.position, 0.5, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.position,0.5,{ y: Math.PI * 0.5, ease: Expo.easeOut },"=-1.5");
  }
}

render();

// this.tl = new TimelineMax().delay(0.1);
// this.tl = new TimelineMax({ paused: true }); //to pause animation
// this.tl.to(this.mesh.scale, 1, { x: 2, ease: Expo.easeOut });
// this.tl.to(this.mesh.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
// this.tl.to(this.mesh.scale, 0.5, { x: 2, ease: Expo.easeOut });
// this.tl.to(
//   this.mesh.scale,
//   0.5,
//   { y: Math.PI * 0.5, ease: Expo.easeOut },
//   "=-1.5"
// );

// window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseMove);

// document.body.addEventListener('click', () => {
//   this.tl.play();
// });

// ctrl + alt + n to run code
//  ctrl + alt + m to stop code
