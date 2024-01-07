function loadModel() {
  const selectElement = document.getElementById('modelId');
  const Url = 'http://127.0.0.1:8000/models/';

  axios.get(Url)
    .then(response => {
      response.data.forEach(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.textContent = option.name ; 
        selectElement.appendChild(elem);
        console.log(elem.value + '-a-'+ elem.textContent);
      });
    })
    .catch(error => {
      alert("Error al cargar la lista de modelos: " + error);
    });
}
function unitformatter(value, row, index, field){
  if (value !== null && value !== undefined) {
    var originalSelectOptions = $('#unit option').clone();
    var selectHTML = '<select class="form-select">';
    originalSelectOptions.each(function() {
      selectHTML += '<option value="' + $(this).val() + '"';
      if ($(this).val() == value) {
        selectHTML += ' selected';
      }
      selectHTML += '>' + $(this).text() + '</option>';
    });
    selectHTML += '</select>';
    return selectHTML;
  } else {
    return ''; // O cualquier otro valor predeterminado que desees mostrar
  }
}
function statusformatter(value, row, index, field){
  if (value !== null && value !== undefined) {
    var originalSelectOptions = $('#status option').clone();
    var selectHTML = '<select class="form-select">';
    originalSelectOptions.each(function() {
      selectHTML += '<option value="' + $(this).val() + '"';
      if ($(this).val() == value) {
        selectHTML += ' selected';
      }
      selectHTML += '>' + $(this).text() + '</option>';
    });
    selectHTML += '</select>';
    return selectHTML;
  } else {
    return ''; // O cualquier otro valor predeterminado que desees mostrar
  }
}
function tpformatter(value, row, index, field){
  if (value !== null && value !== undefined) {
    var originalSelectOptions = $('#typeProduct option').clone();
    var selectHTML = '<select class="form-select">';
    originalSelectOptions.each(function() {
      selectHTML += '<option value="' + $(this).val() + '"';
      if ($(this).val() == value) {
        selectHTML += ' selected';
      }
      selectHTML += '>' + $(this).text() + '</option>';
    });
    selectHTML += '</select>';
    return selectHTML;
  } else {
    return ''; // O cualquier otro valor predeterminado que desees mostrar
  }
}
function modelformatter(value, row, index, field){
  if (value !== null && value !== undefined) {
    var originalSelectOptions = $('#modelId option').clone();
    var selectHTML = '<select class="form-select">';
    originalSelectOptions.each(function() {
      selectHTML += '<option value="' + $(this).val() + '"';
      if ($(this).val() == value) {
        selectHTML += ' selected';
      }
      selectHTML += '>' + $(this).text() + '</option>';
    });
    selectHTML += '</select>';
    return selectHTML;
  } else {
    return ''; // O cualquier otro valor predeterminado que desees mostrar
  }
}
async function getProduct() {
  const name         = document.getElementById('name').value;
  //const description  = name;
  const modelId      = document.getElementById('modelId').value;
  const typeProduct  = document.getElementById('typeProduct').value;
  const status       = document.getElementById('status').value;
  const unit         = document.getElementById('unit').value;
  try{
  
    $('#productT').bootstrapTable('destroy');
    let params = '?';

    if(name){
       params = params + `name=${name}`;
    }
    //if(name){
    //  params = params + `&description=${name}`;
   // }

    if(modelId){
      params = params + `&modelId=${modelId}`;
    }

    if(typeProduct){
      params = params + `&typeProduct=${typeProduct}`;
    }

    if(status){
      params = params + `&status=${status}`;
    }

    if(unit){
      params = params + `&unit=${unit}`;
    }

    if(params == '?'){
      params = '';
    }
    const res = await axios.get('http://localhost:8000/products/' + params);
    const data = res.data;
  
    
    
    $('#productT').bootstrapTable({
        data: data,
        pagination: true, // Habilita la paginación
        pageSize: 8, // Establece la cantidad de filas por página
      });

  } catch (error){
    alert('Error al obtener las modelos'+ error);
  }

}

 function newProduct() {
  const forms = document.getElementById('fnewProduct');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    data[key]=value;
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8000/createProduct/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha guardado correctamente el producto');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeProduct();
}
async function createProduct() {
    ipcRenderer.send("create-product");
}

async function closeProduct(){
  ipcRenderer.send("close-Product");
}