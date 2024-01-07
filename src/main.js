const {BrowserWindow, Menu, screen, ipcMain} = require("electron");
const path = require('path');
let brandWindow;
let modelWindow;
let productWindow;
let providerWindow;
let orderWindow;
let viewOrderWindow;
let addProductWindow;
let addsendOrderWindow;
function createWindow(){
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        minHeight: 400,
        minWidth: 400,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        resizable: true
    });

    const indexPath = path.join(__dirname, 'view/index.html');

    mainWindow.loadFile(indexPath);
    //Menu.setApplicationMenu(null);
}

function createBrand(){
    brandWindow = new BrowserWindow({
    width: 350,
    height: 240,
    webPreferences:{
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
  },

  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newBrand.html');
  brandWindow.loadFile(filePath);
}
function closeNewBrand(){
  if(brandWindow) {
    brandWindow.close();
  }
}
ipcMain.on("create-brand", () =>{
  createBrand();
});

ipcMain.on("close-brand", () => {
  closeNewBrand();
});

function createModel(){
  modelWindow = new BrowserWindow({
  width: 425,
  height: 500,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newModel.html');
  modelWindow.loadFile(filePath);
}

function closeNewModel(){
  if(modelWindow) {
    modelWindow.close();
  }
}
ipcMain.on("create-model", () =>{
  createModel();
});

ipcMain.on("close-model", () => {
  closeNewModel();
});


function createProduct(){
  productWindow = new BrowserWindow({
  width: 425,
  height: 580,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newProduct.html');
  productWindow.loadFile(filePath);
}

function closeNewProduct(){
  if(productWindow) {
    productWindow.close();
  }
}
ipcMain.on("create-product", () =>{
  createProduct();
});

ipcMain.on("close-product", () => {
  closeNewProduct();
});

function createProvider(){
  providerWindow = new BrowserWindow({
  width: 425,
  height: 650,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newProvider.html');
  providerWindow.loadFile(filePath);
}

function closeNewProvider(){
  if(providerWindow) {
    providerWindow.close();
  }
}
ipcMain.on("create-provider", () =>{
  createProvider();
});

ipcMain.on("close-provider", () => {
  closeNewProvider();
});

function createOrder(){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  orderWindow = new BrowserWindow({
  width: 450,
  height: 650,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newPurchaseOrder.html');
  orderWindow.loadFile(filePath);
}

function closeNewOrder(){
  if(orderWindow) {
    orderWindow.close();
  }
}
ipcMain.on("create-order", () =>{
  createOrder();
});

ipcMain.on("close-order", () => {
  closeNewOrder();
});


function viewOrder(id){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  viewOrderWindow = new BrowserWindow({
  width: width,
  height: height,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  
  const filePath = path.join(__dirname, '..', 'src', 'view', 'viewPurchaseOrder.html');
  viewOrderWindow.loadFile(filePath);
  viewOrderWindow.webContents.on('did-finish-load', () => {
    viewOrderWindow.webContents.send('send-id-to-view-order', id);
  });
}

function closeViewOrder(){
  if(viewOrderWindow) {
    viewOrderWindow.close();
  }
}
ipcMain.on("view-order", (event, id) =>{
  viewOrder(id);
});

ipcMain.on("close-vieworder", () => {
  closeViewOrder();
});

function addProduct(id){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  addProductWindow = new BrowserWindow({
  width: 850,
  height: 450,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'newOrderProduct.html');
  addProductWindow.loadFile(filePath);
  addProductWindow.webContents.on('did-finish-load', () => {
    addProductWindow.webContents.send('send-id-to-product', id);
  });
}

function closeaddProduct(){
  if(addProductWindow) {
    addProductWindow.close();
  }
}
ipcMain.on("add-orderproduct", (event, id) =>{
  addProduct(id);
});

ipcMain.on("close-orderproduct", () => {
  closeaddProduct();
});

function addsendOrder(id){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  addsendOrderWindow = new BrowserWindow({
  width: 550,
  height: 350,
  webPreferences:{
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false
  },  
  });
  const filePath = path.join(__dirname, '..', 'src', 'view', 'sendOrder.html');
  addsendOrderWindow.loadFile(filePath);
  addsendOrderWindow.webContents.on('did-finish-load', () => {
    addsendOrderWindow.webContents.send('send-purchaseorder', id);
  });
}

function closeaddsendOrder(){
  if(addsendOrderWindow) {
    addsendOrderWindow.close();
  }
}
ipcMain.on("send-guide", (event, id) =>{
  addsendOrder(id);
});

ipcMain.on("close-guide", () => {
  closeaddsendOrder();
});

module.exports = {createWindow};