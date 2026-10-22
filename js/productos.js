const API_URL = "https://fakestoreapi.com/products";

async function cargarProductos() {
  const contenedor = document.querySelector("#productos");

  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

    const productos = await respuesta.json();

    contenedor.innerHTML = productos
      .map(
        (p) => `
        <article class="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <img src="${p.image}" alt="${p.title}"
               class="h-40 object-contain mb-4" loading="lazy">
          <h3 class="font-semibold text-sm line-clamp-2 mb-2">${p.title}</h3>
          <p class="text-lg font-bold text-gray-600 mt-auto">$${p.price}</p>
        </article>
      `,
      )
      .join("");
  } catch (error) {
    contenedor.innerHTML = `<p class="text-red-600">Error al cargar productos: ${error.message}</p>`;
    console.error("Error cargando productos:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos);
