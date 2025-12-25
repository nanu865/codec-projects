document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const transcript = document.getElementById('transcript');
    const status = document.getElementById('status');
    const timer = document.getElementById('timer');

    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let recognition;
    let isRecording = false;
    let startTime;
    let timerInterval;

    if (!('webkitSpeechRecognition' in window)) {
        status.textContent = 'Speech recognition works only in Chrome or Edge.';
        startBtn.disabled = true;
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
        isRecording = true;
        status.textContent = 'Listening...';
        startBtn.classList.add('recording');
        startTime = Date.now();
        timer.classList.remove('hidden');
        startTimer();
    };

    recognition.onend = () => {
        if (isRecording) recognition.start();
    };

    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript.value += event.results[i][0].transcript + ' ';
            }
        }
    };

    function startTimer() {
        timerInterval = setInterval(() => {
            const diff = Date.now() - startTime;
            const m = String(Math.floor(diff / 60000)).padStart(2, '0');
            const s = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
            timer.textContent = `${m}:${s}`;
        }, 1000);
    }

    function stopRecording() {
        isRecording = false;
        recognition.stop();
        clearInterval(timerInterval);
        startBtn.classList.remove('recording');
        startBtn.disabled = false;
        stopBtn.disabled = true;
        status.textContent = 'Stopped';
    }

    startBtn.onclick = () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    stopBtn.onclick = stopRecording;

    copyBtn.onclick = () => navigator.clipboard.writeText(transcript.value);
    clearBtn.onclick = () => transcript.value = '';

    downloadBtn.onclick = () => {
        if (!transcript.value) return;
        const blob = new Blob([transcript.value], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'transcript.txt';
        a.click();
    };
});
