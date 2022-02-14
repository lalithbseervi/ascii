(function () {
    if(
        !"mediaDevices" in navigator || !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("Device camera cannot be accessed.");
        return;
    }
})

const video = document.querySelector("#video");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const screenshot = document.querySelector("#screenshot");
const changeCam = document.querySelector("#changecam");
const screenshotContainer = document.querySelector("#screenshotContainer");
const canvas = document.querySelector("#canvas");
const selectDevice = document.querySelector("selectDevice");

const constraints = {
    video: {
        width: {
            min: 375,
            ideal: 1280,
            max: 2560,
        },
        height: {
            min: 660,
            ideal: 864,
            max: 1440,
        },
    },
};

let useFrontCamera = true;
let videoStream;

play.addEventListener("click", function() {
    video.play();
    play.classList.add("is-hidden");
    play.classList.remove("is-hidden");
})

screenshot.addEventListener("click", function() {
    const img = document.createElement("img");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    screenshotContainer.prepend(img);
});

changeCam.addEventListener("click", function() {
    useFrontCamera = !useFrontCamera;
    initializeCamera();
})

function stopVideoStream() {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => {
            track.stop();
        });
    }
}

async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
    } catch (err) {
        alert("Couldn't access camera");
    }
}

initializeCamera();