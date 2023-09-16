/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const select = document.querySelector(".top-banner select");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "89b9fdb6f95944991fd97b6727d65c78";
let li = document.createElement("li");
//const conex = "false"

/* if(navigator.onLine) {
  conex = "true";
}else {
  alert("No se pueden obtener los datos sin conexión a Internet. Conéctese a la Red e inténtelo de nuevo");
} */



  form.addEventListener("submit", e => {
    e.preventDefault();
    //const listItems = list.querySelectorAll(".ajax-section .city");
    const inputVal = select.value;

    
    if(navigator.onLine){
      //AJAX
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { main, name, sys, weather } = data;
          const icon = `https://openweathermap.org/img/wn/${
            weather[0]["icon"]
          }@2x.png`;
          //li.classList.add("city");
          const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
          `;
          li.innerHTML = markup;
          //list.append(li);
        })
        .catch(() => {
          msg.textContent = "Este no es un nombre de ciudad valido";
        })

      msg.textContent = "";
      form.reset();
      select.focus();

      // Borra los elementos anteriores y agrega el último resultado
      list.innerHTML = '';
      list.appendChild(li);
      //});
    }else {
      alert("No se pueden obtener los datos sin conexión a Internet. Conéctese a la Red e inténtelo de nuevo");
    }
  })