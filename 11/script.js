'use strict';

// elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");
const fullScreen = player.querySelector(".fullscreen");

// flags
let mouseDown = false;
let isFullScreen = false;

// functions
function togglePlay() {
    /*
    const method = video.paused ? 'play' : 'pause';
    video[method]();

    -- or --
    video[video.paused ? 'play' : 'pause']();
    */

    // .paused is a property of the video element
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateVerbiage() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function updateProgressBar() {
    // update the progress bar based on the video position (time)
    // let currentTime = (video.currentTime / video.duration) * 100;
    // progressBar.style.flexBasis = `${currentTime}%`;
    progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

function skip() {
    // skip -10 or 25
    // can access skip via:
    // this.dataset['skip']
    // -- or --
    //this.dataset.skip
    video.currentTime += parseFloat(this.dataset.skip);
}

function adjust() {
    /*
    if (this.name === 'volume') {
        video.volume = this.value;
    } else {
        video.playbackRate = this.value;
    }
    */
    video[this.name] = this.value;
}

function scrub(e) {
    // get e.offsetX
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    video.webkitEnterFullscreen();
}

// listeners
video.addEventListener('pause', updateVerbiage);
video.addEventListener('play', updateVerbiage);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgressBar);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(b => b.addEventListener('click', skip));
ranges.forEach(s => s.addEventListener('change', adjust));
ranges.forEach(s => s.addEventListener('mousemove', adjust));
progress.addEventListener('click', scrub);
// if mouseDown is true, scrub(e) will run
// if mouseDown is false, it wont do anything
// this is a trick using the && boolean operator!
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullScreen.addEventListener('click', toggleFullScreen);