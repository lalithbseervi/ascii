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
        },
        audioBitsPerSecond: {
          min: 160000,
          ideal: 3200000,
          max: 5600000  
        },
        videoBitsPerSecond: {
          min: 800000,
          ideal: 1260000,
          max: 8400000  
        }
    },
};

camBtn.addEventListener('click', async function() {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
    video.srcObject = cameraStream;
})

startBtn.addEventListener('click', function() {
    mediaRecorder = new MediaRecorder(cameraStream, { mimeType: 'video/webm' });

    mediaRecorder.addEventListener('dataavailable', function(e) {
        blobsRecorded.push(e.data);
    })
    mediaRecorder.addEventListener('stop', function() {
    let videoLocal = URL.createObjectURL(new Blob(blobsRecorded, { type: 'video/webm' }));
    downloadLink.href = videoLocal;
});
    mediaRecorder.start(1000);
});

stopBtn.addEventListener('click', function() {
    mediaRecorder.stop();
});
