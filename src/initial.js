const electron = require("electron");
const {
    contextBridge,
    ipcRenderer
} = electron;

//app initial setup code
var animation = bodymovin.loadAnimation({
    container: document.getElementById('popballs'), // Required
    path: './popballs.json', // Required
    renderer: 'svg', // Required
    loop: false, // Optional
    autoplay: false, // Optional
    name: "popballs", // Name for future reference. Optional.
})

// 0.3s delay to allow animation to play
setTimeout(function () {
    animation.play();
}, 300);


var global = document.getElementById('root');
var initial = document.getElementById('initial');
var titleTitle = document.getElementById('title-title');
var titleSubtitle = document.getElementById('title-subtitle');
var getstartedtxt = document.getElementById('getstartedtxt');
var btnSetupNew = document.getElementById('btnSetupNew');
var btnSetupExisting = document.getElementById('btnSetupExisting');

var setupNew1 = document.getElementById('setupNew1'); //setupNew div

btnSetupNew.addEventListener('click', function () {
    //root을 숨기고 setupNew를 보여준다.
    setupNew1.style.display = 'flex';
    anime({
        targets: '.pageroot',
        right: '100%',
        easing: 'cubicBezier(0.31, 0.00, 0.30, 1.00)',
        duration: 500
    });
    anime({
        targets: '.pagenew1',
        left: ['100%', '0%'],
        easing: 'cubicBezier(0.31, 0.00, 0.30, 1.00)',
        duration: 500
    });
    setTimeout(function() {
        global.style.display = 'none';
    }, 500);
});

var btnConnectTwitch = document.getElementById('btnConnectTwitch');
var btnConnectYoutube = document.getElementById('btnConnectYoutube');
var btnConnectChzzk = document.getElementById('btnConnectChzzk');
var btnConnectAfreeca = document.getElementById('btnConnectAfreeca');
var twitchtoken, youtubetoken;

btnConnectTwitch.addEventListener('click', function() {
    //twitch 연결
    ipcRenderer.send('twitch-connect');
});
btnConnectYoutube.addEventListener('click', function() {
    //youtube 연결
    ipcRenderer.send('youtube-connect');
});
btnConnectChzzk.addEventListener('click', function() {
    //chzzk 연결
    ipcRenderer.send('chzzk-connect');
});
btnConnectAfreeca.addEventListener('click', function() {
    //afreeca 연결
    ipcRenderer.send('afreeca-connect');
});

ipcRenderer.on('twitch-connect-reply', (event, arg) => {
    console.log(arg);
    var result = JSON.parse(arg);
    if (result.success) {
        //twitch 연결 성공
        btnConnectTwitch.innerHTML = 'Twitch ✓';
        btnConnectTwitch.disabled = true;
        twitchtoken = result.access_token;
    }
});