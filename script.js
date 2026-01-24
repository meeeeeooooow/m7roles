console.log("App loaded");

const terminals = [
    // Section 1 (Top Right)
    { id: "s1term1", type: "terminal", x: 98.75, y: 38.87 },
    { id: "s1dev", type: "device", x: 97.50, y: 56.25 },
    { id: "s1term2", type: "terminal", x: 98.75, y: 44.30 },
    { id: "s1levLeft", type: "lever", x: 95.18, y: 73.50 },
    { id: "s1levRight", type: "lever", x: 84.80, y: 73.50 },
    { id: "s1term3", type: "terminal", x: 81.75, y: 55.04 },
    { id: "s1term4", type: "terminal", x: 81.75, y: 63.11 },
    // Section 2 (Bottom Right)
    { id: "s2term1", type: "terminal", x: 62.62, y: 82.50 },
    { id: "s2term2", type: "terminal", x: 55.12, y: 83.12 },
    { id: "s2dev", type: "device", x: 55.05, y: 98.75 },
    { id: "s2term3", type: "terminal", x: 44.62, y: 81.50 },
    { id: "s2term4", type: "terminal", x: 38.37, y: 97.25 },
    { id: "s2term5", type: "terminal", x: 37.75, y: 81.87 },
    { id: "s2levLeft", type: "lever", x: 23.00, y: 95.25 },
    { id: "s2levRight", type: "lever", x: 26.50, y: 85.63 },
    // Section 3 (Bottom Left)
    { id: "s3term1", type: "terminal", x: 2.00, y: 72.25 },
    { id: "s3dev", type: "device", x: 25, y: 65 },
    { id: "s3term2", type: "terminal", x: 2.50, y: 55.61 },
    { id: "s3term3", type: "terminal", x: 17.00, y: 56.48 },
    { id: "s3term4", type: "terminal", x: 35, y: 85 },
    { id: "s3levLeft", type: "lever", x: 4.63, y: 23.00 },
    { id: "s3levRight", type: "lever", x: 15.13, y: 23.00 },
    // Section 4 (Top Left)
    { id: "s4levLeft", type: "lever", x: 76.00, y: 4.80 },
    { id: "s4levRight", type: "lever", x: 77.75, y: 15.17 },
    { id: "s4term1", type: "terminal", x: 25, y: 35 },
    { id: "s4term2", type: "terminal", x: 15, y: 25 },
    { id: "s4dev", type: "device", x: 57.75, y: 5.55 },
    { id: "s4term3", type: "terminal", x: 35, y: 15 },
    { id: "core", type: "core", x: 49.88, y: 16.92 },
];

function getLabelFromId(id) {
    if (id.includes("term")) {
        return id.split("term")[1];
    } else if (id.includes("dev")) {
        return "D";
    } else if (id.includes("levLeft")) {
        return "L";
    } else if (id.includes("levRight")) {
        return "R";
    } else if (id.includes("lev")) {
        return "Lev";
    } else if (id.includes("core")) {
        return "C";
    }
    return "";
}

function renderMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';

    terminals.forEach(terminal => {
        const div = document.createElement('div');
        div.className = 'terminal-point';
        div.id = terminal.id;

        if (terminal.type === "terminal") div.classList.add("type-terminal");
        if (terminal.type === "device") div.classList.add("type-device");
        if (terminal.type === "lever") div.classList.add("type-lever");

        div.style.left = terminal.x + '%';
        div.style.top = terminal.y + '%';
        div.innerText = getLabelFromId(terminal.id);
        mapContainer.appendChild(div);
    });
}

let currentStrategy = "classic_m7";
let activeRole = null;

function generateControls() {
    const container = document.getElementById('class-buttons-container');
    container.innerHTML = '';

    const roles = strategies[currentStrategy].roles;
    Object.keys(roles).forEach(role => {
        const btn = document.createElement('button');
        btn.className = 'class-btn';
        btn.innerText = role;
        btn.addEventListener('click', () => selectRole(role));
        container.appendChild(btn);
    });
}

function selectRole(roleName) {
    activeRole = roleName;

    const buttons = document.querySelectorAll('.class-btn');
    buttons.forEach(btn => {
        if (btn.innerText === roleName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateMapHighlights();
}

function updateMapHighlights() {
    const assignedIds = activeRole ? strategies[currentStrategy].roles[activeRole] : [];
    const points = document.querySelectorAll('.terminal-point');

    points.forEach(point => {
        if (!activeRole) {
            point.classList.remove('dimmed', 'highlighted');
        } else if (assignedIds.includes(point.id)) {
            point.classList.add('highlighted');
            point.classList.remove('dimmed');
        } else {
            point.classList.add('dimmed');
            point.classList.remove('highlighted');
        }
    });
}

function renderAnnotations() {
    const mapContainer = document.getElementById('map-container');
    document.querySelectorAll('.map-annotation').forEach(el => el.remove());

    const annotations = strategies[currentStrategy].annotations || [];

    annotations.forEach(ann => {
        if (ann.type === "badge") {
            const terminals = document.querySelectorAll('.terminal-point');
            terminals.forEach(t => {
                // Check if the text content matches the ID (ignoring any existing badges if cleanup failed)
                if (t.id === ann.termId) {
                    const badge = document.createElement('span');
                    badge.className = 'map-annotation badge';
                    badge.innerText = ann.text;
                    badge.style.backgroundColor = ann.color;
                    badge.style.position = 'absolute';
                    badge.style.top = '-10px';
                    badge.style.right = '-10px';
                    badge.style.padding = '2px 5px';
                    badge.style.borderRadius = '4px';
                    badge.style.fontSize = '10px';
                    badge.style.color = '#000';
                    badge.style.fontWeight = 'bold';
                    t.appendChild(badge);
                }
            });
        } else if (ann.type === "label") {
            const label = document.createElement('div');
            label.className = 'map-annotation label';
            label.style.left = ann.x + '%';
            label.style.top = ann.y + '%';
            label.innerText = ann.text;
            label.style.color = ann.color;
            label.style.position = 'absolute';
            label.style.transform = 'translate(-50%, -50%)';
            label.style.fontWeight = 'bold';
            label.style.textShadow = '1px 1px 2px black';
            mapContainer.appendChild(label);
        }
    });
}

document.getElementById('show-all-btn').addEventListener('click', () => {
    activeRole = null;
    document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
    updateMapHighlights();
});

document.getElementById('strategy-select').addEventListener('change', (e) => {
    currentStrategy = e.target.value;
    generateControls();
    activeRole = null;
    updateMapHighlights();
    renderAnnotations();
});

function enableDevHelper() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.addEventListener('click', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        console.log("x: " + xPercent.toFixed(2) + ", y: " + yPercent.toFixed(2));
    });
}

enableDevHelper();

function formatStrategyName(name) {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function populateStrategyDropdown() {
    const select = document.getElementById('strategy-select');
    select.innerHTML = '';
    const keys = Object.keys(strategies);

    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = formatStrategyName(key);
        select.appendChild(option);
    });

    if (keys.length > 0) {
        currentStrategy = keys[0];
    }
}

function initApp() {
    populateStrategyDropdown();
    const select = document.getElementById('strategy-select');
    if (select.options.length > 0) {
        currentStrategy = select.options[0].value;
    }
    generateControls();
    renderMap();
    renderAnnotations();
}

window.addEventListener('DOMContentLoaded', initApp);