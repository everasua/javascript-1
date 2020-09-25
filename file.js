// Datos iniciales de la tabla
const persons = [
  {name: 'Carlos',surname: 'Casaluenga',telephone:'987654321',numberDoc:'12345678-A',sports:['Fútbol','Padel']},
  {name: 'Jesus',surname: 'Cardenas',telephone:'987654999',numberDoc:'12345678-Z',sports:['Rugby','Pelota vasca']}
];
// Referencia a la tabla del HTML
const table = document.getElementById('table');

/** Establece el título de la noticia
 * 
 * @param {Number} value Número de noticia
 */
function setNewsName(value) {
  document.getElementById('newsName').textContent = `Mi Noticia ${value}`;
};
/** Comprueba que el objeto person tiene los datos necesarios para poder guardarse en la tabla
 * 
 * @param {Object} person 
 */
function checkFormData(person) {
  return person.name !== '' && person.surname !== '' && person.telephone !== '' && person.numberDoc !== '' && person.sports.length > 0;
}
/** Genera la tabla de manera dinámica
 * 
 * @param {HTMLElement} table Referencia a la tabla del HTML
 * @param {Array} data Filas de la tabla a añadir
 */
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// Se genera la tabla
generateTable(table,persons);

// Listener del submit del formulario
document.forms.namedItem('form').addEventListener('submit', function(event) {
  const formData = new FormData(document.forms.namedItem('form'));
  const person = {};
  let sports = [];
  for (var value of formData.entries()) {
    if (value.length === 2) {
      if(value[0]=== 'sports') {
        sports.push(value[1]);
       } else if (!['document', 'brothers'].includes(value[0])) {
        person[value[0]] = value[1];
       }
    }
  }
  person['sports'] = sports;
  if (checkFormData(person)) {
    persons.push(person);
    generateTable(table,[person]);
  } else {
    alert('No se han completado todos los campos.');
  }
  event.preventDefault();
})




