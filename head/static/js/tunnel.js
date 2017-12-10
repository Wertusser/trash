var ww = document.documentElement.clientWidth || document.body.clientWidth;
var wh = window.innerHeight;
var ww2 = ww * 0.5, wh2 = wh * 0.5;

function Tunnel() {
    this.init();
    this.createMesh();
    this.handleEvents();
    window.requestAnimationFrame(this.render.bind(this));
}

Tunnel.prototype.init = function () {
    this.speed = 0.02;
    this.mouse = {
        position: new THREE.Vector2(0, 0),
        target: new THREE.Vector2(0, 0)
    };
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector("#scene")
    });
    this.renderer.setSize(ww, wh);
    this.renderer.setClearColor(0x222222);
    this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
    this.camera.position.z = 0.35;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x222222, 0.6, 2.8);
};

Tunnel.prototype.createMesh = function () {
    var points = [];
    for (var i = 0; i < 5; i += 1) {
        points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    points[4].y = -0.06;
    this.curve = new THREE.CatmullRomCurve3(points);
    var geometry = new THREE.Geometry();
    geometry.vertices = this.curve.getPoints(70);
    this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
    this.tubeMaterial = new THREE.MeshStandardMaterial({
        side: THREE.BackSide,
        map: textures.flesh.texture,
        bumpMap: textures.fleshBump.texture,
        bumpScale: 0.0003
    });
    var light = new THREE.HemisphereLight(0xffffbb, 0x887979, 0.9);
    this.scene.add(light);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(directionalLight);
    this.tubeMaterial.map.wrapS = THREE.RepeatWrapping;
    this.tubeMaterial.map.wrapT = THREE.RepeatWrapping;
    this.tubeMaterial.map.repeat.set(30, 6);
    this.tubeMaterial.bumpMap.wrapS = THREE.RepeatWrapping;
    this.tubeMaterial.bumpMap.wrapT = THREE.RepeatWrapping;
    this.tubeMaterial.bumpMap.repeat.set(30, 6);
    this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 50, false);
    this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
    this.scene.add(this.tubeMesh);
    this.tubeGeometry_o = this.tubeGeometry.clone();
};

Tunnel.prototype.handleEvents = function () {
    window.addEventListener("resize", this.onResize.bind(this), false);
    document.body.addEventListener(
        "mousemove",
        this.onMouseMove.bind(this),
        false
    );
};

Tunnel.prototype.onResize = function () {
    ww = document.documentElement.clientWidth || document.body.clientWidth;
    wh = window.innerHeight;
    ww2 = ww * 0.5;
    wh2 = wh * 0.5;
    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
};

Tunnel.prototype.onMouseMove = function (e) {
    this.mouse.target.x = (e.clientX - ww2) / ww2;
    this.mouse.target.y = (wh2 - e.clientY) / wh2;
};

Tunnel.prototype.updateCameraPosition = function () {
    this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
    this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;
    this.camera.rotation.z = this.mouse.position.x * 0.2;
    this.camera.rotation.y = Math.PI - this.mouse.position.x * 0.06;
    this.camera.position.x = this.mouse.position.x * 0.015;
    this.camera.position.y = -this.mouse.position.y * 0.015;
};

Tunnel.prototype.updateMaterialOffset = function () {
    this.tubeMaterial.map.offset.x += this.speed;
};

Tunnel.prototype.updateCurve = function () {
    var index = 0, vertice_o = null, vertice = null;
    for (var i = 0, j = this.tubeGeometry.vertices.length; i < j; i += 1) {
        vertice_o = this.tubeGeometry_o.vertices[i];
        vertice = this.tubeGeometry.vertices[i];
        index = Math.floor(i / 50);
        vertice.x +=
            (vertice_o.x + this.splineMesh.geometry.vertices[index].x - vertice.x) /
            10;
        vertice.y +=
            (vertice_o.y + this.splineMesh.geometry.vertices[index].y - vertice.y) /
            5;
    }
    this.tubeGeometry.verticesNeedUpdate = true;
    this.curve.points[2].x = -this.mouse.position.x * 0.1;
    this.curve.points[4].x = -this.mouse.position.x * 0.1;
    this.curve.points[2].y = this.mouse.position.y * 0.1;
    this.splineMesh.geometry.verticesNeedUpdate = true;
    this.splineMesh.geometry.vertices = this.curve.getPoints(70);
};

Tunnel.prototype.render = function () {
    this.updateMaterialOffset();
    this.updateCameraPosition();
    this.updateCurve();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
};


var textures = {
    "flesh": {
        url: "img/fleshPattern.jpg"
    },
    "fleshBump": {
        url: "img/fleshPatternBump.jpg"
    }
};
var loader = new THREE.TextureLoader();
loader.crossOrigin = "Anonymous";
for (var name in textures) {
    (function (name) {
        loader.load(textures[name].url, function (texture) {
            textures[name].texture = texture;
            checkTextures();
        });
    })(name)
}
var texturesLoaded = 0;

function checkTextures() {
    texturesLoaded++;
    if (texturesLoaded === Object.keys(textures).length) {
        document.body.classList.remove("loading");
        window.tunnel = new Tunnel();
    }
}
