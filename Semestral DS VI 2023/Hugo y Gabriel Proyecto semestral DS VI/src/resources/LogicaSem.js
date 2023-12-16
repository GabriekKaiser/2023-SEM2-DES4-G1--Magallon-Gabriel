const form = document.getElementById('quantity-form');
const quantityInput = document.getElementById('quantity-input');
const response = document.getElementById('response');

// Función para generar un número pseudoaleatorio
const anyNumber = () => {
  return Math.floor(Math.random() * 99) + 1;
}

function generateStructure(quantity) {
  let cardsHTML = '';
  for (let i = 1; i <= quantity; i++) {
    cardsHTML += '<div>';
    for (let j = 0; j < i; j++) {
      cardsHTML += `<div class="square">${anyNumber()}</div>`;
    }
    cardsHTML += '</div>';
  }
  response.innerHTML = cardsHTML;
  
  const { maxPath, maxSum, numbersInPath } = calculateMaxPath(response, quantity);
  highlightPath(maxPath);

  const sumRandomNumbers = document.getElementById('sum-random-numbers');
  sumRandomNumbers.textContent = `Suma de la ruta con mayor peso: ${calculateSum(numbersInPath)}`;

  const pathNumbers = document.getElementById('path-numbers');
  pathNumbers.textContent = `Números en la ruta: ${numbersInPath.join('-')}`;

}

// Función para obtener y mostrar las estructuras almacenadas
function showStructures(piramideData) {
  fetch('http://localhost:4567/piramide',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
      body: JSON.stringify({piramide: piramideData})
    })
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Error al enviar la piramide al servidor');
      })
      .then(data =>{
          console.log('piramide enviada al servidor :', data);
      })
      .catch(error =>{
          console.error ('Error :', error);
      })
}


// Manejar el clic en el botón de regenerar
const regenerateButton = document.getElementById('regenerate-button');
regenerateButton.addEventListener('click', function () {
  const quantity = parseInt(quantityInput.value);
  if (!isNaN(quantity) && quantity >= 1 && quantity <= 50) {
    const response2 = document.getElementById('response2');
    response2.innerHTML += `<div class="square2">${quantity}</div>`;

    generateStructure(quantity);
    const piramideData = response.innerHTML; // Obtén los datos de la pirámide generada
    showStructures(piramideData);
  } else {
    alert('Por favor, introduce un número entre 1 y 50.');
  }
});

document.getElementById('response2').addEventListener('click', function (event) {
  const clickedSquare = event.target;
  const piramideData = clickedSquare.dataset.piramide;

  if (piramideData) {
      // Redireccionar a la nueva página y pasar los datos como parámetro en la URL
      window.location.href = `datos.html?piramide=${encodeURIComponent(piramideData)}`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Obtener los datos de la URL
  const params = new URLSearchParams(window.location.search);
  const piramideData = params.get('piramide');

  if (piramideData) {
      // Mostrar los datos almacenados en cuadros en la nueva página
      const storedPiramide = document.getElementById('stored-piramide');
      storedPiramide.innerHTML = piramideData;
  } else {
      alert('No se proporcionaron datos válidos.');
  }
});

// Función para calcular la ruta con mayor peso entre cuadros adyacentes
function calculateMaxPath(cards, quantity) {
  const rows = cards.children;
  const matrix = [];
  for (let i = 0; i < rows.length; i++) {
    const squares = rows[i].children;
    matrix.push([]);
    for (let j = 0; j < squares.length; j++) {
      matrix[i].push(parseInt(squares[j].textContent));
    }
  }

  for (let i = quantity - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      matrix[i][j] += Math.max(matrix[i + 1][j], matrix[i + 1][j + 1]);
    }
  }

  const maxPath = [];
  let maxSum = 0;

  let colIndex = 0;
  for (let i = 0; i < quantity - 1; i++) {
    maxPath.push(colIndex + (i * (i + 1)) / 2);
    maxSum += matrix[i][colIndex];

    if (matrix[i + 1][colIndex] < matrix[i + 1][colIndex + 1]) {
      colIndex++;
    }
  }
  maxPath.push(colIndex + ((quantity - 1) * quantity) / 2);
  maxSum += matrix[quantity - 1][colIndex];

  // Encontrar los números de la ruta
  const squares = cards.querySelectorAll('.square');
  const numbersInPath = [];
  squares.forEach((square, index) => {
    if (maxPath.includes(index)) {
      numbersInPath.push(parseInt(square.textContent));
    }
  });

  return { maxPath, maxSum, numbersInPath };
}

// Función para resaltar la ruta con mayor peso, incluyendo los números
function highlightPath(maxPath) {
  const squares = response.querySelectorAll('.square');
  squares.forEach((square, index) => {
    if (maxPath.includes(index)) {
      square.classList.add('highlight');
      square.innerHTML = `<span>${square.textContent}</span>`;
    } else {
      square.classList.remove('highlight');
      square.innerHTML = square.textContent;
    }
  });
}

// Función para calcular la suma de los números en la ruta
function calculateSum(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

// Manejar el envío del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const quantity = parseInt(quantityInput.value);
  if (!isNaN(quantity) && quantity >= 1 && quantity <= 50) {
    generateStructure(quantity);
  } else {
    alert('Por favor, introduce un número entre 1 y 50.');
  }
});




