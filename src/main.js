// src/main.js
import { renderApp } from './ui/components.js';
import { start3DAnimation } from './domain/animation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza la estructura visual
    renderApp('app');
    // Inicia la animación 3D
    start3DAnimation();
});

