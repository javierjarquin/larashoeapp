const $main = document.querySelector("#content");
function brand() {
  getHTML('../view/marcas.html')
    .then(html => {
      $main.innerHTML = html;
    })
    .catch(error => {
      alert(error.text);
    });  
}

function model() {
  getHTML('../view/modelos.html')
    .then(html => {
      $main.innerHTML = html;
      loadBrand();
    })
    .catch(error => {
      alert(error.text);
    }); 
  
}

function product() {
  getHTML('../view/productos.html')
    .then(html => {
      $main.innerHTML = html;
      loadModel();
    })
    .catch(error => {
      alert(error.text);
    }); 
}
function provider() {
  getHTML('../view/proveedores.html')
    .then(html => {
      $main.innerHTML = html;
    })
    .catch(error => {
      alert(error.text);
    }); 
}

function providerProduct() {
  getHTML('../view/catalogoproveedor.html')
    .then(html => {
      $main.innerHTML = html;
    })
    .catch(error => {
      alert(error.text);
    }); 
}

function purchaseOrder() {
  getHTML('../view/ordendecompra.html')
    .then(html => {
      $main.innerHTML = html;
      loadPurchaseOrder();
    })
    .catch(error => {
      alert(error.text);
    }); 
}
function receptionProduct() {
  getHTML('../view/recepcion.html')
    .then(html => {
      $main.innerHTML = html;
    })
    .catch(error => {
      alert(error.text);
    }); 
}

function inventory() {
  getHTML('../view/inventario.html')
    .then(html => {
      $main.innerHTML = html;
    })
    .catch(error => {
      alert(error.text);
    }); 
}
function getHTML (nameHtml){
  return fetch(nameHtml)
    .then(response => {
      if (!response.ok) {
        throw new Error('El archivo no pudo ser encontrado' + nameHtml);
      }
      return response.text();
    }) 
    .then(htmlText => {
      return htmlText;
    })
    .catch (error => {
      throw new Error('Hubo un problema al cargar el archivo' + nameHtml);
    });
}