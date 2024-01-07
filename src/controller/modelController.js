const ftp = require('basic-ftp');
const path = require('path'); // Asegúrate de importar el módulo path
const fs = require('fs');
function loadBrand() {
  const selectElement = document.getElementById('brandId');
  const Url = 'http://127.0.0.1:8000/brands/';

  axios.get(Url)
    .then(response => {
      response.data.forEach(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.textContent = option.name;
        selectElement.appendChild(elem);
        
      });
    })
    .catch(error => {
      alert("Error al cargar la lista de marcas: " + error);
    });
}

function genderFormatter(value, row, index, field) {
  if (value !== null && value !== undefined) {
    var originalSelectOptions = $('#gender option').clone();
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

 function brandFormatter(value, row, index, field) {
   // Obtener las marcas disponibles del select original con el ID brandId
   var originalSelectOptions = $('#brandId option').clone();

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
const client = new ftp.Client(); // Define la variable client
client.ftp.timeout = 1000;
 async function getModels() {

  await client.access({
      host: 'localhost',
      user: 'FTP_Lara',
      password: 'Lara1234*',
      secure: false
  });
  
  const brandId = document.getElementById('brandId').value;
  const name    = document.getElementById('name').value;
  const version = document.getElementById('version').value;
  const gender  = document.getElementById('gender').value;
  try{
  
    $('#modelsT').bootstrapTable('destroy');
    
    let params = '?';

    if(brandId){
       params = params + `brandId=${brandId}`;
    }

    if(name){
      params = params + `&name=${name}`;
    }

    if(version){
      params = params + `&version=${version}`;
    }
  
    if(gender){
      params = params + `&gender=${gender}`;
    }
    
    if(params == '?'){
      params = '';
    }
    
    const res = await axios.get('http://localhost:8000/models/' + params);
    const data = res.data;
  
    
    
    $('#modelsT').bootstrapTable({
        data: data,
        pagination: true, // Habilita la paginación
        pageSize: 8,
        columns: [
          // Otras columnas existentes...
          {
            field: 'img',
            title: 'Imagen',
            formatter:  (value, row, index) => {
              try {                 
                  const remoteFilePath = `/${row.name}_${row.version}.jpg`; // Ruta del archivo en el servidor FTP
                  const currentDirectory = process.cwd(); 
                  console.log(currentDirectory);
                  const localFilePath = path.join(currentDirectory, `${row.name}_${row.version}.jpg`); // Ruta local para descargar el archivo

                   client.download(fs.createWriteStream(localFilePath), remoteFilePath);

                  // Cerrar la conexión FTP
                  

                  return `<div id="imageContainer"><img src="${localFilePath}" alt="Imagen" style="max-width: 100px; max-height: 100px;" /></div>`;
              } catch (error) {
                  console.error('Error al descargar la imagen:', error);
                  return `<div id="imageContainer">Imagen no disponible</div>`;
              }
          }
          }
        ], 
      });
    
  } catch (error){
    alert('Error al obtener las modelos'+ error);
  }

}

 async function newModel() {
  const forms = document.getElementById('fnewModel');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    // Si el valor es un File (archivo), leerlo como Base64
    if (value instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function(event) {
        // Al cargar, obtener el contenido como Base64 y asignarlo a la entrada del FormData
        data[key] = event.target.result.split(',')[1];
      };
      // Esperar a que el archivo se lea completamente antes de continuar
      await new Promise(resolve => {
        reader.onloadend = resolve;
      });
    } else {
      data[key] = value;
    }
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8000/createModel/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha guardado correctamente el modelo');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeModel();
}
async function createModel() {
    ipcRenderer.send("create-model");   
}

async function closeModel(){
  ipcRenderer.send("close-model");
}