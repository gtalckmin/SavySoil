/* ============================================================
   Soil Savvy – Student Advisor Game  (script.js)
   ============================================================ */

/* ---------- DATA ---------- */

const crops = {
    wheat:  { label: "Wheat",  targets: { pH:[5.5,7.2], P:[20,35], K:[80,180], S:[8,20], Ca:[800,1800], Zn:[0.7,2.0], B:[0.3,1.5], Mo:[0.05,0.5], mineralN:[40,90], AlMax:3 }, focus:["N","P","S","Zn"], yieldPrice: 350 },
    canola: { label: "Canola", targets: { pH:[5.5,7.5], P:[25,45], K:[100,220], S:[10,25], Ca:[900,2000], Zn:[0.7,2.0], B:[0.5,2.0], Mo:[0.05,0.5], mineralN:[60,120], AlMax:2 }, focus:["N","S","P","B"], yieldPrice: 720 },
    lupins: { label: "Lupins", targets: { pH:[5.0,7.0], P:[20,40], K:[80,200], S:[8,20], Ca:[700,1600], Zn:[0.6,2.0], B:[0.3,1.2], Mo:[0.1,0.8], mineralN:[20,50], AlMax:2 }, focus:["P","K","S","Mo"], yieldPrice: 450 }
};

const soilTypes = [
    { id:"yellow_sand",       name:"Deep Yellow Sand",        texture:"Sand",                values:{ pH:5.6, P:14, K:42,  S:5,  Ca:420,  Zn:0.5, B:0.2,  Mo:0.04, CEC:3.5,  OC:0.7, Al:1, mineralN:18 }},
    { id:"pale_sand",         name:"Pale Deep Sand",          texture:"Coarse sand",         values:{ pH:5.2, P:10, K:30,  S:4,  Ca:310,  Zn:0.4, B:0.15, Mo:0.03, CEC:2.8,  OC:0.5, Al:3, mineralN:14 }},
    { id:"duplex_sandy_loam", name:"Sandy Loam Duplex",       texture:"Sand over clay",      values:{ pH:5.4, P:18, K:95,  S:8,  Ca:680,  Zn:0.8, B:0.3,  Mo:0.06, CEC:7.5,  OC:1.1, Al:4, mineralN:24 }},
    { id:"cropping_loam",     name:"Cropping Loam",           texture:"Loam",                values:{ pH:5.9, P:24, K:135, S:11, Ca:1100, Zn:1.1, B:0.6,  Mo:0.12, CEC:11.5, OC:1.6, Al:1, mineralN:34 }},
    { id:"clay_loam",         name:"Clay Loam",               texture:"Clay loam",           values:{ pH:6.2, P:20, K:180, S:10, Ca:1400, Zn:1.0, B:0.7,  Mo:0.15, CEC:16.0, OC:1.8, Al:0, mineralN:40 }},
    { id:"vertosol",          name:"Cracking Clay Vertosol",  texture:"Heavy clay",          values:{ pH:7.1, P:16, K:260, S:9,  Ca:2200, Zn:0.7, B:1.0,  Mo:0.20, CEC:28.0, OC:2.1, Al:0, mineralN:46 }},
    { id:"red_brown_earth",   name:"Red-Brown Earth",         texture:"Clay loam",           values:{ pH:6.8, P:19, K:150, S:9,  Ca:1300, Zn:0.6, B:0.5,  Mo:0.10, CEC:13.5, OC:1.3, Al:0, mineralN:30 }},
    { id:"calcareous_loam",   name:"Calcareous Loam",         texture:"Loam with carbonate", values:{ pH:7.8, P:12, K:120, S:7,  Ca:2800, Zn:0.4, B:0.8,  Mo:0.18, CEC:10.0, OC:1.0, Al:0, mineralN:28 }},
    { id:"acid_gravel",       name:"Acid Gravelly Loam",      texture:"Gravelly loam",       values:{ pH:4.7, P:15, K:85,  S:7,  Ca:500,  Zn:0.9, B:0.25, Mo:0.03, CEC:6.8,  OC:1.2, Al:9, mineralN:22 }},
    { id:"peaty_sandy_loam",  name:"Peaty Sandy Loam",        texture:"Organic sandy loam",  values:{ pH:5.0, P:22, K:110, S:13, Ca:900,  Zn:0.8, B:0.4,  Mo:0.08, CEC:18.5, OC:4.5, Al:2, mineralN:55 }}
];

const fertilizers = [
    { id:"urea",             name:"Urea",                     group:"nitrogen", form:"Amide-N",                  analysis:{N:46},              price:600  },
    { id:"ammonium_sulfate", name:"Ammonium Sulfate",         group:"nitrogen", form:"Ammonium-N + Sulfate-S",   analysis:{N:21, S:24},        price:500  },
    { id:"can",              name:"Calcium Ammonium Nitrate", group:"nitrogen", form:"Ammonium/Nitrate-N",       analysis:{N:27},              price:550  },
    { id:"uan",              name:"UAN Solution",             group:"nitrogen", form:"Urea+Ammonium+Nitrate",    analysis:{N:32},              price:500  },
    { id:"anhydrous",        name:"Anhydrous Ammonia",        group:"nitrogen", form:"Ammonia-N",                analysis:{N:82},              price:900  },
    { id:"map",              name:"MAP",                      group:"phosphorus", form:"Ammonium + Phosphate",   analysis:{N:11, P:22},        price:850  },
    { id:"dap",              name:"DAP",                      group:"phosphorus", form:"Ammonium + Phosphate",   analysis:{N:18, P:20},        price:800  },
    { id:"tsp",              name:"Triple Superphosphate",    group:"phosphorus", form:"Phosphate",              analysis:{P:20},              price:750  },
    { id:"ssp",              name:"Single Superphosphate",    group:"phosphorus", form:"Phosphate + Sulfate",    analysis:{P:9, S:11},         price:350  },
    { id:"mop",              name:"Muriate of Potash",        group:"potassium", form:"Potassium + Chloride",    analysis:{K:50},              price:700  },
    { id:"sop",              name:"Sulfate of Potash",        group:"potassium", form:"Potassium + Sulfate",     analysis:{K:41, S:18},        price:900  },
    { id:"potassium_nitrate",name:"Potassium Nitrate",        group:"potassium", form:"Nitrate-N + Potassium",   analysis:{N:13, K:38},        price:1100 },
    { id:"gypsum",           name:"Gypsum",                   group:"sulfur_ca", form:"Calcium sulfate",         analysis:{Ca:22, S:18},       price:80   },
    { id:"epsom",            name:"Epsom Salt",               group:"sulfur_ca", form:"Magnesium sulfate",       analysis:{Mg:10, S:13},       price:400  },
    { id:"ats",              name:"Ammonium Thiosulfate",     group:"sulfur_ca", form:"Ammonium + Thiosulfate",  analysis:{N:12, S:26},        price:600  },
    { id:"lime",             name:"Lime (Aglime)",            group:"liming",    form:"Calcium carbonate",       analysis:{Ca:35}, effect:{pH:0.45,AlDrop:2.2}, price:50 },
    { id:"dolomite",         name:"Dolomite",                 group:"liming",    form:"Ca/Mg carbonate",         analysis:{Ca:20,Mg:11}, effect:{pH:0.35,AlDrop:1.8}, price:70 },
    { id:"zinc_sulfate",     name:"Zinc Sulfate",             group:"micro",     form:"Sulfate-Zn",              analysis:{Zn:21},             price:1500 },
    { id:"borax",            name:"Borax",                    group:"micro",     form:"Borate",                  analysis:{B:11},              price:1200 },
    { id:"sodium_molybdate", name:"Sodium Molybdate",         group:"micro",     form:"Molybdate",               analysis:{Mo:39},             price:25000}
];

const fertGroups = [
    { key:"nitrogen",    label:"Nitrogen Sources",       icon:"N" },
    { key:"phosphorus",  label:"Phosphorus Sources",     icon:"P" },
    { key:"potassium",   label:"Potassium Sources",      icon:"K" },
    { key:"sulfur_ca",   label:"Sulfur & Calcium",       icon:"S" },
    { key:"liming",      label:"Liming Products",        icon:"pH" },
    { key:"micro",       label:"Micronutrients",         icon:"Zn" }
];

const timingOptions = ["Sowing","Emergence","Vegetative"];

const nutrientToSoilFactor = { N:0.8, P:0.06, K:0.22, S:0.12, Ca:0.45, Zn:0.06, Mg:0, B:0.08, Mo:0.06 };

const metricLabels = {
    pH:"pH (CaCl\u2082)", P:"Colwell P (mg/kg)", K:"Exch. K (mg/kg)",
    S:"Sulfate-S (mg/kg)", Ca:"Exch. Ca (mg/kg)", Zn:"Zinc (mg/kg)",
    B:"Boron (mg/kg)", Mo:"Molybdenum (mg/kg)",
    Al:"Exch. Al (% CEC)", OC:"Organic C (%)", CEC:"CEC (cmol(+)/kg)",
    mineralN:"Mineral N (kg/ha)"
};

/* ---------- STATE ---------- */

let currentCropKey = "wheat";
let currentSoil = cloneSoil(soilTypes[0]);
let lastSimulation = null;          // filled after a check

/* ---------- HELPERS ---------- */

function cloneSoil(s){ return { id:s.id, name:s.name, texture:s.texture, values:{ ...s.values } }; }
function fmt(v, dp=1){ return Number(v).toFixed(dp); }
function esc(s){ return s.replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;"}[c])); }

function analysisText(a){
    return Object.entries(a).map(([n,p])=>`${n} ${p}%`).join(" | ");
}

function statusForMetric(metric, value, crop){
    const t = crop.targets;
    if(metric==="Al") return value > t.AlMax ? "excess" : "good";
    if(!t[metric]) return "good";
    const [min,max] = t[metric];
    if(value < min) return "deficient";
    if(value > max) return "excess";
    return "good";
}
function statusText(s){
    return s==="deficient"?"Deficient":s==="excess"?"Excess":"Adequate";
}

/* ---------- SELECTORS ---------- */

function populateSelectors(){
    const cs = document.getElementById("crop-select");
    const ss = document.getElementById("soil-select");
    cs.innerHTML = Object.entries(crops).map(([k,c])=>`<option value="${k}">${c.label}</option>`).join("");
    ss.innerHTML = soilTypes.map(s=>`<option value="${s.id}">${s.name}</option>`).join("");
    cs.value = currentCropKey;
    ss.value = currentSoil.id;
}

/* ---------- SOIL TABLE ---------- */

function renderSoilReport(){
    const crop = crops[currentCropKey];
    document.getElementById("soil-summary").textContent =
        `${currentSoil.name} (${currentSoil.texture}) for ${crop.label}. Focus nutrients: ${crop.focus.join(", ")}.`;

    const ordered = ["pH","mineralN","P","K","S","Ca","Zn","B","Mo","Al","OC","CEC"];
    document.getElementById("soil-table-body").innerHTML = ordered.map(m=>{
        const v = currentSoil.values[m];
        const st = statusForMetric(m,v,crop);
        return `<tr><td>${metricLabels[m]||m}</td><td>${fmt(v)}</td><td class="status-${st}">${statusText(st)}</td></tr>`;
    }).join("");

    drawRadar();        // redraw with current soil only (no plan yet)
}

/* ---------- ACCORDION ---------- */

function renderAccordion(){
    const wrap = document.getElementById("accordion");
    wrap.innerHTML = fertGroups.map(g=>{
        const items = fertilizers.filter(f=>f.group===g.key);
        const rows = items.map(f=>`
            <div class="fert-row">
                <div><strong>${esc(f.name)}</strong><div class="fert-meta">${esc(f.form)} — ${analysisText(f.analysis)}</div></div>
                <div class="fert-meta">$${f.price}/t</div>
                <label>kg/ha<input type="number" min="0" max="2000" step="5" value="0" data-fert-id="${f.id}"></label>
                <label>Timing<select data-timing-id="${f.id}">${timingOptions.map(t=>`<option>${t}</option>`).join("")}</select></label>
            </div>`).join("");

        return `
            <div class="acc-group" data-group="${g.key}">
                <div class="acc-header">
                    <span>${g.label} <span class="badge">${g.icon}</span></span>
                    <span class="arrow">&#9654;</span>
                </div>
                <div class="acc-body">${rows}</div>
            </div>`;
    }).join("");

    wrap.querySelectorAll(".acc-header").forEach(h=>{
        h.addEventListener("click", ()=> h.parentElement.classList.toggle("open"));
    });
}

/* ---------- PRICE TABLE ---------- */

function renderPriceTable(){
    document.getElementById("price-table-body").innerHTML = fertilizers.map(f=>`
        <tr><td>${esc(f.name)}</td><td>${analysisText(f.analysis)}</td><td>$${f.price}</td></tr>`).join("");
}

/* ---------- GATHER INPUTS ---------- */

function gatherRecommendation(){
    const rec = [];
    document.querySelectorAll("input[data-fert-id]").forEach(inp=>{
        const rate = Number(inp.value||0);
        if(rate > 0){
            const id = inp.getAttribute("data-fert-id");
            const timingSel = document.querySelector(`select[data-timing-id="${id}"]`);
            rec.push({ fertId:id, rate, timing: timingSel ? timingSel.value : "Sowing" });
        }
    });
    return rec;
}

/* ---------- SIMULATION ---------- */

function applyRecommendation(baseSoil, rec){
    const after = { ...baseSoil.values };
    const additions = { N:0, P:0, K:0, S:0, Ca:0, Zn:0, B:0, Mo:0, Mg:0 };
    let totalCost = 0;

    rec.forEach(entry=>{
        const fert = fertilizers.find(f=>f.id===entry.fertId);
        if(!fert) return;

        totalCost += (entry.rate / 1000) * fert.price;     // rate kg/ha, price $/t

        Object.entries(fert.analysis).forEach(([nut,pct])=>{
            const added = (entry.rate * pct)/100;
            additions[nut] = (additions[nut]||0) + added;
            // N additions map to mineralN in soil
            const soilKey = nut==="N" ? "mineralN" : nut;
            const sf = nutrientToSoilFactor[nut]||0;
            if(sf>0 && typeof after[soilKey]==="number") after[soilKey] += added * sf;
        });

        if(fert.effect){
            const ls = entry.rate/100;
            if(fert.effect.pH)     after.pH += fert.effect.pH * ls;
            if(fert.effect.AlDrop) after.Al  = Math.max(0, after.Al - fert.effect.AlDrop*ls);
        }
    });

    if(after.pH > 7.5) after.Zn *= 0.92;
    if(after.pH < 5.2) after.Al += 0.8;

    return { after, additions, totalCost };
}

/* ---------- SCORING ---------- */

function scorePlan(afterSoil, additions, rec, totalCost){
    const crop = crops[currentCropKey];
    const checks = ["pH","mineralN","P","K","S","Ca","Zn","B","Mo","Al"];
    let yieldScore = 100;
    const msgs = [];

    checks.forEach(m=>{
        const st = statusForMetric(m, afterSoil[m], crop);
        if(st==="deficient"){ yieldScore -= 15; msgs.push(`${metricLabels[m]} still deficient.`); }
        if(st==="excess")   { yieldScore -= 10; msgs.push(`${metricLabels[m]} moved into excess.`); }
    });

    // crop-specific timing / amount checks
    if(currentCropKey==="canola" && additions.S<12){ yieldScore-=12; msgs.push("Canola needs stronger S supply."); }
    if(currentCropKey==="wheat"  && additions.N<45){ yieldScore-=10; msgs.push("Wheat N program looks underpowered."); }
    if(currentCropKey==="lupins" && additions.N>30){ yieldScore-=8;  msgs.push("High fertilizer N can reduce lupin nodulation."); }

    // timing bonus: N at vegetative stage for wheat/canola
    const nEntries = rec.filter(r=>{
        const f = fertilizers.find(x=>x.id===r.fertId);
        return f && f.analysis.N;
    });
    const hasSplit = nEntries.some(r=>r.timing==="Vegetative") && nEntries.some(r=>r.timing==="Sowing");
    if((currentCropKey==="wheat"||currentCropKey==="canola") && hasSplit){
        yieldScore += 5;
        msgs.push("Good work splitting N between sowing and vegetative timing.");
    }

    // P at sowing bonus
    const pAtSowing = rec.some(r=>{
        const f = fertilizers.find(x=>x.id===r.fertId);
        return f && f.analysis.P && r.timing==="Sowing";
    });
    if(pAtSowing){ yieldScore += 3; msgs.push("P placed at sowing boosts early vigour."); }

    if(rec.length===0){ yieldScore=0; msgs.push("No recommendation submitted."); }

    yieldScore = Math.max(0, Math.min(100, Math.round(yieldScore)));

    // cost score: lower cost for same yield is better
    // baseline realistic cost ~$120/ha; over $250/ha gets penalised
    let costScore;
    if(totalCost < 60)       costScore = 100;
    else if(totalCost < 120) costScore = 95;
    else if(totalCost < 180) costScore = 85;
    else if(totalCost < 250) costScore = 70;
    else if(totalCost < 350) costScore = 50;
    else                     costScore = Math.max(0, 50 - Math.round((totalCost-350)/10));

    const finalScore = Math.round(yieldScore * 0.6 + costScore * 0.4);

    if(finalScore>=80)      msgs.unshift("Strong plan — good nutrient balance at reasonable cost.");
    else if(finalScore>=55) msgs.unshift("Reasonable plan, but some nutrient or cost issues remain.");
    else                    msgs.unshift("Plan needs improvement. Revisit deficiencies and spending.");

    return { yieldScore, costScore, finalScore, totalCost, messages:msgs };
}

/* ---------- FEEDBACK ---------- */

function showFeedback(result, afterSoil){
    const crop = crops[currentCropKey];
    document.getElementById("result-msg").textContent = "";

    document.getElementById("score-cards").innerHTML = `
        <div class="score-cards">
            <div class="score-card"><div class="big">${result.yieldScore}</div><div class="lbl">Yield Score</div></div>
            <div class="score-card"><div class="big">${result.costScore}</div><div class="lbl">Cost Score</div></div>
            <div class="score-card"><div class="big" style="color:var(--accent)">${result.finalScore}</div><div class="lbl">Final (60/40)</div></div>
            <div class="score-card"><div class="big">$${fmt(result.totalCost,0)}</div><div class="lbl">Total $/ha</div></div>
        </div>`;

    const snap = `<div class="feedback-item">
        Post-plan soil: pH ${fmt(afterSoil.pH)}, P ${fmt(afterSoil.P)}, K ${fmt(afterSoil.K)}, S ${fmt(afterSoil.S)}, Zn ${fmt(afterSoil.Zn)}, Al ${fmt(afterSoil.Al)}.
    </div>`;

    document.getElementById("feedback-list").innerHTML = snap +
        result.messages.map(m=>`<div class="feedback-item">${esc(m)}</div>`).join("");
}

/* ---------- BACKEND INTEGRATION ---------- */

// Configuration: Update this to your deployed backend URL
const BACKEND_URL = "http://localhost:8000/review-submission";  // Change for production

function buildSubmissionPayload() {
    if (!lastSimulation) {
        alert("Please check your recommendation first.");
        return null;
    }

    const rec = gatherRecommendation();
    const result = scorePlan(lastSimulation.after, lastSimulation.additions, rec, lastSimulation.totalCost);

    // Get fertilizer names from IDs
    const fertilizerPlan = rec.map(entry => {
        const fert = fertilizers.find(f => f.id === entry.fertId);
        return {
            product_name: fert ? fert.name : "Unknown",
            rate_kg_ha: entry.rate,
            timing: entry.timing
        };
    });

    return {
        crop: currentCropKey,
        soil_type: currentSoil.id,
        yield_score: result.yieldScore,
        cost_score: result.costScore,
        fertilizer_plan: fertilizerPlan
    };
}

async function getAdvisorReview() {
    const submission = buildSubmissionPayload();
    if (!submission) return;

    const panel = document.getElementById("advisor-panel");
    const loading = document.getElementById("advisor-loading");
    const review = document.getElementById("advisor-review");
    const error = document.getElementById("advisor-error");

    // Show panel and loading state
    panel.style.display = "block";
    loading.style.display = "block";
    review.textContent = "";
    error.style.display = "none";

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submission)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display the review
        loading.style.display = "none";
        review.textContent = data.review;

    } catch (err) {
        console.error("Error getting advisor review:", err);
        loading.style.display = "none";
        error.style.display = "block";
        error.textContent = `Error: ${err.message}. Make sure the backend is running at ${BACKEND_URL}`;
    }
}

/* ---------- RADAR / STAR CHART ---------- */

const radarAxes = ["mineralN","P","K","S","Ca","Zn","B","Mo"];
const radarLabels = { mineralN:"N", P:"P", K:"K", S:"S", Ca:"Ca", Zn:"Zn", B:"B", Mo:"Mo" };

// normalise a value on axis to 0-1 relative to max plotable
const radarMax = { mineralN:140, P:55, K:280, S:35, Ca:3000, Zn:2.5, B:2.5, Mo:1.0 };

function norm(axis, val){ return Math.min(1, Math.max(0, val / radarMax[axis])); }

function drawRadar(afterSoil){
    const canvas = document.getElementById("radar-chart");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2, R = Math.min(cx,cy)-40;
    const n = radarAxes.length;
    const angleStep = (Math.PI*2)/n;
    const startAngle = -Math.PI/2;

    ctx.clearRect(0,0,W,H);

    // grid rings
    ctx.strokeStyle = "#c8d5c8";
    ctx.lineWidth = 0.6;
    for(let ring=1; ring<=4; ring++){
        const r = R * ring/4;
        ctx.beginPath();
        for(let i=0;i<=n;i++){
            const a = startAngle + i*angleStep;
            const x = cx + r*Math.cos(a), y = cy + r*Math.sin(a);
            i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
    }

    // axis lines + labels
    ctx.fillStyle = "#33453d";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for(let i=0;i<n;i++){
        const a = startAngle + i*angleStep;
        const ex = cx + R*Math.cos(a), ey = cy + R*Math.sin(a);
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.stroke();
        const lx = cx + (R+18)*Math.cos(a), ly = cy + (R+18)*Math.sin(a);
        ctx.fillText(radarLabels[radarAxes[i]] || radarAxes[i], lx, ly);
    }

    const crop = crops[currentCropKey];

    // target band (filled green polygon using midpoint of target range)
    const targetPts = radarAxes.map((ax,i)=>{
        const t = crop.targets[ax];
        if(!t) return { x:cx, y:cy };
        const mid = (t[0]+t[1])/2;
        const r = norm(ax, mid)*R;
        const a = startAngle + i*angleStep;
        return { x:cx+r*Math.cos(a), y:cy+r*Math.sin(a) };
    });
    drawPoly(ctx, targetPts, "rgba(76,175,80,.18)", "rgba(76,175,80,.7)", 2);

    // current soil
    const soilPts = radarAxes.map((ax,i)=>{
        const v = currentSoil.values[ax]||0;
        const r = norm(ax,v)*R;
        const a = startAngle + i*angleStep;
        return { x:cx+r*Math.cos(a), y:cy+r*Math.sin(a) };
    });
    drawPoly(ctx, soilPts, "rgba(33,150,243,.22)", "rgba(33,150,243,.85)", 2.2);

    // after-plan (only if we have one)
    if(afterSoil){
        const planPts = radarAxes.map((ax,i)=>{
            const v = afterSoil[ax]||0;
            const r = norm(ax,v)*R;
            const a = startAngle + i*angleStep;
            return { x:cx+r*Math.cos(a), y:cy+r*Math.sin(a) };
        });
        drawPoly(ctx, planPts, "rgba(255,152,0,.18)", "rgba(255,152,0,.9)", 2.2);
    }
}

function drawPoly(ctx, pts, fill, stroke, lw){
    ctx.beginPath();
    pts.forEach((p,i)=> i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
}

/* ---------- CLEAR ---------- */

function clearRates(){
    document.querySelectorAll("input[data-fert-id]").forEach(inp=>{ inp.value=0; });
    document.querySelectorAll("select[data-timing-id]").forEach(sel=>{ sel.selectedIndex=0; });
    lastSimulation = null;
    drawRadar();
    document.getElementById("score-cards").innerHTML = "";
    document.getElementById("result-msg").textContent = "";
    document.getElementById("feedback-list").innerHTML = "";
}

function randomScenario(){
    const keys = Object.keys(crops);
    currentCropKey = keys[Math.floor(Math.random()*keys.length)];
    currentSoil = cloneSoil(soilTypes[Math.floor(Math.random()*soilTypes.length)]);
    document.getElementById("crop-select").value = currentCropKey;
    document.getElementById("soil-select").value = currentSoil.id;
    renderSoilReport();
    clearRates();
}

/* ---------- EVENTS ---------- */

function wireEvents(){
    document.getElementById("crop-select").addEventListener("change", e=>{
        currentCropKey = e.target.value;
        renderSoilReport();
    });
    document.getElementById("soil-select").addEventListener("change", e=>{
        const s = soilTypes.find(x=>x.id===e.target.value);
        if(!s) return;
        currentSoil = cloneSoil(s);
        renderSoilReport();
    });
    document.getElementById("check-btn").addEventListener("click", ()=>{
        const rec = gatherRecommendation();
        const sim = applyRecommendation(currentSoil, rec);
        const result = scorePlan(sim.after, sim.additions, rec, sim.totalCost);
        lastSimulation = sim;
        showFeedback(result, sim.after);
        drawRadar(sim.after);
    });
    document.getElementById("advisor-btn").addEventListener("click", getAdvisorReview);
    document.getElementById("clear-btn").addEventListener("click", clearRates);
    document.getElementById("new-scenario-btn").addEventListener("click", randomScenario);
}

/* ---------- INIT ---------- */

function init(){
    populateSelectors();
    renderSoilReport();
    renderAccordion();
    renderPriceTable();
    wireEvents();
}

document.addEventListener("DOMContentLoaded", init);
