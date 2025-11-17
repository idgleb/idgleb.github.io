// src/main.js
import { renderApp } from './ui/components.js';
import { start3DAnimation } from './domain/animation.js';

document.addEventListener('DOMContentLoaded', () => {
    renderApp('app');
    start3DAnimation();
});

