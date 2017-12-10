var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
camera.position.y = 50;
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize($(document).width(), $(document).height()/2);
document.getElementById('waves').appendChild(renderer.domElement);
var geometry = new THREE.PlaneGeometry(400, 100, 90, 30);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
var s = new SimplexNoise();
var offset = 0.005;
window.setInterval(function () {
    offset += 0.005;
}, 10);
var render = function () {
    requestAnimationFrame(render);
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i];
        v.z = s.noise2D(v.x / 40, v.y / 40 + offset) * 20;
    }
    plane.geometry.verticesNeedUpdate = true;
    plane.rotation.x = -Math.PI / 2;
    renderer.render(scene, camera);
};
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight / 3);

}

render();