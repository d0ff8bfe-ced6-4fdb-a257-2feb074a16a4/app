<div>
    <style>
        body { margin: 0; }
        #threejs-container {
            width: 100%;
            height: 500px; /* Задайте высоту по необходимости */
        }
        canvas { display: block; }
    </style>

    <!-- Контейнер для рендеринга Three.js -->
    <div id="threejs-container"></div>

    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            let scene, camera, renderer;

            function init() {
                // Создание сцены
                scene = new THREE.Scene();

                // Установка камеры
                camera = new THREE.PerspectiveCamera(75, document.getElementById('threejs-container').clientWidth / document.getElementById('threejs-container').clientHeight, 0.1, 1000);
                camera.position.z = 5;

                // Рендерер
                renderer = new THREE.WebGLRenderer();
                renderer.setSize(document.getElementById('threejs-container').clientWidth, document.getElementById('threejs-container').clientHeight);

                // Добавляем canvas в определенный div
                document.getElementById('threejs-container').appendChild(renderer.domElement);

                // Освещение
                const light = new THREE.DirectionalLight(0xffffff, 1);
                light.position.set(0, 1, 1).normalize();
                scene.add(light);

                // Загрузка и отображение OBJ файла
                const loader = new THREE.OBJLoader();
                loader.load('{{ $objUrl }}', function (object) {
                    object.scale.set(0.1, 0.1, 0.1); // Увеличивает масштаб в 2 раза по всем осям (X, Y, Z)
                    scene.add(object);
                });

                animate();
            }

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            init();
        });
    </script>
</div>
