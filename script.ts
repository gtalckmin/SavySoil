// script.ts (Compile to script.js using tsc or include tsconfig.json for setup)
// For prototype, assume transpiled to JS. Here's the TS version.

interface SoilElements {
    P: number;
    K: number;
    Ca: number;
    S: number;
    Mg: number;
    CEC: number;
    pH: number;
    Al: number;
    H: number;
}

interface Item {
    name: string;
    affects: Partial<SoilElements>;
}

const optimalRanges: { [key in keyof SoilElements]: [number, number] } = {
    P: [20, 40],
    K: [100, 200],
    Ca: [1000, 2000],
    S: [10, 30],
    Mg: [50, 150],
    CEC: [10, 25],
    pH: [6, 7.5],
    Al: [0, 5],
    H: [0, 5]
};

let soil: SoilElements = generateRandomSoil();
let selectedItems: Item[] = [];

function generateRandomSoil(): SoilElements {
    return {
        P: Math.floor(Math.random() * 50),
        K: Math.floor(Math.random() * 250),
        Ca: Math.floor(Math.random() * 2500),
        S: Math.floor(Math.random() * 40),
        Mg: Math.floor(Math.random() * 200),
        CEC: Math.floor(Math.random() * 30) + 5,
        pH: (Math.random() * 4 + 4).toFixed(1) as unknown as number, // 4-8
        Al: Math.floor(Math.random() * 10),
        H: Math.floor(Math.random() * 10)
    };
}

function displaySoil(reportId: string, soilData: SoilElements, isUpdated: boolean = false) {
    const list = document.getElementById(isUpdated ? 'updated-report' : 'elements-list') as HTMLUListElement;
    list.innerHTML = '';
    Object.entries(soilData).forEach(([key, value]) => {
        const [min, max] = optimalRanges[key as keyof SoilElements];
        let status = 'good';
        if (value < min) status = 'deficient';
        if (value > max) status = 'excess';
        const li = document.createElement('li');
        li.classList.add(status);
        li.textContent = `${key}: ${value} (${status})`;
        list.appendChild(li);
    });
}

function applyItems() {
    selectedItems.forEach(item => {
        Object.entries(item.affects).forEach(([key, change]) => {
            (soil as any)[key] = Math.max(0, (soil as any)[key] + (change || 0));
        });
    });

    // Simple interactions: e.g., high pH affects Mg availability, but keep simple for prototype
    if (soil.pH > 7.5) soil.Mg *= 0.9; // Simulated deficiency

    displaySoil('updated-report', soil, true);

    const balanced = Object.entries(soil).every(([key, value]) => {
        const [min, max] = optimalRanges[key as keyof SoilElements];
        return value >= min && value <= max;
    });

    const msg = document.getElementById('result-msg') as HTMLParagraphElement;
    msg.textContent = balanced ? 'Great job! Soil is optimized.' : 'Not quite balanced. Try again!';
    selectedItems = [];
    updateSelectedButtons();
}

function updateSelectedButtons() {
    document.querySelectorAll('.item').forEach(btn => {
        btn.classList.remove('selected');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displaySoil('elements-list', soil);

    document.querySelectorAll('.item').forEach(btn => {
        btn.addEventListener('click', () => {
            const item: Item = JSON.parse(btn.getAttribute('data-item') || '{}');
            const index = selectedItems.findIndex(i => i.name === item.name);
            if (index > -1) {
                selectedItems.splice(index, 1);
                btn.classList.remove('selected');
            } else {
                selectedItems.push(item);
                btn.classList.add('selected');
            }
        });
    });

    document.getElementById('apply-btn')?.addEventListener('click', applyItems);
    document.getElementById('reset-btn')?.addEventListener('click', () => {
        soil = generateRandomSoil();
        displaySoil('elements-list', soil);
        document.getElementById('updated-report')!.innerHTML = '';
        document.getElementById('result-msg')!.textContent = '';
        selectedItems = [];
        updateSelectedButtons();
    });
});