const obtenerData = async () => {
    try {
      const respuesta = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
      const data = await respuesta.json();
      return data.events;
    } catch (error) {
      console.error(error);
    }
  };
  
  const calcularEventoConMayorAsistencia = async () => {
    try {
      const eventos = await obtenerData();
      const eventoConMayorAsistencia = eventos.reduce((max, evento) => {
        const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
        if (porcentajeAsistencia > max.porcentajeAsistencia) {
          return { evento, porcentajeAsistencia };
        }
        return max;
      }, { evento: null, porcentajeAsistencia: 0 });
      return eventoConMayorAsistencia;
    } catch (error) {
      console.error(error);
    }
  };

  const vaciarResultado = async () => {
    try {
      const resultado = await calcularEventoConMayorAsistencia();
      const tdHighest = document.getElementById('highest');
      if (resultado.evento) {
        tdHighest.textContent = `${resultado.evento.name} (${resultado.porcentajeAsistencia.toFixed(2)}%)`;
      } else {
        tdHighest.textContent = 'No hay eventos registrados';
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  vaciarResultado();
  
  const calcularEventoConMenorAsistencia = async () => {
    try {
      const eventos = await obtenerData();
      const eventoConMenorAsistencia = eventos.reduce((min, evento) => {
        const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
        if (porcentajeAsistencia < min.porcentajeAsistencia) {
          return { evento, porcentajeAsistencia };
        }
        return min;
      }, { evento: null, porcentajeAsistencia: Infinity });
      return eventoConMenorAsistencia;
    } catch (error) {
      console.error(error);
    }
  };
  
  const vaciarResultadoMenorAsistencia = async () => {
    try {
      const resultado = await calcularEventoConMenorAsistencia();
      const tdLowest = document.getElementById('lowest');
      if (resultado.evento) {
        tdLowest.textContent = `${resultado.evento.name} (${resultado.porcentajeAsistencia.toFixed(2)}%)`;
      } else {
        tdLowest.textContent = 'No hay eventos registrados';
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  vaciarResultadoMenorAsistencia();

  const calcularEventoConMayorCapacidad = async () => {
    try {
      const eventos = await obtenerData();
      const eventoConMayorCapacidad = eventos.reduce((max, evento) => {
        if (evento.capacity > max.capacity) {
          return evento;
        }
        return max;
      }, { capacity: 0 });
      return eventoConMayorCapacidad;
    } catch (error) {
      console.error(error);
    }
  };
  
  const vaciarResultadoMayorCapacidad = async () => {
    try {
      const resultado = await calcularEventoConMayorCapacidad();
      const tdLargest = document.getElementById('largest');
      if (resultado) {
        tdLargest.textContent = `Evento: ${resultado.name} - Capacidad: ${resultado.capacity}`;
      } else {
        tdLargest.textContent = 'No hay eventos registrados';
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  vaciarResultadoMayorCapacidad();

  // Calculos de Pastevents

 const eventosPasados = async () => {
   try {
     const data = await obtenerData();
     const fechaActual = new Date("2023-03-10");
     const eventosFiltrados = data.filter((evento) => {
       const fechaEvento = new Date(evento.date);
       const resultado = [...new Set(data.map((evento) => evento.category))];
       const mostrarResultado = async () => {
         try {
           const data = await obtenerData();
           const resultado = [...new Set(data.map((evento) => evento.category))];
           const primerCategoria = resultado[0];
           const tdCategoria1 = document.getElementById('categoria1');
           tdCategoria1.textContent = primerCategoria;
         } catch (error) {
         }
       };

       const mostrarResultado1 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[1];
          const tdCategoria1 = document.getElementById('categoria2');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
      const mostrarResultado2 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[2];
          const tdCategoria1 = document.getElementById('categoria3');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
      const mostrarResultado3 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[3];
          const tdCategoria1 = document.getElementById('categoria4');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
      const mostrarResultado4 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[4];
          const tdCategoria1 = document.getElementById('categoria5');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
      const mostrarResultado5 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[5];
          const tdCategoria1 = document.getElementById('categoria6');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
      const mostrarResultado6 = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[6];
          const tdCategoria1 = document.getElementById('categoria7');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };
       
       mostrarResultado();
       mostrarResultado1();
       mostrarResultado2();
       mostrarResultado3();
       mostrarResultado4();
       mostrarResultado5();
       mostrarResultado6();
       
       return fechaEvento < fechaActual;
     });
     console.log(eventosFiltrados);
   } catch (error) {
     console.error(error);
   }
 };
 
eventosPasados();
