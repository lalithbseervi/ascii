const camBtn = document.querySelector("#startCam");
const video = document.querySelector("#video");
const startBtn = document.querySelector("#startRecord");
const stopBtn = document.querySelector("#stopRecord");

let downloadLink = document.querySelector("#downloadVideo");
let cameraStream = null;
let mediaRecorder = null;
let blobsRecorded = [];

const constraints = {
    audio: true,
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
        frameRate: {
            min: 30,
            ideal: 60,
            max: 90
        }
    },
};

camBtn.addEventListener('click', async function() {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
    video.srcObject = cameraStream;
})

startBtn.addEventListener('click', function() {
    mediaRecorder = new MediaRecorder(cameraStream, { mimeType: 'video/mp4' });

    mediaRecorder.addEventListener('dataavailable', function(e) {
        blobsRecorded.push(e.data);
    })
    mediaRecorder.addEventListener('stop', function() {
    let videoLocal = URL.createObjectURL(new Blob(blobsRecorded, { type: 'video/mp4' }));
    downloadLink.href = videoLocal;
});
    mediaRecorder.start(500);
});

stopBtn.addEventListener('click', function() {
    mediaRecorder.stop();
});
