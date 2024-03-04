import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import platformsConnector from "./application/platforms_connector";

/**
 * api키 보호를 위해 api키는 src디렉토리 내 client-secret.json 파일로 분리했습니다.
 * git clone을 했다면 client-secret.json 파일이 없을 것이므로, client-secret.json.example 파일을 복사하여 client-secret.json 파일을 만들어주세요.
 */


//start single web server
const express = require("express");
const path = require("path");
const webserver = express();
const port = 8800;
webserver.use(express.static(__dirname));
webserver.get('/twitchresult', (req, res) => {
    //example: http://localhost:8800/twitchresult#access_token=abcdefghijklmnopqrstuvwxyz&scope=user%3Aread%3Afollows&token_type=bearer
    //req.body.access_token이 존재하지 않을 경우 클라이언트에게 현재 url의 #을 ?로 바꾼 url을 보내도록 한다.
    if (req.query.access_token) {
        console.log('received token:' + req.query.access_token);
        res.send('<script>window.close();</script>');
        //bring this window to front
        mainWindow.hide();
        mainWindow.show();
        mainWindow.focus();
        mainWindow.webContents.send('twitch-connect-reply', JSON.stringify({ success:true, access_token: req.query.access_token }));
    } else {
        console.log('no access_token');
        const scriptForClient = `<script>window.location.href = window.location.href.replace('#', '?');</script>`;
        res.send(scriptForClient);
    }
});
webserver.get('/youtuberesult', (req, res) => {
    console.log(req.query);
});
webserver.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`directory: ${__dirname}`);
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 960,
        height: 550,
        frame: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load user data from file, if not exist, load initial.html
    const usrdatadir = app.getPath("userData");
    const usrdata = `${usrdatadir}/BangOn/config.json`;
    if (fs.existsSync(usrdata)) {
        mainWindow.loadURL(`http://localhost:${port}/index.html`);
    } else {
        //set windows resizable to false
        mainWindow.setResizable(false);
        mainWindow.loadURL(`http://localhost:${port}/initial.html`);
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
