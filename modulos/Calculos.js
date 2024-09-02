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
     const calculateGananciasPorCategoria = (eventosFiltrados) => {
       const gananciasPorCategoria = {};
     
       eventosFiltrados.forEach((event) => {
         const categoria = event.category;
         const revenue = event.assistance * event.price;
     
         if (gananciasPorCategoria[categoria]) {
           gananciasPorCategoria[categoria].revenue += revenue;
         } else {
           gananciasPorCategoria[categoria] = { revenue };
         }
       });
     
       return gananciasPorCategoria;
     };
     
     const calculatePorcentajeAsistenciaPorCategoria = (eventosFiltrados) => {
       const porcentajeAsistenciaPorCategoria = {};
     
       eventosFiltrados.forEach((event) => {
         const categoria = event.category;
         const capacidad = event.capacity;
         const asistencia = event.assistance;
         const porcentajeAsistencia = (asistencia / capacidad) * 100;
     
         if (porcentajeAsistenciaPorCategoria[categoria]) {
           porcentajeAsistenciaPorCategoria[categoria].push(porcentajeAsistencia);
         } else {
           porcentajeAsistenciaPorCategoria[categoria] = [porcentajeAsistencia];
         }
       });
     
       // Calcula el promedio del porcentaje de asistencia por categoría
       Object.keys(porcentajeAsistenciaPorCategoria).forEach((categoria) => {
         const porcentajes = porcentajeAsistenciaPorCategoria[categoria];
         const promedio = porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length;
         porcentajeAsistenciaPorCategoria[categoria] = promedio.toFixed(2);
       });
     
       return porcentajeAsistenciaPorCategoria;
     };

     const porcentajeAsistenciaPorCategoria = calculatePorcentajeAsistenciaPorCategoria(eventosFiltrados);

     const primerPorcentaje = porcentajeAsistenciaPorCategoria["Food"];
     const segundoPorcentaje = porcentajeAsistenciaPorCategoria["Museum"];
     const terceroPorcentaje = porcentajeAsistenciaPorCategoria["Concert"];
     const cuartoPorcentaje = porcentajeAsistenciaPorCategoria["Race"];
     const quintoPorcentaje = porcentajeAsistenciaPorCategoria["Books"];
     const sextoPorcentaje = porcentajeAsistenciaPorCategoria["Cinema"];
     const septimoPorcentaje = porcentajeAsistenciaPorCategoria["Party"];
     const tdPorcentaje1 = document.getElementById('porcentaje1');
     const tdPorcentaje2 = document.getElementById('porcentaje2');
     const tdPorcentaje3 = document.getElementById('porcentaje3');
     const tdPorcentaje4 = document.getElementById('porcentaje4');
     const tdPorcentaje5 = document.getElementById('porcentaje5');
     const tdPorcentaje6 = document.getElementById('porcentaje6');
     const tdPorcentaje7 = document.getElementById('porcentaje7');
     tdPorcentaje1.textContent = primerPorcentaje;
     tdPorcentaje2.textContent = segundoPorcentaje;
     tdPorcentaje3.textContent = terceroPorcentaje;
     tdPorcentaje4.textContent = cuartoPorcentaje;
     tdPorcentaje5.textContent = quintoPorcentaje;
     tdPorcentaje6.textContent = sextoPorcentaje;
     tdPorcentaje7.textContent = septimoPorcentaje;
     
     const gananciaPorCategoria = calculateGananciasPorCategoria(eventosFiltrados);
     
        const resultado = gananciaPorCategoria;
        const primerCategoria = resultado["Food"].revenue;
        const segundaCategoria= resultado["Museum"].revenue;
        const terceraCategoria= resultado["Concert"].revenue;
        const cuartaCategoria= resultado["Race"].revenue;
        const quintaCategoria= resultado["Books"].revenue;
        const sextaCategoria= resultado["Cinema"].revenue;
        const septimaCategoria= resultado["Party"].revenue;
        const tdCategoria1 = document.getElementById('revenue1');
        const tdCategoria2 = document.getElementById('revenue2');
        const tdCategoria3 = document.getElementById('revenue3');
        const tdCategoria4 = document.getElementById('revenue4');
        const tdCategoria5 = document.getElementById('revenue5');
        const tdCategoria6 = document.getElementById('revenue6');
        const tdCategoria7 = document.getElementById('revenue7');
        tdCategoria1.textContent = primerCategoria;
        tdCategoria2.textContent = segundaCategoria;
        tdCategoria3.textContent = terceraCategoria;
        tdCategoria4.textContent = cuartaCategoria;
        tdCategoria5.textContent = quintaCategoria;
        tdCategoria6.textContent = sextaCategoria;
        tdCategoria7.textContent = septimaCategoria;
      } catch (error) {
     console.error(error);
   }
  };
eventosPasados();


// Calculos de upcoming events

const eventosFuturos = async () => {
  try {
    const data = await obtenerData();
    const fechaActual = new Date("2023-03-10");
    const eventosFiltrados = data.filter((evento) => {
      const fechaEvento = new Date(evento.date);
      const mostrarResultado = async () => {
        try {
          const data = await obtenerData();
          const resultado = [...new Set(data.map((evento) => evento.category))];
          const primerCategoria = resultado[0];
          const tdCategoria1 = document.getElementById('categoriaF1');
          tdCategoria1.textContent = primerCategoria;
        } catch (error) {
        }
      };

      const mostrarResultado1 = async () => {
       try {
         const data = await obtenerData();
         const resultado = [...new Set(data.map((evento) => evento.category))];
         const primerCategoria = resultado[1];
         const tdCategoria1 = document.getElementById('categoriaF2');
         tdCategoria1.textContent = primerCategoria;
       } catch (error) {
       }
     };
     const mostrarResultado2 = async () => {
       try {
         const data = await obtenerData();
         const resultado = [...new Set(data.map((evento) => evento.category))];
         const primerCategoria = resultado[2];
         const tdCategoria1 = document.getElementById('categoriaF3');
         tdCategoria1.textContent = primerCategoria;
       } catch (error) {
       }
     };
     const mostrarResultado3 = async () => {
       try {
         const data = await obtenerData();
         const resultado = [...new Set(data.map((evento) => evento.category))];
         const primerCategoria = resultado[3];
         const tdCategoria1 = document.getElementById('categoriaF4');
         tdCategoria1.textContent = primerCategoria;
       } catch (error) {
       }
     };
     const mostrarResultado4 = async () => {
       try {
         const data = await obtenerData();
         const resultado = [...new Set(data.map((evento) => evento.category))];
         const primerCategoria = resultado[4];
         const tdCategoria1 = document.getElementById('categoriaF5');
         tdCategoria1.textContent = primerCategoria;
       } catch (error) {
       }
     };
     const mostrarResultado6 = async () => {
       try {
         const data = await obtenerData();
         const resultado = [...new Set(data.map((evento) => evento.category))];
         const primerCategoria = resultado[6];
         const tdCategoria1 = document.getElementById('categoriaF7');
         tdCategoria1.textContent = primerCategoria;
       } catch (error) {
       }
     };
      
      mostrarResultado();
      mostrarResultado1();
      mostrarResultado2();
      mostrarResultado3();
      mostrarResultado4();
      mostrarResultado6();
      
      return fechaEvento > fechaActual;
    });
    
    const calculateGananciasPorCategoria = (eventosFiltrados) => {
      const gananciasPorCategoria = {};
    
      eventosFiltrados.forEach((event) => {
        const categoria = event.category;
        const revenue = event.estimate * event.price;
    
        if (gananciasPorCategoria[categoria]) {
          gananciasPorCategoria[categoria].revenue += revenue;
        } else {
          gananciasPorCategoria[categoria] = { revenue };
        }
      });
    
      return gananciasPorCategoria;
    };
    
    const calculatePorcentajeAsistenciaPorCategoria = (eventosFiltrados) => {
      const porcentajeAsistenciaPorCategoria = {};
    
      eventosFiltrados.forEach((event) => {
        const categoria = event.category;
        const capacidad = event.capacity;
        const asistencia = event.estimate;
        const porcentajeAsistencia = (asistencia / capacidad) * 100;
    
        if (porcentajeAsistenciaPorCategoria[categoria]) {
          porcentajeAsistenciaPorCategoria[categoria].push(porcentajeAsistencia);
        } else {
          porcentajeAsistenciaPorCategoria[categoria] = [porcentajeAsistencia];
        }
      });
    
      // Calcula el promedio del porcentaje de asistencia por categoría
      Object.keys(porcentajeAsistenciaPorCategoria).forEach((categoria) => {
        const porcentajes = porcentajeAsistenciaPorCategoria[categoria];
        const promedio = porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length;
        porcentajeAsistenciaPorCategoria[categoria] = promedio.toFixed(2);
      });
    
      return porcentajeAsistenciaPorCategoria;
    };

    const porcentajeAsistenciaPorCategoria = calculatePorcentajeAsistenciaPorCategoria(eventosFiltrados);

    const primerPorcentaje = porcentajeAsistenciaPorCategoria["Food"];
    const segundoPorcentaje = porcentajeAsistenciaPorCategoria["Museum"];
    const terceroPorcentaje = porcentajeAsistenciaPorCategoria["Concert"];
    const cuartoPorcentaje = porcentajeAsistenciaPorCategoria["Race"];
    const quintoPorcentaje = porcentajeAsistenciaPorCategoria["Books"];
    const septimoPorcentaje = porcentajeAsistenciaPorCategoria["Party"];
    const tdPorcentaje1 = document.getElementById('porcentajeF1');
    const tdPorcentaje2 = document.getElementById('porcentajeF2');
    const tdPorcentaje3 = document.getElementById('porcentajeF3');
    const tdPorcentaje4 = document.getElementById('porcentajeF4');
    const tdPorcentaje5 = document.getElementById('porcentajeF5');
    const tdPorcentaje6 = document.getElementById('porcentajeF6');
    const tdPorcentaje7 = document.getElementById('porcentajeF7');
    tdPorcentaje1.textContent = primerPorcentaje;
    tdPorcentaje2.textContent = segundoPorcentaje;
    tdPorcentaje3.textContent = terceroPorcentaje;
    tdPorcentaje4.textContent = cuartoPorcentaje;
    tdPorcentaje5.textContent = quintoPorcentaje;
    tdPorcentaje7.textContent = septimoPorcentaje;
    
    const gananciaPorCategoria = calculateGananciasPorCategoria(eventosFiltrados);
    
       const resultado = gananciaPorCategoria;
       const primerCategoria = resultado["Food"].revenue;
       const segundaCategoria= resultado["Museum"].revenue;
       const terceraCategoria= resultado["Concert"].revenue;
       const cuartaCategoria= resultado["Race"].revenue;
       const quintaCategoria= resultado["Books"].revenue;
       const septimaCategoria= resultado["Party"].revenue;
       const tdCategoria1 = document.getElementById('revenueF1');
       const tdCategoria2 = document.getElementById('revenueF2');
       const tdCategoria3 = document.getElementById('revenueF3');
       const tdCategoria4 = document.getElementById('revenueF4');
       const tdCategoria5 = document.getElementById('revenueF5');
       const tdCategoria7 = document.getElementById('revenueF7');
       tdCategoria1.textContent = primerCategoria;
       tdCategoria2.textContent = segundaCategoria;
       tdCategoria3.textContent = terceraCategoria;
       tdCategoria4.textContent = cuartaCategoria;
       tdCategoria5.textContent = quintaCategoria;
       tdCategoria7.textContent = septimaCategoria;
     } catch (error) {
    console.error(error);
  }
 };
eventosFuturos();