// src/ui/components.js
export function renderApp(containerId) {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <canvas id="bg3d"></canvas>
        <div id="glow"></div>
        <div class="container">
            <div class="profile-info">
                <img src="https://github.com/idgleb.png" alt="Foto de perfil de idgleb" class="profile-img" loading="lazy">
                <h1>Gleb Ursol</h1>
            </div>
            <div class="main-content">
                <p>¡Hola! Soy Gleb y aquí puedes ver mis proyectos destacados...</p>
                <div class="projects">
                    <a href="https://github.com/idgleb/ControlParental" class="project-btn" target="_blank">Control Parental</a>
                    <a href="https://github.com/idgleb/jetinno" class="project-btn" target="_blank">Jetinno Store</a>
                    <a href="https://github.com/idgleb/blackjack" class="project-btn" target="_blank">Black Jack</a>
                    <a href="https://github.com/idgleb/finanzas-app" class="project-btn" target="_blank">Finanzas-App</a>
                    <a href="https://github.com/idgleb/Easy-Gastos" class="project-btn" target="_blank">Easy-Gastos</a>
                </div>
            </div>
        </div>
    `;
}

