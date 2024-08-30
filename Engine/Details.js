const obtenerData = async () => {
    try {
      const respuesta = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
      const data = await respuesta.json();
      return data.events;
    } catch (error) {
      console.error(error);
    }
  };
  
 
    const urlParams = new URLSearchParams(window.location.search);
    const data = await obtenerData();
    const id = urlParams.get('id');
    const idCorregido= parseInt(id)-1;
    const evento = data.find(evento => data[idCorregido]._id === id+1);

    const contenedor = document.getElementById('eventDetails');
    
  
        let contenedorTarjetas= document.createElement('div');
        contenedorTarjetas.innerHTML = `
          <div class="card w-sm-50 w-lg-30" style="width: 18rem;">
            <img src="${data[idCorregido].image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[idCorregido].name}</h5>
              <p class="card-text">${data[idCorregido].description}</p>
              <div class="d-flex justify-content-between">
                <p>$ ${data[idCorregido].price} .00</p>
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(contenedorTarjetas);
    