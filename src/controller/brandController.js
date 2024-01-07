const axios = require('axios');
const { ipcRenderer} = require('electron');
async function getBrands() {
  try{
    const brandName = document.getElementById('brandName').value;
    let params = '';

    if(brandName){
       params = `?name=${brandName}`;
    }
    const res = await axios.get('http://127.0.0.1:8000/brands/' + params);
    const data = res.data;
    
    $('#brandT').bootstrapTable('destroy');
    
    $('#brandT').bootstrapTable({
        data: data,
        pagination: true, // Habilita la paginación
        pageSize: 8, // Establece la cantidad de filas por página
      });

  } catch (error){
    alert('Error al obtener las marcas'+ error);
  }

}

 function newBrand() {
  const forms = document.getElementById('fnewbrand');
  const newForms = new FormData(forms);
  const data = {};
  for (let [key, value] of newForms.entries()) {
    data[key]=value;
  }
  const queryParams = new URLSearchParams(data).toString();
  const url = `http://localhost:8000/createBrand/?${queryParams}`;
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};
  try {
    const response = axios.post(url, {}, { headers: headers });
    alert('Se ha guardado correctamente la marca');
  } catch (error) {
    alert('Error:' +  error);
  }
  closeBrand();
}
async function createBrand() {
    ipcRenderer.send("create-brand");
}

async function closeBrand(){
  ipcRenderer.send("close-brand");
}