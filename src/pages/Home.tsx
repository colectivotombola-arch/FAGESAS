import React from "react";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <header style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>FAGESAS</h1>
        <p style={{ fontSize: 18, color: "#444", marginBottom: 20 }}>
          Bienvenido a FAGESAS — sitio en marcha. Aquí empieza la experiencia.
          Usa el asistente "fageboot" en la esquina inferior derecha para ayuda rápida.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a
            href="#"
            style={{
              background: "#0ea5a4",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Empezar
          </a>
          <a
            href="#"
            style={{
              background: "#e5e7eb",
              color: "#111827",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Documentación
          </a>
        </div>
      </header>

      <section style={{ maxWidth: 980, margin: "36px auto" }}>
        <h2>Estado actual</h2>
        <ul>
          <li>Interfaz básica lista.</li>
          <li>Widget fageboot integrado (modo local / echo por defecto).</li>
          <li>Workflow para desplegar en GitHub Pages preparado.</li>
        </ul>

        <h3>Qué falta por hacer</h3>
        <ol>
          <li>Commit/push de los archivos a la rama feature/activate-site.</li>
          <li>Creación de pull request y revisión visual.</li>
          <li>Conectar fageboot a un backend real (configurar VITE_FAGEBOOT_URL).</li>
          <li>Tests, contenido y mejoras visuales.</li>
        </ol>
      </section>
    </main>
  );
}