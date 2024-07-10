import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

function MyThree({ swipeCount }) {
  // console.log('from three js')
  // console.log(swipeCount)
  const refContainer = useRef(null)
  const modelRef = useRef(null) // Create a ref for the model
  const [scene, setScene] = useState(null) // State for the scene

  useEffect(() => {
    // Initialize the scene
    const newScene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) // Set alpha to true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement)
    }

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5).normalize()
    newScene.add(light)

    // Animation mixer
    let mixer

    // Load GLTF model
    const loader = new GLTFLoader()
    loader.load(
      'https://raw.githubusercontent.com/nishkarsh1215/testFrontend/main/public/black-robo-no.glb',
      function (gltf) {
        const model = gltf.scene
        modelRef.current = model // Store the model in the ref
        // Optional: Adjust scale and position of the model
        model.scale.set(0.7, 0.7, 0.7) // Adjust scale if needed
        model.position.set(0, -3, 0) // Adjust position if needed
        newScene.add(model)

        // Initialize mixer and play all animations
        mixer = new THREE.AnimationMixer(model)
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play()
        })
      },
      undefined,
      function (error) {
        console.error('An error happened', error)
      },
    )

    camera.position.z = 5

    // Clock for animations
    const clock = new THREE.Clock()

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate)

      // Update mixer for animations
      if (mixer) {
        mixer.update(clock.getDelta())
      }

      renderer.render(newScene, camera)
    }
    animate()

    // Save the scene to state
    setScene(newScene)

    // Clean up on component unmount
    return () => {
      if (mixer) {
        mixer.stopAllAction()
      }
      refContainer.current?.removeChild(renderer.domElement)
    }
  }, [])

  function removeEntity() {
    // Check if scene and modelRef.current are defined
    if (scene && modelRef.current) {
      const selectedObject = scene.getObjectByName(modelRef.current.name)
      if (selectedObject) {
        console.log('Removing object:')
        scene.remove(selectedObject)
      }
    }
  }

  function moveTo(x, y, z) {
    if (modelRef.current) {
      gsap.to(modelRef.current.position, {
        x: x,
        y: y,
        z: z,
        duration: 5, // Animation duration in seconds
        ease: 'power1.inOut',
      })
    }
  }

  function scaleModel(scale) {
    if (modelRef.current) {
      gsap.to(modelRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 2, // Animation duration in seconds
        ease: 'power1.inOut',
      })
    }
  }

  useEffect(() => {
    if (swipeCount == 1) {
      moveTo(2, -3, 0)
    }
    if (swipeCount == 5) {
      moveTo(-2, -3, 0)
    }
    if (swipeCount == 6) {
      {
        moveTo(0, -3, 0)
      }
    }
    if (swipeCount == 7) {
      scaleModel(0.8)
    }
    if (swipeCount == 8) {
      scaleModel(0.7)
    }
    if (swipeCount == 9) {
      scaleModel(0.8)
    }
    if (swipeCount >= 10) {
      removeEntity()
    }
  }, [swipeCount, scene])

  return (
    <div
      ref={refContainer}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent', // Make background transparent
      }}
    ></div>
  )
}

export default MyThree
