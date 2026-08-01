
window.addEventListener("load", function () {
    const cargador = document.getElementById("cargador");
    if (cargador) {
        setTimeout(function () {
            cargador.classList.add("oculto");
        }, 400);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuBoton = document.getElementById("menuBoton");
    const menuPrincipal = document.getElementById("menuPrincipal");

    if (menuBoton && menuPrincipal) {
        menuBoton.addEventListener("click", function () {
            menuPrincipal.classList.toggle("mostrar");
        });
    }

    const filtros = document.querySelectorAll(".filtro");
    const productos = document.querySelectorAll(".producto");

    filtros.forEach(function (boton) {
        boton.addEventListener("click", function () {
            filtros.forEach(function (otro) {
                otro.classList.remove("activo");
            });

            boton.classList.add("activo");
            const categoria = boton.dataset.categoria;

            productos.forEach(function (producto) {
                if (categoria === "todos" || producto.dataset.categoria === categoria) {
                    producto.classList.remove("oculto");
                } else {
                    producto.classList.add("oculto");
                }
            });
        });
    });

    const botonesLeer = document.querySelectorAll(".leer-mas");

    botonesLeer.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const texto = boton.nextElementSibling;
            texto.classList.toggle("visible");

            if (texto.classList.contains("visible")) {
                boton.textContent = "Leer menos";
            } else {
                boton.textContent = "Leer más";
            }
        });
    });

    const preguntas = document.querySelectorAll(".pregunta-boton");

    preguntas.forEach(function (boton) {
        boton.addEventListener("click", function () {
            boton.parentElement.classList.toggle("abierta");
        });
    });

    const carrusel = document.querySelector(".carrusel");

    if (carrusel) {
        const pista = carrusel.querySelector(".carrusel-pista");
        const slides = carrusel.querySelectorAll(".carrusel-slide");
        const puntos = carrusel.querySelectorAll(".carrusel-punto");
        const botonAnterior = carrusel.querySelector(".carrusel-anterior");
        const botonSiguiente = carrusel.querySelector(".carrusel-siguiente");
        let indiceActual = 0;
        let temporizador = null;

        function mostrarSlide(indice) {
            if (indice < 0) {
                indice = slides.length - 1;
            } else if (indice >= slides.length) {
                indice = 0;
            }

            indiceActual = indice;
            pista.style.transform = "translateX(-" + (indiceActual * 100) + "%)";

            puntos.forEach(function (punto, i) {
                punto.classList.toggle("activo", i === indiceActual);
            });
        }

        function iniciarAutoplay() {
            temporizador = setInterval(function () {
                mostrarSlide(indiceActual + 1);
            }, 4500);
        }

        function detenerAutoplay() {
            clearInterval(temporizador);
        }

        if (botonSiguiente) {
            botonSiguiente.addEventListener("click", function () {
                mostrarSlide(indiceActual + 1);
                detenerAutoplay();
                iniciarAutoplay();
            });
        }

        if (botonAnterior) {
            botonAnterior.addEventListener("click", function () {
                mostrarSlide(indiceActual - 1);
                detenerAutoplay();
                iniciarAutoplay();
            });
        }

        puntos.forEach(function (punto, i) {
            punto.addEventListener("click", function () {
                mostrarSlide(i);
                detenerAutoplay();
                iniciarAutoplay();
            });
        });

        carrusel.addEventListener("mouseenter", detenerAutoplay);
        carrusel.addEventListener("mouseleave", iniciarAutoplay);

        mostrarSlide(0);
        iniciarAutoplay();
    }

    const formulario = document.getElementById("formContacto");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const asunto = document.getElementById("asunto").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();
            const resultado = document.getElementById("resultado");

            if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {
                resultado.textContent = "Complete todos los campos.";
                resultado.className = "resultado error";
                return;
            }

            if (!correo.includes("@") || !correo.includes(".")) {
                resultado.textContent = "Ingrese un correo válido.";
                resultado.className = "resultado error";
                return;
            }

            resultado.textContent = "Mensaje enviado correctamente. Esta es una demostración.";
            resultado.className = "resultado exito";
            formulario.reset();
        });
    }
});
