//URL API

//const url = "https://platzi-avo.vercel.app/api/avo";

/* Reemplazamos por una url base y lo que hacemos es agregarle atraves 
de  un template string el resto de la url para la API AVO
que teniamos en el fetch */


const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (price) =>

    //arrow function without braces with return implied

    // return > the result of the new instance. 

    //New instance of Intl API  and calling format method of the
    // INTL.NumberFormat object.
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

/*Web API Fetch
 La utilizamos para traer recursos desde cualquier otro sitio web
 Lo unico que tenemos que pasarle es nuestra url
*/ 

/*

    1. Nos conectaremos al servidor
window.fetch(url)

    2. Procesar la respuesta y despues la convertirla en JSON
    Fetch es algo que nos devuelve una promesa asi que
    trabajaremos con promesas para obtener la respuesta
    y transformarla en JSON


.then(respuesta => respuesta.json())

    3. Luego de que convirtamos la respuesta en JSON lo que obtenemos
    ahora es informacion y la obtenemos concatenando otra promesa

 
    Cuando tengamos el JSON  tendremos esa informacion que
    nos servira para renderizar esa info en nuestro navegador

    JSON --> Data --> Renderizar info Browser

 .then((responseJSON) => {

        Creamos un fragment para agregar los nodos creados 
        y renderizarlos en una sola operación.

    let fragment = document.createDocumentFragment();

        Atraves del parametro de la funcion del forEach accedemos
        a los elementos de la respuesta json con una función anonima. 
        Despues creamos los elementos que queremos

    responseJSON.data.forEach( (item) => {
        let image = document.createElement('img');
        let title = document.createElement('h2');
        let price = document.createElement('span');

        const container = document.createElement('div');

            agregamos los elementos a un contenedor
        container.append(image, title, price);
            agregamos el contenedor con los nodos al fragment 
            y no al DOM directamente
        fragment.appendChild(container);
    });

        solo renderizamos una sola vez el DOM
    document.body.append(fragment);
});

*/

// <--- ============== USING SYNC AWAIT ===================== --->

async function fetchData() {

    /* lo que hacemos es agregarle atraves de  un template 
    string el resto de la url para la API AVO*/

  const response = await fetch(`${baseUrl}/api/avo`),
  data = await response.json();

  let fragment = document.createDocumentFragment();

  data.data.forEach((item) => {
    // create image
    const image = document.createElement("img");
    //URL de la imagen

    /*  Si la agregaramos solo con lo que obtenemos de la API nos 
        daria un error ya que lo que obtenemos es una ruta obsuluta
        mas no una url por lo tanto nos dara error porque no
        encontraria la ruta de la imagen*/ 

    // absolute route converted to URL

    image.src = `${baseUrl}${item.image}`;
    image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

    // create title
    const title = document.createElement("h2");
    title.textContent = item.name;
    title.className = "text-lg";

    // create price
    const price = document.createElement("div");
    // Formatting price with INTL API
    price.textContent = formatPrice(item.price);
    price.className = "text-gray-600";

    //Wrap price and Title
    const priceAndTitle = document.createElement('div');
    priceAndTitle.className = 'text-center md:text-left';
    priceAndTitle.append(title, price);

    //Wrap img and P&T
    const card = document.createElement('div')
    card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
    card.append(image, priceAndTitle)

    const container = document.createElement("div");
    container.append(card);
    fragment.appendChild(container);

  }); 

  appNode.append(fragment);

};

fetchData();
