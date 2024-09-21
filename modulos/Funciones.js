 export const obtenerData = async () => {
  try {
    const respuesta = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
    const data = await respuesta.json();
    return data.events;
  } catch (error) {
    console.error(error);
  }
};

export const pintarTarjetas = async () => {
  const data = await obtenerData();
  const cardContainerMain = document.getElementById('cardm');
  

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

    cardContainerMain.appendChild(card);
  });
  
};

pintarTarjetas();

function aplicarFiltros(data, textoFiltro, categoriasFiltradas) {
  return data.filter(event => {
    const coincideTexto = event.name.toLowerCase().includes(textoFiltro.toLowerCase());
    const coincideCategoria = categoriasFiltradas.length === 0 || categoriasFiltradas.includes(event.category);
    return coincideTexto && coincideCategoria;
  });
}

const pintarTarjetasCheckbox = async () => {
  const data = await obtenerData();
  const cardContainerMain = document.getElementById('cardh');
  const checkboxContainer = document.getElementById('contenedorCheckboxes');
  const input = document.getElementById('textoIndex');
  
  checkboxContainer.innerHTML = '';
  
  const categorias = [...new Set(data.map(event => event.category))];
  let categoriasFiltradas = [];
  
  function actualizarTarjetas() {
    const textoFiltro = input.value;
    const tarjetasFiltradas = aplicarFiltros(data, textoFiltro, categoriasFiltradas);
    
    cardContainerMain.innerHTML = '';
    document.getElementById('cardm').innerHTML = '';
    
    if (tarjetasFiltradas.length > 0) {
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
        cardDetails.href = `./Details.html?id=${event._id}`

        card.appendChild(cardTitle);
        card.appendChild(cardImage);
        card.appendChild(cardDescription);
        card.appendChild(cardPrice);
        card.appendChild(cardDetails);

      cardContainerMain.appendChild(card);
      });
    } else {
      cardContainerMain.innerHTML = '<p>No se encontraron resultados.</p>';
    }
  }
  
  input.addEventListener('input', actualizarTarjetas);
  
  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = categoria;
    checkbox.id = categoria;
    
    const label = document.createElement('label');
    label.textContent = categoria;
    label.htmlFor = categoria;
    
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        categoriasFiltradas.push(categoria);
      } else {
        categoriasFiltradas = categoriasFiltradas.filter(cat => cat !== categoria);
      }
      actualizarTarjetas();
    });
    
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement('br'));
  });
  
  actualizarTarjetas(); 
}

pintarTarjetasCheckbox();

// Aqui comienzan las tarjetas pasadas

export function crearTarjeta(event) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-3', 'col-md-4', 'col-sm-6', 'col-12');
  card.style.maxWidth = '18rem';
  card.style.backgroundColor = 'lightgreen'; 

  const cardImage = document.createElement('img');
  cardImage.src = event.image;
  cardImage.classList.add('card-img-top');
  cardImage.style.height = '200px';
  cardImage.style.objectFit = 'cover';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.textContent = event.name;
  cardTitle.classList.add('card-title');

  const cardDescription = document.createElement('p');
  cardDescription.textContent = event.description;
  cardDescription.classList.add('card-text');

  const cardPrice = document.createElement('p');
  cardPrice.textContent = "Costo: $" + event.price;
  cardPrice.classList.add('card-text');

  const cardDetails = document.createElement('a');
  cardDetails.textContent = "Detalles";
  cardDetails.href = `./Details.html?id=${event._id}`;
  cardDetails.classList.add('btn', 'btn-primary');

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardDetails);

  card.appendChild(cardImage);
  card.appendChild(cardBody);

  return card;
}

async function filtrarTarjetasPasadas() {
  const data = await obtenerData();
  const cardContainerP = document.getElementById('cardp');
  const inputFiltro = document.getElementById('textoPast');
  const checkboxFiltro = document.getElementById('contenedorCheckboxesP');

  const fechaActual = new Date("2023-03-10");
  const eventosPasados = data.filter((event) => new Date(event.date) < fechaActual);

  let categoriasFiltradas = [];

  function aplicarFiltros() {
    const textoFiltro = inputFiltro.value.toLowerCase();
    return eventosPasados.filter((event) => {
      const coincideTexto = event.name.toLowerCase().includes(textoFiltro) || 
                            event.description.toLowerCase().includes(textoFiltro);
      const coincideCategoria = categoriasFiltradas.length === 0 || 
                                categoriasFiltradas.includes(event.category);
      return coincideTexto && coincideCategoria;
    });
  }

  function renderizarTarjetas(eventos) {
    cardContainerP.innerHTML = '';
    const row = document.createElement('div');
    row.classList.add('row', 'g-3');

    eventos.forEach((event) => {
      const card = crearTarjeta(event);
      row.appendChild(card);
    });

    cardContainerP.appendChild(row);
  }

  inputFiltro.addEventListener('input', () => {
    const eventosFiltrados = aplicarFiltros();
    renderizarTarjetas(eventosFiltrados);
  });

  const categorias = [...new Set(eventosPasados.map(event => event.category))];
  checkboxFiltro.innerHTML = '';

  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = categoria;
    checkbox.name = 'categoria';

    const label = document.createElement('label');
    label.textContent = categoria;
    label.htmlFor = categoria;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        categoriasFiltradas.push(categoria);
      } else {
        categoriasFiltradas = categoriasFiltradas.filter(cat => cat !== categoria);
      }
      const eventosFiltrados = aplicarFiltros();
      renderizarTarjetas(eventosFiltrados);
    });

    checkboxFiltro.appendChild(checkbox);
    checkboxFiltro.appendChild(label);
    checkboxFiltro.appendChild(document.createElement('br'));
  });

  renderizarTarjetas(eventosPasados);
}

filtrarTarjetasPasadas();

// Aqui comienzan eventos futuros

export async function filtrarTarjetasFuturas() {
  const data = await obtenerData();
  const cardContainerUp = document.getElementById('cardu');
  const inputFiltro = document.getElementById('textoFut');
  const checkboxFiltroUp = document.getElementById('contenedorCheckboxesF');

  const fechaActual = new Date("2023-03-10");
  const eventosFuturos = data.filter((event) => new Date(event.date) > fechaActual);

  let categoriasFiltradas = [];

  function aplicarFiltros() {
    const textoFiltro = inputFiltro.value.toLowerCase();
    return eventosFuturos.filter((event) => {
      const coincideTexto = event.name.toLowerCase().includes(textoFiltro) || 
                            event.description.toLowerCase().includes(textoFiltro);
      const coincideCategoria = categoriasFiltradas.length === 0 || 
                                categoriasFiltradas.includes(event.category);
      return coincideTexto && coincideCategoria;
    });
  }

  function renderizarTarjetas(eventos) {
    cardContainerUp.innerHTML = '';
    const row = document.createElement('div');
    row.classList.add('row', 'g-3');

    eventos.forEach((event) => {
      const card = crearTarjeta(event);
      row.appendChild(card);
    });

    cardContainerUp.appendChild(row);
  }

  inputFiltro.addEventListener('input', () => {
    const eventosFiltrados = aplicarFiltros();
    renderizarTarjetas(eventosFiltrados);
  });

  const categorias = [...new Set(eventosFuturos.map(event => event.category))];
  checkboxFiltroUp.innerHTML = '';

  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = categoria;
    checkbox.name = 'categoria';

    const label = document.createElement('label');
    label.textContent = categoria;
    label.htmlFor = categoria;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        categoriasFiltradas.push(categoria);
      } else {
        categoriasFiltradas = categoriasFiltradas.filter(cat => cat !== categoria);
      }
      const eventosFiltrados = aplicarFiltros();
      renderizarTarjetas(eventosFiltrados);
    });

    checkboxFiltroUp.appendChild(checkbox);
    checkboxFiltroUp.appendChild(label);
    checkboxFiltroUp.appendChild(document.createElement('br'));
  });

  renderizarTarjetas(eventosFuturos);
}

filtrarTarjetasFuturas();