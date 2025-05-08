const botonCamera = document.getElementById("button_camera");
const video = document.getElementById("video_camera");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true,});
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error("Error accessing the camera: ", error);
    }
}

botonCamera.addEventListener("click", () => {
    startCamera();
    botonCamera.style.display = "none"; // Oculta el botón después de hacer clic
});