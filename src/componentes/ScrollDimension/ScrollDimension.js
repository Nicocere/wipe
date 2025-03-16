"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import styles from './ScrollDimension.module.css';
import { useMediaQuery } from '@mui/material';

gsap.registerPlugin(ScrollTrigger);

const ScrollDimension = () => {

  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    var Mathutils = {
      normalize: function ($value, $min, $max) {
        return ($value - $min) / ($max - $min);
      },
      interpolate: function ($normValue, $min, $max) {
        return $min + ($max - $min) * $normValue;
      },
      map: function ($value, $min1, $max1, $min2, $max2) {
        if ($value < $min1) {
          $value = $min1;
        }
        if ($value > $max1) {
          $value = $max1;
        }
        var res = this.interpolate(this.normalize($value, $min1, $max1), $min2, $max2);
        return res;
      }
    };

    const words = [
      { text: "CREA" },
      { text: "INNOVA" },
      { text: "CRECE" },
      { text: "IMAGINA" },
      { text: "EXPLORA" },
      { text: "CONECTA" }
    ];

    const images = [
      { src: "/images/png/astronaut11.webp" },
      { src: "/images/png/mars.png" },
      { src: "/images/png/Neptune.png" },
      { src: "/images/png/venus.png" },
      { src: "/images/png/planet.webp" },
      { src: "/images/png/mars.png" }
    ];


    var ww = window.innerWidth;
    var wh = window.innerHeight;

    var composer;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      shadowMapEnabled: true,
      shadowMapType: THREE.PCFSoftShadowMap
    });
    renderer.setSize(ww, wh);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x194794, 0, 100);

    var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.position.z = 400;

    scene.add(camera);

    var renderScene = new RenderPass(scene, camera);

    composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);

    var points = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0]
    ];

    for (var i = 0; i < points.length; i++) {
      var x = points[i][0];
      var y = points[i][2];
      var z = points[i][1];
      points[i] = new THREE.Vector3(x, y, z);
    }

    var path = new THREE.CatmullRomCurve3(points);
    path.tension = .5;

    var geometry = new THREE.TubeGeometry(path, 300, 4, 32, false);

    var texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(15, 2);
    });

    var mapHeight = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(15, 2);
    });

    var material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: mapHeight,
      bumpScale: -.03,
      specular: 0x000
    });

    var tube = new THREE.Mesh(geometry, material);
    scene.add(tube);

    var geo = new THREE.EdgesGeometry(geometry);

    var mat = new THREE.LineBasicMaterial({
      linewidth: 2,
      opacity: .09,
      transparent: 1
    });

    var wireframe = new THREE.LineSegments(geo, mat);
    scene.add(wireframe);

    var light = new THREE.PointLight(0xffffff, .25, 4, 0);
    light.castShadow = true;
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Aumentamos la luz ambiente
    scene.add(ambientLight);


    // Cargar fuente y crear textos
    const fontLoader = new FontLoader();
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // Después de crear textGroup, añadir:
    const imageGroup = new THREE.Group();
    scene.add(imageGroup);



    let finalMesh;

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {

      const spacing = 2; // Aumentar espaciado
      const totalHeight = words.length * spacing;
      const startY = totalHeight / 3;

      words.forEach((word, index) => {
        const textGeometry = new TextGeometry(word.text, {
          font: font,
          size: 0.8,
          height: 0.001,
          depth: 0.5,
          curveSegments: 12,
          bevelEnabled: false
        });

        const textMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide
        });

        textGeometry.computeBoundingBox();
        textGeometry.center();

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Posicionamiento en el tubo
        const pathPosition = 0.08 + (index * 0.15);
        const position = path.getPointAt(pathPosition);
        const tangent = path.getTangentAt(pathPosition).normalize();

        // Obtener una dirección perpendicular a la tangente
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
        const adjustedUp = new THREE.Vector3().crossVectors(right, tangent).normalize();

        // Crear matriz de orientación
        const matrix = new THREE.Matrix4();
        matrix.makeBasis(right, adjustedUp, tangent);

        textMesh.position.copy(position);

        // Aplicar rotación de la matriz
        textMesh.setRotationFromMatrix(matrix);

        textGroup.add(textMesh);
      });

      images.forEach((image, index) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(image.src, (texture) => {
          const imageSize = 4; // Aumentar tamaño para ver mejor
          const aspectRatio = texture.image.width / texture.image.height;

          const planeGeometry = new THREE.PlaneGeometry(imageSize * aspectRatio, imageSize);
          const planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            alphaTest: 0.1
          });

          const imageMesh = new THREE.Mesh(planeGeometry, planeMaterial);

          // Espaciado corregido para distribuir mejor
          const pathPosition = 0.05 + (index * 0.12);
          const position = path.getPointAt(pathPosition);
          const tangent = path.getTangentAt(pathPosition).normalize();

          const up = new THREE.Vector3(0, 1, 0);
          const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
          const adjustedUp = new THREE.Vector3().crossVectors(right, tangent).normalize();

          // Ajustar distancia para evitar que se escondan en el tubo
          const offset = (index % 2 === 0 ? 2 : -2); // Aumentado para que se vean más
          position.add(right.multiplyScalar(offset));

          imageMesh.position.copy(position);

          // Orientar hacia la cámara
          imageMesh.lookAt(camera.position);

          // Agregar animación flotante para dar más visibilidad
          imageMesh.userData = {
            initialY: imageMesh.position.y,
            floatAmplitude: 0.5,
            floatFrequency: 0.001,
            phaseOffset: Math.random() * Math.PI * 2
          };

          imageGroup.add(imageMesh);
        });
      });


      const finalText = new TextGeometry("SPAZIO DIGITAL", {
        font: font,
        size: 0.5,
        height: 0.01,
        curveSegments: 6,
        bevelEnabled: false,
        depth: 0.2
      });

      const finalMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: false,
        opacity: 1,
        side: THREE.FrontSide
      });

      finalMesh = new THREE.Mesh(finalText, finalMaterial);
      finalText.center();

      // Posicionamos el texto en el centro del tubo
      const finalPathPosition = 0.99; // Mitad del tubo
      const finalPosition = path.getPointAt(finalPathPosition);
      finalMesh.position.copy(finalPosition);

      // Alineamos el texto hacia la cámara para que esté plano y de frente
      finalMesh.lookAt(camera.position);

      scene.add(finalMesh);


    });

    function updateCameraPercentage(percentage) {
      const p1 = path.getPointAt(percentage);
      const p2 = path.getPointAt(percentage + 0.03);

      camera.position.set(p1.x, p1.y, p1.z);
      camera.lookAt(p2);
      light.position.set(p2.x, p2.y, p2.z);
    }

    var cameraTargetPercentage = 0;
    var currentCameraPercentage = 0;

    gsap.defaultEase = Linear.easeNone;

    var tubePerc = {
      percent: 0
    };

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: true,
        pinSpacing: true,
        markers: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(tubePerc, {
      percent: .96,
      ease: Linear.easeNone,
      duration: 10,
      onUpdate: function () {
        cameraTargetPercentage = tubePerc.percent;
      }
    });

    function render() {
      currentCameraPercentage = cameraTargetPercentage;
      updateCameraPercentage(currentCameraPercentage);

      if (finalMesh) {
        finalMesh.rotation.z = mouseY * Math.PI;
        finalMesh.rotation.x = mouseX * Math.PI;
      }

      textGroup.children.forEach(textMesh => {
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(camera.position, textMesh.position, new THREE.Vector3(0, 1, 0));
        textMesh.quaternion.setFromRotationMatrix(lookAtMatrix);

      });



      // Actualizar posición y rotación de las imágenes
      imageGroup.children.forEach((imageMesh) => {
        if (imageMesh.userData) {
          const time = Date.now();
          const { initialY, floatAmplitude, floatFrequency, phaseOffset } = imageMesh.userData;

          // Animación flotante
          imageMesh.position.y = initialY + Math.sin(time * floatFrequency + phaseOffset) * floatAmplitude;

          // Hacer que miren a la cámara
          imageMesh.lookAt(camera.position);

          // Añadir pequeña rotación
          imageMesh.rotation.z += 0.0005;
        }
      });



      particleSystem1.rotation.y += 0.00002;
      particleSystem2.rotation.x += 0.00005;
      particleSystem3.rotation.z += 0.00001;

      composer.render();
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    window.addEventListener('resize', function () {
      var width = window.innerWidth;
      var height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);
    }, false);

    var spikeyTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png');

    var particleCount = 100000,
      particles1 = new THREE.BufferGeometry(),
      particles2 = new THREE.BufferGeometry(),
      particles3 = new THREE.BufferGeometry(),
      pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: .5,
        opacity: 0.5,
        map: spikeyTexture,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

    var positions1 = new Float32Array(particleCount * 3);
    var positions2 = new Float32Array(particleCount * 3);
    var positions3 = new Float32Array(particleCount * 3);

    for (var i = 0; i < particleCount; i++) {
      positions1[i * 3] = Math.random() * 500 - 250;
      positions1[i * 3 + 1] = Math.random() * 50 - 25;
      positions1[i * 3 + 2] = Math.random() * 500 - 250;

      positions2[i * 3] = Math.random() * 500;
      positions2[i * 3 + 1] = Math.random() * 10 - 5;
      positions2[i * 3 + 2] = Math.random() * 500;

      positions3[i * 3] = Math.random() * 500;
      positions3[i * 3 + 1] = Math.random() * 10 - 5;
      positions3[i * 3 + 2] = Math.random() * 500;
    }

    particles1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
    particles2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    particles3.setAttribute('position', new THREE.BufferAttribute(positions3, 3));

    var particleSystem1 = new THREE.Points(particles1, pMaterial);
    var particleSystem2 = new THREE.Points(particles2, pMaterial);
    var particleSystem3 = new THREE.Points(particles3, pMaterial);

    scene.add(particleSystem1);
    scene.add(particleSystem2);
    scene.add(particleSystem3);

    document.addEventListener('mousemove', function (event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.experience}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scrollTarget} />
      <div className={styles.vignetteRadial} />
    </div>
  );
};

export default ScrollDimension;