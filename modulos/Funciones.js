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

const pintarTarjetasCheckbox = async () => {
  const data = await obtenerData();
  const cardContainerMain = document.getElementById('cardh');
  cardContainerMain.innerHTML = '';

  const checkboxContainer = document.getElementById('contenedorCheckboxes');
  checkboxContainer.innerHTML = '';

  const categorias = [...new Set(data.map(event => event.category))];

  const input = document.getElementById('textoIndex');

  input.addEventListener('keydown'||'click', () => {
    const valorInput = input.value.toLowerCase();
    const tarjetasFiltradas = data.filter(event => event.name.toLowerCase().includes(valorInput));
  
    cardContainerMain.innerHTML = '';
  
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
  
        cardContainerMain.appendChild(card);
      });
    } else {
      alert('La información proporcionada no coincide, favor de verificar');
    }
  });

  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = categoria;
    checkbox.id = categoria;

    const label = document.createElement('label');
    label.textContent = categoria;
    label.htmlFor = categoria;

    checkbox.addEventListener('change', () => {
        cardContainerMain.innerHTML = '';

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

      cardContainerMain.appendChild(card);
    });
}
});

checkboxContainer.appendChild(checkbox);
checkboxContainer.appendChild(label);
checkboxContainer.appendChild(document.createElement('br'));

});
}

pintarTarjetasCheckbox();

// Aqui comienzan las tarjetas pasadas

export const crearTarjetasPasadas = async () => {
  const data = await obtenerData();
  const cardContainerP = document.getElementById('cardp');
  
  cardContainerP.innerHTML = '';

  const fechaActual = new Date("2023-03-10");
  const eventosPasados = data.filter((event) => {
    const fechaEvento = new Date(event.date);
    return fechaEvento < fechaActual;
  });

  eventosPasados.forEach((event) => {
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

    cardContainerP.appendChild(card);
  });

};

crearTarjetasPasadas();

export const filtrarTarjetasPasadas = async () => {
  const data = await obtenerData();
  const  cardContainerP= document.getElementById('cardp');
  cardContainerP.innerHTML = '';

  const fechaActual = new Date("2023-03-10");
  const eventosPasados = data.filter((event) => {
    const fechaEvento = new Date(event.date);
    return fechaEvento < fechaActual;
  });

  // Filtro del input
  const inputFiltro = document.getElementById('textoPast');
  inputFiltro.addEventListener('keyup', (e) => {
    const filtro = e.target.value.toLowerCase();
    const eventosFiltrados = eventosPasados.filter((event) => {
      return event.name.toLowerCase().includes(filtro) || event.description.toLowerCase().includes(filtro);
    });
    renderizarTarjetas(eventosFiltrados);
  });

  const renderizarTarjetas = (eventos) => {
    cardContainerP.innerHTML = '';
    eventos.forEach((event) => {
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

      cardContainerP.appendChild(card);
    }) 
  };

  renderizarTarjetas(eventosPasados);

  // Filtro de checkbox variables

const dataFilterPast = await obtenerData();
const fechaPastActual = new Date("2023-03-10");
const eventosPasadosFilter = dataFilterPast.filter((event) => {
  const fechaEvento = new Date(event.date);
  return fechaEvento < fechaPastActual;
});
// Filtro de checkbox lo que se va a poner
const renderizarTarjetasPast = (eventos) => {
  cardContainerP.innerHTML = '';
  eventos.forEach((event) => {
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

    cardContainerP.appendChild(card);
  });
};

// Filtro de checkbox valores a tomar en cuanta

const checkboxFiltro = document.getElementById('contenedorCheckboxesP');
checkboxFiltro.innerHTML = '';

const categorysPast = [...new Set(eventosPasadosFilter.map(event => event.category))];

categorysPast.forEach(categoria => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = categoria;
  checkbox.name = 'categoria';

  const label = document.createElement('label');
  label.textContent = categoria;
  label.htmlFor = categoria;

  checkboxFiltro.appendChild(checkbox);
  checkboxFiltro.appendChild(label);
  checkboxFiltro.appendChild(document.createElement('br'));

  checkbox.addEventListener('change', () => {
    const categoriasSeleccionadas = [];
    const checkboxes = document.querySelectorAll('input[name="categoria"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        categoriasSeleccionadas.push(checkbox.id);
      }
    });

    const eventosFiltrados = eventosPasados.filter(event => {
      return categoriasSeleccionadas.includes(event.category);
    });

    renderizarTarjetasPast(eventosFiltrados);
  });
});

} 

filtrarTarjetasPasadas();



// Aqui comienzan eventos futuros

export const filtrarTarjetasFuturas = async () => {
  const data = await obtenerData();
  const cardContainerUp = document.getElementById('cardu');
  cardContainerUp.innerHTML = '';
  const eventosFuturos = data.filter((event) => {
    const fechaEvento = new Date(event.date);
    const fechaActual = new Date("2023-03-10");
    return fechaEvento > fechaActual;
  });console.log(data);
  
   // Filtro del input
   const inputFiltro = document.getElementById('textoFut');
   inputFiltro.addEventListener('keyup', (e) => {
     const filtro = e.target.value.toLowerCase();
     const eventosFiltrados = eventosFuturos.filter((event) => {
       return event.name.toLowerCase().includes(filtro) || event.description.toLowerCase().includes(filtro);
     });
     renderizarTarjetas(eventosFiltrados);
   });
 
   const renderizarTarjetas = (eventos) => {
     cardContainerUp.innerHTML = '';
     eventos.forEach((event) => {
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
 
       cardContainerUp.appendChild(card);
     });
   };
 
   renderizarTarjetas(eventosFuturos);
 };

filtrarTarjetasFuturas();

// Filtro de checkbox variables
const cardContainerUp = document.getElementById('cardu');
cardContainerUp.innerHTML = '';
const data = await obtenerData();
const fechaActual = new Date("2023-03-10");
const eventosFuturos = data.filter((event) => {
  const fechaEvento = new Date(event.date);
  return fechaEvento > fechaActual;
});
// Filtro de checkbox lo que se va a poner
const renderizarTarjetas = (eventos) => {
  cardContainerUp.innerHTML = '';
  eventos.forEach((event) => {
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

    cardContainerUp.appendChild(card);
  });
};

// Filtro de checkbox valores a tomar en cuanta

const checkboxFiltroUp = document.getElementById('contenedorCheckboxesF');
checkboxFiltroUp.innerHTML = '';

const categorias = [...new Set(eventosFuturos.map(event => event.category))];
categorias.forEach(categoria => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = categoria;
  checkbox.name = 'categoria';

  const label = document.createElement('label');
  label.textContent = categoria;
  label.htmlFor = categoria;

  checkboxFiltroUp.appendChild(checkbox);
  checkboxFiltroUp.appendChild(label);
  checkboxFiltroUp.appendChild(document.createElement('br'));

  checkbox.addEventListener('change', () => {
    const categoriasSeleccionadas = [];
    const checkboxes = document.querySelectorAll('input[name="categoria"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        categoriasSeleccionadas.push(checkbox.id);
      }
    });

    const eventosFiltrados = eventosFuturos.filter(event => {
      return categoriasSeleccionadas.includes(event.category);
    });

    renderizarTarjetas(eventosFiltrados);
  });
});

// Esta rescatable