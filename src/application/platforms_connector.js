//platforms connector.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { shell } = require('electron');

//load 'client-secret.json' file
/**
 * api키 보호를 위해 client-secret.json 파일로 분리했습니다.
 * git clone을 했다면 client-secret.json 파일이 없을 것이므로, client-secret.json.example 파일을 복사하여 client-secret.json 파일을 만들어주세요.
 */
const fs = require('fs');
const path = require('path');
const clientSecretPath = path.join(__dirname, 'client-secrets.json');
const clientSecret = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8'));

//ipcRenderer.send('twitch-connect'); receiver
ipcMain.on('twitch-connect', (event, arg) => {
    console.log('twitch-connect');
    //open twitch oauth page to default browser.
    const twitchOauthUrl = 'https://id.twitch.tv/oauth2/authorize?client_id='+clientSecret.twitch.client_id+'&redirect_uri=http://localhost:8800/twitchresult&response_type=token&scope=user%3Aread%3Afollows';
    shell.openExternal(twitchOauthUrl);
});

//ipcRenderer.send('youtube-connect'); receiver
ipcMain.on('youtube-connect', (event, arg) => {
    console.log('youtube-connect');
});

//ipcRenderer.send('chzzk-connect'); receiver
ipcMain.on('chzzk-connect', (event, arg) => {
    console.log('chzzk-connect');
});

//ipcRenderer.send('afreeca-connect'); receiver
ipcMain.on('afreeca-connect', (event, arg) => {
    console.log('afreeca-connect');
});