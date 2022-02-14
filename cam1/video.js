const camBtn = document.querySelector("#startCam");
const video = document.querySelector("#video");
const startBtn = document.querySelector("#startRecord");
const stopBtn = document.querySelector("#stopRecord");

let downloadLink = document.querySelector("#downloadVideo");
let cameraStream = null;
let mediaRecorder = null;
let blobsRecorded = [];

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