const electron = require('electron');
const url = require('url');
const path = require('path');
const { createPublicKey } = require('crypto');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;

//listen for app to be ready
app.on('ready',function(){
    //create new window
    mainWindow = new BrowserWindow({});
    mainWindow.maximize()
    //Load Html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //Build Menu From Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});



//Create Menu Template
const mainMenuTemplate = [
{
    label:'File',
    submenu:[
        // {
        //     label: 'Add Item'
        // },
        // {
        //     label: 'Remove Item'
        // },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        }
    ]
}
];
