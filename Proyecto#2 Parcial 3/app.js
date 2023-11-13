const form = document.querySelector('form');
const response = document.querySelector('#response');
const response2 = document.querySelector('#response2');
// ----------------------------------------
//se crean los numeros aleatorios
const anyNumber = () => {
  return Math.floor(Math.random() * 98) + 1;
}
// Validacion de 1 al 5
function isValid(quantity) {
  return quantity < 1 || quantity > 50;
}
// Function de crear cuadros y introducir numeros aleatorios
function createCards(quantity) {
  let cards = '';
  saveNumbers = []; 
  for (let i = 1; i <= quantity; i++) {
    cards += `<div>`;
    for (let j = 1; j <= i; j++) {
      const randomNumber = anyNumber();
      cards += `<div class="square">${randomNumber}</div>`;
      saveNumbers.push(randomNumber); 
    }
    cards += `</div>`;
  }
  return cards;
}

//aqui llegan los numeros aleatorios para que solo haya 1 que esos se sumen
function getRandomNumbers(saveNumbers){
  const onlyOneValue = new Set(saveNumbers);
  let cards2 = '';
  const onlyOneArray = [...onlyOneValue];
  for(let i = 0; i < onlyOneArray.length; i++){
    cards2 += `<div class="square2">${onlyOneArray[i]}</div>`;
  }

  let total = onlyOneArray.reduce((acc, number) => acc + number, 0);
  cards2 += `<div class="result">${total}</div>`;

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

  const cards2 = getRandomNumbers(saveNumbers);
  drawCards2(cards2)
}

// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// ----------------------------------------