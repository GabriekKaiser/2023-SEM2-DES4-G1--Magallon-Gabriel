const form = document.querySelector('form');
const response = document.querySelector('#response');
const response2 = document.querySelector('#response2');
// ----------------------------------------

const anyNumber = () => {
  return Math.floor(Math.random() * 98) + 1;
}
// Validacion de 1 al 5
function isValid(quantity) {
  return quantity < 1 || quantity > 50;
}
// Function de crear cuadros
function createCards(quantity) {
  let cards = '';
  let storedNumbers = [];
  for (let i = 1; i <= quantity; i++) {
    cards += `<div>`;
    for (let j = 1; j <= i; j++) {
      const randomNumber = anyNumber();
      cards += `<div class="square">${randomNumber}</div>`;
      //Store numbers se estan almacenando los numeros lo puedes ver en el console log
      storedNumbers.push(randomNumber);
    }
    cards += `</div>`;
  }
  console.log(storedNumbers);

  return cards;
}
//Aqui Dberian llegar lo valores del randomNumber para imprimirlos en el #Response2
function getRandomNumbers(quantity){
  let cards2 = '';
  for(let i = 1; i <= quantity; i++){
    for(let j = 1; j <= i; j++){
      const randomNumber = anyNumber();
      cards2 += `<div class="square2">${randomNumber}</div>`;
    }
  }
return cards2;
}

//------------------------------------
function drawCards2(cards2) {
  response2.innerHTML = cards2;
}
//----------------------------
function drawCards(cards) {
  response.innerHTML = cards;
}
// ----------------------------------------

// Event Handlers
function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const quantity = formData.get('quantity');
  if (isValid(quantity)) {
    alert('Error');
    return;
  }

  const cards = createCards(quantity);
  drawCards(cards);

  const cards2 = getRandomNumbers(quantity);
  drawCards2(cards2)
}

// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// ----------------------------------------