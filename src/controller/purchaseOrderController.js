
ipcRenderer.on('send-id-to-product', (event, id) => {
  // alert('send-id-to-product' + id);
  const idInput          = document.getElementById('orderId');
  idInput.value = id; 
  loadModel();
  loadProduct();
});

ipcRenderer.on('send-id-to-view-order', (event, id) => {
  //loadModel(); 
  //loadProduct();
  loadPurchaseOrder(); 
  getAllData(id);  
  loadPurchaseOrderProduct(id);
});

ipcRenderer.on('send-purchaseorder', (event, id)=>{
  const idInput          = document.getElementById('orderId');
  idInput.value = id; 
});

async function deleteProduct(id) {
  const deleteUrl = `http://localhost:8001/deleteProduct/${id}`;

  try {
    const response = await axios.delete(deleteUrl);

    // Si la solicitud DELETE es exitosa (código de estado 200)
    if (response && response.status === 200 && response.data && response.data.status) {
      const serverMessage = response.data.status;
      alert('Producto eliminado: ' + serverMessage);
    }
  } catch (error) {
    // Si hay un error en la solicitud DELETE
    if (error.response && error.response.data && error.response.data.detail) {
      const errorMessage = error.response.data.detail;
      alert('Error: ' + errorMessage);
    } else {
      // Manejar otros errores de estado HTTP
      alert('Error: Código de estado ' + error.response.status);
    }
  }
}

async function sendOrder(){
  const idInput          = document.getElementById('orderid');
  ipcRenderer.send("send-guide", idInput.value);
}
async function closeGuide(){
  ipcRenderer.send("close-guide");
}

function addsend(){
  
  const forms = document.getElementById('fsendOrder');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    if (forms.elements[key].type === 'checkbox') {
      data[key] = forms.elements[key].checked ? '1' : '0';
    } else {
      data[key] = value;
    }
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8001/sendOrder/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha marcado como envíado.. favor reciba la mercancia cuando llegue');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeGuide();
}
function paymentOrder(){
  let orderid = document.getElementById("orderid").value;
  const url = `http://localhost:8001/payOrder/?orderId=${orderid}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha pagado la orden de compra');
  } catch (error) {
    alert('Error:' +  error);
  }
}
function aprovedOrder(){
  let orderid = document.getElementById("orderid").value;
  const url = `http://localhost:8001/aprovedOrder/?orderId=${orderid}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha aprovado la orden de compra');
  } catch (error) {
    alert('Error:' +  error);
  }

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 function loadModel() {
  const selectElement = document.getElementById('modelId');
  const Url = 'http://127.0.0.1:8000/models/';

  axios.get(Url)
    .then(response => {
      response.data.forEach(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.textContent = option.name + ' ' + option.version; 
        selectElement.appendChild(elem);
        
      });
    })
    .catch(error => {
      alert("Error al cargar la lista de modelos: " + error);
    });
}
function productformatter(value, row, index, field) {
  var selectHTML = '<select class="form-select">';
  var selectedOptionText = '';
  
  $('#productId option').each(function() {
    if ($(this).val().toString() === value.toString()) {
      selectedOptionText = $(this).text();
      selectHTML += `<option value="${$(this).val()}" selected>${selectedOptionText}</option>`;
      return false; // Sale del bucle una vez que se encuentra la coincidencia
    }
  });

  if (!selectedOptionText) {
    // Si no se encuentra el valor, se agrega una opción vacía
    selectHTML += '<option value="" selected></option>';
  }
  
  selectHTML += '</select>';
  
  return selectHTML;
}



function providerformatter(value, row, index, field) {
  // Obtener las marcas disponibles del select original con el ID brandId
  var originalSelectOptions = $('#providerId option').clone();

  // Construir el select manualmente
  var selectHTML = '<select class="form-select">';
  originalSelectOptions.each(function() {
    selectHTML += '<option value="' + $(this).val() + '"';
    if ($(this).val().toString() == value.toString()) {
      selectHTML += ' selected';
    }
    selectHTML += '>' + $(this).text() + '</option>';
  });
  selectHTML += '</select>';

  return selectHTML;
}
function shippetformatter(value, row, index, field){
  if (value.toString() == "0"){
    return 'NO';
  } else{
    return 'SI';
  }
}
function receiveformatter(value, row, index, field){
  if (value.toString() == "0"){
    return 'NO';
  } else{
    return 'SI';
  }
}
function paymentformatter(value, row, index, field){
  if (value.toString() == "0"){
    return 'NO';
  } else{
    return 'SI';
  }
}
function unitformatter(value, row, index, field){
  var select = '<select class="form-select" aria-label="unidades de medida">'
  if (value.toString() == "PI"){
    select+= '<option selected>Pieza</option>';
  }
  if (value.toString() == "CO"){
    select+= '<option selected>Corrida</option>';
  }
  if (value.toString() == "MO"){
    select+= '<option selected>Media Corrida</option>';
  }

  select+= '</select>'; 
  return select;
}
  function loadProduct()
{
  const selectElement   = document.getElementById('productId');
  const originalOptions = document.getElementById('modelId');
  const Url = 'http://127.0.0.1:8000/products/';
 
  axios.get(Url)
    .then(response => {
      response.data.forEach(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        for (let i = 0; i < originalOptions.length; i++) {
          
          if (option.modelId.toString() === originalOptions[i].value) {
            elem.textContent = option.name + ' ' + originalOptions[i].textContent.toString();
            selectElement.appendChild(elem);
            break;
          }
        } 
      });
    })
    .catch(error => {
      alert("Error al cargar la lista de productos: " + error);
    });  
}

  async function newOrderProduct() {
  const forms = document.getElementById('fnewAddProduct');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    if (forms.elements[key].type === 'checkbox') {
      data[key] = forms.elements[key].checked ? '1' : '0';
    } else {
      data[key] = value;
    }
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8001/orderProduct/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  try {
    const response =  await axios.post(url, {}, { headers: headers });
    alert(`response.status ${response.status}`); 
    if (response.status === 200) {
      const serverMessage = response.data.message;
      alert(serverMessage);     
    } else {
      if (response && response.data && response.data.detail) {
        const errorMessage = response.data.detail;
        alert('Error: ' + errorMessage);
      } else {
        alert('Error: No se ha podido agregar el nuevo producto a la orden.');
      }
    }
      closeOrderProduct();
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data && error.response.data.detail) {
      const errorMessage = error.response.data.detail;
      alert('Error 404: ' + errorMessage);
    } else {
      alert('Error: ' + error.message);
    }
  }
  
}
async function addOrderProduct(){
  const idInput          = document.getElementById('orderid');
  //alert('addOrderProduct' + idInput.value);
  ipcRenderer.send("add-orderproduct", idInput.value);
}
async function closeOrderProduct(){
  ipcRenderer.send("close-orderproduct");
}
function loadPurchaseOrderProduct(orderId){
  
  $('#orderProductT').bootstrapTable('destroy');

  axios.get('http://localhost:8001/orderProList/' + orderId)
    .then(response => {
      const data = response.data;
      
      $('#orderProductT').bootstrapTable({
        data: data,
        pagination: true,
        pageSize: 8,
   
        columns: [{
  
          field: 'acciones',
          title: 'Acciones',
          formatter: function(value, row, index) {
            return '<button class="btn btn-danger btn-sm" onclick="deleteProduct(' + row.id + ')">Eliminar</button>';
              
          }
      }]
      });
    })
    .catch(error => {
      alert('Error al agregar lista de productos: ' + error);
    });
    
}


function getAllData(orderId){
 const form             = document.getElementById('fnewPurchaseOrder');
 const idInput          = document.getElementById('orderid');
 const codeInput        = document.getElementById('code');
 const arrivalDateInput = document.getElementById('arrivalDate');
 const totalOrderInput  = document.getElementById('totalOrder');
 const guideInput       = document.getElementById('guide');
 const totalImportInput = document.getElementById('totalImport');
 const providerIdSelect = document.getElementById('providerId');
 const status           = document.getElementById('status');

 // Realizar la petición GET para obtener los datos usando Axios
 axios.get('http://127.0.0.1:8001/orderById/' + orderId)
     .then(response => {
         const data = response.data;

         // Rellenar los campos del formulario con los datos obtenidos
         codeInput.value = data.code;
         arrivalDateInput.value = data.arrivalDate;
         totalOrderInput.value = data.totalOrder;
         guideInput.value = data.guide;
         totalImportInput.value = data.totalImport;
         providerIdSelect.value = data.providerId;
         idInput.value = orderId;
         status.value  = data.status;
     })
     .catch(error => {
         console.error('Error al obtener los datos:', error);
     });
}
function loadPurchaseOrder() {
  const selectElement = document.getElementById('providerId');
  const Url = 'http://127.0.0.1:8000/providers/';
   
  axios.get(Url)
    .then(response => {
      response.data.forEach(option => {
    
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.textContent = option.commercialName;
        selectElement.appendChild(elem);
      });
    })
    .catch(error => {
      alert("Error al cargar la lista de proveedores: " + error);
    });
}
async function getPurchaseOrder() {
  $('#purchaseOrderT').bootstrapTable('destroy');
  const startDate  = document.getElementById('startDate').value;
  const endDate    = document.getElementById('endDate').value;
  const code       = document.getElementById('code').value;
  const status     = document.getElementById('status').value;
  const providerId = document.getElementById('providerId').value;
  let btn;

  try{
    let params = '?';

    if(code){
      params = params + `code=${code}`;
    }

    if(startDate){
      params = params + `&startDate=${startDate}`;
    }

    if(endDate){
      params = params + `&endDate=${endDate}`;
    }

    if(status){
      params = params + `&status=${status}`;
    }

    if(providerId){
      params = params + `&providerId=${providerId}`;
    }

    if(params == '?'){
      params = '';
    }
    const res = await axios.get('http://localhost:8001/orders/' + params);
    const data = res.data;
    
  
    
    
    $('#purchaseOrderT').bootstrapTable({
      data: data,
      pagination: true,
      pageSize: 8,
   
      columns: [{

        field: 'acciones',
        title: 'Acciones',
        formatter: function(value, row, index) {
          return '<button class="btn btn-info btn-sm" onclick="viewOrder(' + row.id + ')">Editar</button>';
            
        }
    }]
    });


  } catch (error){
    alert('Error al obtener las ordenes'+ error);
  }

}

 function newPurchaseOrder() {
  const forms = document.getElementById('fnewPurchaseOrder');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    if (forms.elements[key].type === 'checkbox') {
      data[key] = forms.elements[key].checked ? '1' : '0';
    } else {
      data[key] = value;
    }
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8001/createOrder/?${queryParams}&creationUserId=1`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha guardado correctamente la orden de compra');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeOrder();
}

async function createOrder() {
    ipcRenderer.send("create-order");
}

async function closeOrder(){
  ipcRenderer.send("close-order");
}

async function viewOrder(id) {
  //alert('viewOrder' +  id);
  ipcRenderer.send("view-order", id);
}

async function closeViewOrder(){
  ipcRenderer.send("close-vieworder")
}