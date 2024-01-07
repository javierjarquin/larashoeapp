function iscreditformatter(value, row, index, field){
  if (value =='0'){
    return 'No';
  } else {
    return 'Si';
  }    
}

function tproviderformatter(value, row, index, field){
  if (value != null && value !=undefined){
    var selectop = '<select class="form-select">';
    
      selectop = selectop + '<option value="' + value + '" selected>'; 
      if (value == 'FI'){
        selectop += "Fisica</option>";
      }else if (value == 'MO'){
        selectop += "Moral</option>";
      } else{
        selectop += "Desconocido</option>";
      }

    selectop = selectop + '</select>'
    return selectop;
  } else{
    return '';
  }
}
async function getProvider() {
  const commercialName    = document.getElementById('commercialName').value;
  const fiscalName        = document.getElementById('fiscalName').value;
  const rfc               = document.getElementById('rfc').value;

  try{
    let params = '?';

    if(commercialName){
      params = params + `commercialName=${commercialName}`;
    }

    if(fiscalName){
      params = params + `&fiscalName=${fiscalName}`;
    }

    if(rfc){
      params = params + `&rfc=${rfc}`;
    }

    if(params == '?'){
      params = '';
    }
    const res = await axios.get('http://localhost:8000/providers/' + params);
    const data = res.data;
  
    $('#providerT').bootstrapTable('destroy');
    
    $('#providerT').bootstrapTable({
        data: data,
        pagination: true, // Habilita la paginación
        pageSize: 8, // Establece la cantidad de filas por página
      });

  } catch (error){
    alert('Error al obtener las modelos'+ error);
  }

}

 function newProvider() {
  const forms = document.getElementById('fnewProvider');
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
  const url = `http://localhost:8000/createProvider/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha guardado correctamente el proveedor');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeProvider();
}
async function createProvider() {
    ipcRenderer.send("create-provider");
}

async function closeProvider(){
  ipcRenderer.send("close-provider");
}