/* eslint-disable no-restricted-globals */
resizeTo(0, 0);
onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const media = decodeURIComponent(urlParams.get('src'))
    var y = document.createElement("source");
    y.setAttribute('src', media)
    y.setAttribute('type', 'audio/x-wav')

    var x = document.createElement("audio");
    x.setAttribute('controls', true)
    x.setAttribute("id", "sound")

    let element = document.querySelector('#audio')
    element.appendChild(x)

    let sound = document.querySelector('#sound')
    sound.appendChild(y)

    sound = document.querySelector('#sound')
    sound.pause()
    sound.load()
    sound.play();
    let soundDuration;
    setTimeout(() => {
        soundDuration = sound.duration;
        setTimeout(close, soundDuration * 1000);
    }, 200)
}