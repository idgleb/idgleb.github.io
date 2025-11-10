const CLIENT_ID = "642034093723-k9clei5maqkr2q0ful3dhks4hnrgufnu.apps.googleusercontent.com";
const SCOPES = "openid profile email https://www.googleapis.com/auth/drive.file";
const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";

let tokenClient = null;
let isScriptLoaded = false;
let activeButton = null;

function loadGoogleScript() {
    if (isScriptLoaded) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = GOOGLE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            isScriptLoaded = true;
            resolve();
        };
        script.onerror = () => reject(new Error("No se pudo cargar Google Identity Services"));
        document.head.appendChild(script);
    });
}

function ensureTokenClient() {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        throw new Error("Google Identity Services no está disponible todavía.");
    }

    if (!tokenClient) {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (response) => {
                console.log("Callback de Google OAuth recibido:", response);
                if (activeButton) {
                    activeButton.disabled = false;
                }
                if (response.error) {
                    updateStatus(`Error: ${response.error}`);
                    console.error("Error en callback:", response.error);
                    return;
                }

                const token = response.access_token ? "token obtenido" : "sin token";
                updateStatus(`Conectado correctamente (${token}).`);
            },
            error_callback: (error) => {
                console.error("Error callback de Google OAuth:", error);
                if (activeButton) {
                    activeButton.disabled = false;
                }
                updateStatus(`Error: ${error.error || error.type || "Error desconocido"}`);
            }
        });
    }

    return tokenClient;
}

function updateStatus(message) {
    const statusEl = document.getElementById("gdrive-test-status");
    if (statusEl) {
        statusEl.textContent = message;
    }
}

async function handleClick() {
    const button = document.getElementById("gdrive-test-btn");
    if (!button) {
        console.error("Botón gdrive-test-btn no encontrado");
        return;
    }

    activeButton = button;
    button.disabled = true;
    updateStatus("Cargando servicios de Google...");

    try {
        console.log("Iniciando carga de Google Identity Services...");
        await loadGoogleScript();
        console.log("Google Identity Services cargado, inicializando cliente...");
        const client = ensureTokenClient();
        updateStatus("Solicitando permisos...");
        console.log("Solicitando token de acceso...");
        client.requestAccessToken({ prompt: "consent" });
    } catch (error) {
        console.error("Error en handleClick:", error);
        if (activeButton) {
            activeButton.disabled = false;
        }
        updateStatus(`Error al conectar: ${error.message}`);
    }
}

export function initGoogleDriveTestButton() {
    const button = document.getElementById("gdrive-test-btn");
    if (!button) {
        console.warn("Botón gdrive-test-btn no encontrado en el DOM");
        return;
    }

    console.log("Inicializando botón de prueba de Google Drive");
    button.addEventListener("click", () => {
        console.log("Click en botón de Google Drive detectado");
        handleClick();
    });
}
