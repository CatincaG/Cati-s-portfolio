import './style/main.styl'
import * as THREE from 'three'


const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    //Update cursor position with values between -0.5 and +0.5
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    // Save width and height
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

/**
 * Object
 */
const particlesGeometry = new THREE.Geometry()

for(let i = 0; i < 500; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    )
    particlesGeometry.vertices.push(vertice)
}
const particleMaterial = new THREE.PointsMaterial(
    {
        size: 0.1,
        sizeAttenuation: true,
        color: new THREE.Color(0x7ac9d0),
        depthWrite: false
    })
const particles = new THREE.Points(particlesGeometry, particleMaterial)
scene.add(particles)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0xc8e8ea)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    //Update camera
    camera.position.x = cursor.x * 0.4
    //camera.position.y = - cursor.y * 2
    camera.lookAt(scene.position)

    //Particles
    particles.rotation.x += 0.001
    particles.rotation.y += 0.001

    // Render
    renderer.render(scene, camera)
}
loop()
