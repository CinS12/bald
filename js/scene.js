//alert("Hello World");
//console.log("Hello World");

var renderer;
var scene;
var camera;
var stopObject=false;
var canStop = false;
var invisible = false;
var lvl = 1;
var start = false;
var died = false;
var lives = 3;

function createEarthMaterial(){
	var earthTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/earthmap2k.jpg', function(image){
		earthTexture.image = image;
		earthTexture.needsUpdate = true;
	});

	var earthMaterial = new THREE.MeshBasicMaterial();
	earthMaterial.map = earthTexture;
	return earthMaterial;
}

function createPlane(){
	var planeGeometry = new THREE.PlaneGeometry(190,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0xcccccc, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	plane.name = "plane_normal";
	scene.add(plane);
}

function createPlaneLose(){
	var planeGeometry = new THREE.PlaneGeometry(190,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0xce2121, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	plane.name = "plane_lose";
	plane.visible = false;
	scene.add(plane);
}

function createStartLine(){
	var planeGeometry = new THREE.PlaneGeometry(5,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0x2194ce, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.position.set(-10,0.05,0);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	scene.add(plane);
}

function createPlane_lvl_1(){
	var planeGeometry = new THREE.PlaneGeometry(50,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0x7bce11, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.position.set(60,0.05,0);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.name = "plane_lvl_1";
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	scene.add(plane);
}

function createPlane_lvl_2(){
	var planeGeometry = new THREE.PlaneGeometry(30,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0x3f7514, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.position.set(60,0.05,0);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.visible = false;
	plane.name = "plane_lvl_2";
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	scene.add(plane);
}

function createPlane_lvl_3(){
	var planeGeometry = new THREE.PlaneGeometry(20,50);
	var planeMaterial = new THREE.MeshBasicMaterial ({
		color: 0x152b03, side:THREE.DoubleSide
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.position.set(60,0.05,0);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.visible = false;
	plane.name = "plane_lvl_3";
	//plane.rotation.x = 90;
	//plane.position.y = 0;
	scene.add(plane);
}

function createLight(){
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(0,20,20);
	spotLight.shadow.camera.near = 20;
	spotLight.shadow.camera.far = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function createLight2(){
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10,200,20);
	spotLight.shadow.camera.near = 20;
	spotLight.shadow.camera.far = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function createBox(){
	var boxGeometry = new THREE.BoxGeometry(10,10,10); //height width depth


	//var boxMaterial = new THREE.MeshBasicMaterial({
		//color: "red"
	//});
	var boxMaterial = new THREE.MeshLambertMaterial({
		color: "red"
	});

	var box = new THREE.Mesh(boxGeometry, boxMaterial);
	var geometry = new THREE.BoxBufferGeometry( 190, 50, 100 );
	var edges = new THREE.EdgesGeometry( geometry );
	var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
	scene.add( line );
	box.castShadow= true;
	box.position.set(88, 0, 0);
	//scene.add(box);
}

function createRenderer(){
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0); //Color, transparencia
	renderer.setSize(window.innerWidth,
					window.innerHeight);
	renderer.shadowMap.enabled = true;
}

function createCamera(){
	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.1 , 1000
	);
	camera.position.x = 10;
	camera.position.y = 90;
	camera.position.z = 90;
	camera.lookAt(scene.position);
}

function checkArea(){
	var pos = scene.getObjectByName('lee').position;
	if(pos.x >= -3){
		canStop = true;
	}
}

function resetStats(){
	scene.getObjectByName('lee').position.set(-82, 0, 0);
	start = false;
	canStop = false;
	stopObject = false;
}

function checkStop(){
	//console.log(scene.getObjectByName("plane").material.color);
	if (stopObject == true && canStop==true && start==true){
		switch(lvl){
			case 1: case 2: case 3:
				var pos = scene.getObjectByName('lee').position;
				if (pos.x >= 37 && pos.x <= 90){
					lvl = lvl +1;
					start = false;
				} else {
					console.log("Fora pistes");
					scene.getObjectByName("plane_normal").visible = false;
					scene.getObjectByName("plane_lose").visible = true;
					lives = lives - 1;
					start = false;
					died = true;
				}
				break;
			case 4: case 5: case 6:
				var pos = scene.getObjectByName('lee').position;
				if (pos.x >= 45 && pos.x <= 80){
					lvl = lvl +1;
					start = false;
				} else {
					console.log("Fora pistes");
					scene.getObjectByName("plane_normal").visible = false;
					scene.getObjectByName("plane_lose").visible = true;
					lives = lives - 1;
					start = false;
					died = true;
				}
				break;
			case 7: case 8: case 9: case 10:
				var pos = scene.getObjectByName('lee').position;
				if (pos.x >= 50 && pos.x <= 75){
					lvl = lvl +1;
					start = false;
				} else {
					console.log("Fora pistes");
					scene.getObjectByName("plane_normal").visible = false;
					scene.getObjectByName("plane_lose").visible = true;
					lives = lives - 1;
					start = false;
					died = true;
				}
				break;
		}
	}
}

function checkInvisible(){
	var pos = scene.getObjectByName('lee').position;
	if(pos.x >= -3){
		scene.getObjectByName('lee').visible = false;
	}
	if (canStop && stopObject){
		scene.getObjectByName('lee').visible = true;
	}
}

function loadLee(){
	loader = new THREE.OBJLoader();
	loader.load('assets/lee/lee.obj', function(object){
		material = createLeeMaterial();
		object.traverse(function(child){
			if (child instanceof THREE.Mesh){
				child.position.set(-82, 0, 0);
				child.rotation.set(0, -80, 0);
				child.scale.set(0.5, 0.5, 0.5);
				child.material = material;
				child.receiveShadow = false;
				child.castShadow = false;
				child.name = "lee";
			}
		});
	console.log("Lee ok");
	scene.add(object);
	});
}

function createLeeMaterial(){
	var material = new THREE.MeshPhongMaterial();
	var loader = new THREE.ImageLoader();
	var leeTexture = new THREE.Texture();
	//var normalMap = new THREE.normalMap();
	//var specularMap = new THREE.specularMap();
	loader.load('assets/lee/lee_diffuse.jpg', function(image){
		leeTexture.image = image;
		leeTexture.needsUpdate = true;
	});
	loader.load('assets/lee/lee_normal_tangent.jpg', function(normalMap){
		leeTexture.normalMap = normalMap;
		leeTexture.normalScale = new THREE.Vector2(1.0, 1.0);
	});
	loader.load('assets/lee/lee_spec.jpg', function(specularMap){
		leeTexture.specularMap = specularMap;
	});
	//material.normalMap = normalMap;
	//material.specularMap = specularMap;
	material.map = leeTexture;
	return material;
}

function skyBox(){
	var mesh_sky = new THREE.SphereGeometry(150,150,150);
	var material_sky = new THREE.MeshBasicMaterial();
	material_sky.map = THREE.ImageUtils.loadTexture('assets/earth/galaxy_starfield.png');
	//material_sky.map = THREE.ImageUtils.loadTexture('assets/earth/prova1.png');
	material_sky.side = THREE.BackSide;
	var skybox = new THREE.Mesh(mesh_sky, material_sky);
	scene.add(skybox);
}

function init(){
	scene = new THREE.Scene();

	//create camera a renderer and scene content
	//createEarthMaterial();
	createRenderer();
	createCamera();
	createLight();
	createLight2();
	createBox();
	createPlane();
	createPlaneLose();
	createStartLine();
	createPlane_lvl_1();
	createPlane_lvl_2();
	createPlane_lvl_3();
	skyBox();
	loadLee();

	document.body.appendChild(renderer.domElement);
	render();
}

function render(){
	printMessage();
	updateLeePosition();
	//getLeePosition();
	checkStop();
	printLevel();
	printLives();
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

function getLeePosition(){
	if (typeof(scene.getObjectByName('lee')) == 'undefined') {
		console.log("Undefined lee;)");
	} else {
		if (start){
			var pos = scene.getObjectByName('lee').position;
			//console.log(scene.getObjectByName('lee').position);
			appendText(pos.x +' '+ pos.y +' '+ pos.z);
			//console.log(pos_ini);
		}
	}
}

function updateLeePosition(){
	if (start){
		if (typeof(scene.getObjectByName('lee')) == 'undefined') {
			console.log("Undefined lee;)");
		} else {
			if (	scene.getObjectByName('lee').position.x >= 99){
				stopObject = true;
				canStop = true;
				died = true;
			}
			checkArea();
			checkInvisible();
			if (stopObject == true && canStop ==true && died == false){

			} else {
				switch(lvl){
					case 1:
						scene.getObjectByName("plane_lvl_1").visible = true;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.3;
						break;
					case 2:
						scene.getObjectByName("plane_lvl_1").visible = true;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.5;
						break;
					case 3:
						scene.getObjectByName("plane_lvl_1").visible = true;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.7;
						break;
					case 4:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = true;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.4;
						break;
					case 5:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = true;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.6;
						break;
					case 6:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = true;
						scene.getObjectByName("plane_lvl_3").visible = false;
						scene.getObjectByName('lee').position.x += 0.8;
						break;
					case 7:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = true;
						scene.getObjectByName('lee').position.x += 0.4;
						break;
					case 8:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = true;
						scene.getObjectByName('lee').position.x += 0.6;
						break;
					case 9:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = true;
						scene.getObjectByName('lee').position.x += 0.8;
						break;
					case 10:
						scene.getObjectByName("plane_lvl_1").visible = false;
						scene.getObjectByName("plane_lvl_2").visible = false;
						scene.getObjectByName("plane_lvl_3").visible = true;
						scene.getObjectByName('lee').position.x += 1;
						break;
					case 11:
						printMessage();
				}
			}
		}
	}
}
function printMessage(){
	if (!start && lvl ==1 && !died){
		appendText("Level: "+lvl+" - Press 'u' to start");
	}
	if (!start && lvl >1 && !died){
		appendText("Level passed! Press 'u' to start level "+lvl);
	}
	if (start && !died && lvl<11){
		appendText("Press 'k' when you think bald man is over green field");
	}
	if (!start && died && lvl<11){
		appendText("Bald man died! Press 'u' to try again. Lives: "+lives);
	}
	if (lives <= 0 && died){
		appendText("GAME OVER - Press 'u' to restart game");
	}
	if (lvl >= 11){
		appendText("Well done! You win :)");
	}
}

function appendText(txt)
{   document.getElementById('message').innerHTML = txt;   }
function printLives(){
		document.getElementById('lives').innerHTML = "Lives: "+lives;
}
function printLevel(){
		if (lvl < 11){
			document.getElementById('level').innerHTML = "Level: "+lvl;
		} else {
			document.getElementById('level').innerHTML = "Level: 10";
		}
}


window.addEventListener('keydown', function(e){
	if (lives > 0){
		if(e.keyCode == 85){
			//console.log('u');
			if (!start){
				scene.getObjectByName('lee').position.set(-82, 0, 0);
				scene.getObjectByName("plane_normal").visible = true;
				scene.getObjectByName("plane_lose").visible = false;
				start = true;
				died = false;
				stopObject = false;
				canStop = false;
			}
		}
		if (typeof(scene.getObjectByName('lee')) == 'undefined') {
			console.log("Undefined lee;)");
		} else {
			var pos = scene.getObjectByName('lee').position;
			if (pos.x >= -3 && start==true){
				switch (e.keyCode){
					case 87:
						//console.log('w');
						scene.getObjectByName('lee').position.z -= 1;
						break;
					case 83:
						//console.log('s');
						scene.getObjectByName('lee').position.z += 1;
						break;
					case 65:
						//console.log('a');
						scene.getObjectByName('lee').position.x -= 1;
						break;
					case 68:
						//console.log('d');
						scene.getObjectByName('lee').position.x += 1;
						//scene.getObjectByName("lee").center();
						break;
					case 79:
						console.log('o');
						scene.getObjectByName('lee').visible = false;
						break;
					case 80:
						console.log('p');
						scene.getObjectByName('lee').visible = true;
						break;
					case 75:
						console.log('k');
						scene.getObjectByName('lee').visible = true;
						stopObject = true;
						died = false;
						break;
				}
			}
	}
} else {
	if (e.keyCode == 85){
		lives = 3;
		lvl = 1;
		died = false;
		scene.getObjectByName('lee').position.set(-82, 0, 0);
		scene.getObjectByName("plane_normal").visible = true;
		scene.getObjectByName("plane_lose").visible = false;
		scene.getObjectByName("plane_lvl_1").visible = true;
		scene.getObjectByName("plane_lvl_2").visible = false;
		scene.getObjectByName("plane_lvl_3").visible = false;
	}
}
	//console.log(scene.getObjectByName('lee').position);
});

init();
console.log("okay");
