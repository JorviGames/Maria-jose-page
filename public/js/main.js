
const form = document.getElementById("formContacto");

if (form && !form.dataset.listenerAttached) {
    form.dataset.listenerAttached = "true";

    const estado = document.getElementById("formEstado");
    const boton = form.querySelector('button[type="submit"]');
    let enviando = false;

    // Mostrar notificaciones del formulario
    function mostrarEstado(tipo, mensaje) {
        estado.textContent = mensaje;

        estado.classList.remove(
            "estado-visible",
            "estado-cargando",
            "estado-exito",
            "estado-error"
        );

        estado.classList.add(
            "form-estado",
            "estado-visible",
            `estado-${tipo}`
        );
    }

    // Inicializar EmailJS con la clave pública
    emailjs.init({
        publicKey: "HZ3h8xAJTo_NtMcxZ",
    });

    // Escuchar el envío del formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Evitar envíos repetidos en esta instancia
        if (enviando) return;

        enviando = true;
        boton.disabled = true;

        mostrarEstado("cargando", "Enviando tu mensaje...");

        try {
            const datos = {
                nombre: form.elements["nombre"].value.trim(),
                email: form.elements["email"].value.trim(),
                servicio: form.elements["servicio"].value.trim(),
                mensaje: form.elements["mensaje"].value.trim(),
            };

            console.count("Intentos de envío EmailJS");

            await emailjs.send(
                "service_nbg30gp",
                "template_p4ujhfg",
                datos
            );

            form.reset();

            mostrarEstado(
                "exito",
                "¡Mensaje enviado! Gracias por contactar a María José. Te responderemos pronto."
            );

        } catch (error) {
            console.error("Error al enviar con EmailJS:", error);

            mostrarEstado(
                "error",
                "No pudimos enviar tu mensaje. Intentá de nuevo o contactanos por WhatsApp."
            );

        } finally {
            enviando = false;
            boton.disabled = false;
        }
    });
}