const obtenerData = async () => {
  try {
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await respuesta.json();
    return data.events;
  } catch (error) {
    console.error(error);
  }
};

const pintarTarjetas = async () => {
  const data = await obtenerData();
  const cardContainer = document.getElementById('cardm');
  cardContainer.innerHTML = '';

  data.forEach((event) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImage = document.createElement('img');
    cardImage.src = event.image;

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = event.name;

    const cardDescription = document.createElement('p');
    cardDescription.textContent = event.description;

    const cardPrice = document.createElement('p');
    cardPrice.textContent = "Costo:$" + event.price;

    const cardDetails = document.createElement('a');
    cardDetails.textContent = "Detalles";
    cardDetails.href = `./Details.html?id=${event._id}`

    card.appendChild(cardTitle);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardDetails);

    cardContainer.appendChild(card);
  });
};

pintarTarjetas();

const pintarTarjetasCheckbox = async () => {
  const data = await obtenerData();
  const cardContainer = document.getElementById('cardh');
  cardContainer.innerHTML = '';

  const checkboxContainer = document.getElementById('contenedorCheckboxes');
  checkboxContainer.innerHTML = '';

  const categorias = [...new Set(data.map(event => event.category))];

  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = categoria;
    checkbox.id = categoria;

    const label = document.createElement('label');
    label.textContent = categoria;
    label.htmlFor = categoria;

    checkbox.addEventListener('change', () => {
        cardContainer.innerHTML = '';

    if (checkbox.checked) {
        const cardMainContainer = document.getElementById('cardm');
        cardMainContainer.innerHTML = '';
        const tarjetasCategoria = data.filter(event => event.category === categoria);

    tarjetasCategoria.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
    
        const cardImage = document.createElement('img');
        cardImage.src = event.image;
    
        const cardTitle = document.createElement('h2');
        cardTitle.textContent = event.name;
    
        const cardDescription = document.createElement('p');
        cardDescription.textContent = event.description;
    
        const cardPrice = document.createElement('p');
        cardPrice.textContent = "Costo:$" + event.price;
    
        const cardDetails = document.createElement('a');
        cardDetails.textContent = "Detalles";
        cardDetails.href = `./Details.html?id=${event._id}`

        card.appendChild(cardTitle);
        card.appendChild(cardImage);
        card.appendChild(cardDescription);
        card.appendChild(cardPrice);
        card.appendChild(cardDetails);

      cardContainer.appendChild(card);
    });
}
});

checkboxContainer.appendChild(checkbox);
checkboxContainer.appendChild(label);
checkboxContainer.appendChild(document.createElement('br'));

});
}

pintarTarjetasCheckbox();

const input = document.getElementById('textoIndex');
const boton = document.getElementById('botonIndex');
const cardContainer = document.getElementById('cardh');
const data = await obtenerData();

input.addEventListener('click', () => {
  const valorInput = input.value.toLowerCase();
  const tarjetasFiltradas = data.filter(event => event.name.toLowerCase().includes(valorInput));

  cardContainer.innerHTML = '';

  if (tarjetasFiltradas.length > 0) {
    const cardMainContainer = document.getElementById('cardm');
        cardMainContainer.innerHTML = '';
    tarjetasFiltradas.forEach(event => {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardImage = document.createElement('img');
      cardImage.src = event.image;

      const cardTitle = document.createElement('h2');
      cardTitle.textContent = event.name;

      const cardDescription = document.createElement('p');
      cardDescription.textContent = event.description;

      const cardPrice = document.createElement('p');
      cardPrice.textContent = "Costo:$" + event.price;

      const cardDetails = document.createElement('a');
      cardDetails.textContent = "Detalles";
      cardDetails.href = `./Details.html?id=${event._id}`;

      card.appendChild(cardTitle);
      card.appendChild(cardImage);
      card.appendChild(cardDescription);
      card.appendChild(cardPrice);
      card.appendChild(cardDetails);

      cardContainer.appendChild(card);
    });
  } else {
    alert('La información proporcionada no coincide, favor de verificar');
  }
});

