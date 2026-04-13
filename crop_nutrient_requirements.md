# Crop Nutrient Requirements Summary (Wheat, Canola, Lupins)

## Scope and assumptions

- Values are typical broad-acre targets for moderate to high yielding systems.
- Actual rates depend on yield target, soil test levels, rainfall zone, and nutrient use efficiency.
- Macronutrients are shown as elemental nutrients where possible, with common fertilizer expression noted.

## Wheat (Triticum aestivum)

### Typical nutrient demand and removal

- Nitrogen (N): High demand. Typical total requirement is about 25 to 35 kg N per tonne of grain (including straw demand).
- Phosphorus (P): Moderate demand. Grain removal commonly around 3 to 4 kg P per tonne.
- Potassium (K): Moderate to high in high-yielding systems, especially where straw is removed. Grain removal around 4 to 6 kg K per tonne.
- Sulfur (S): Moderate demand, often 2 to 4 kg S per tonne of grain.
- Zinc (Zn): Most relevant micronutrient on alkaline sands/calcareous soils.
- Copper (Cu): Can be limiting on organic sands and peaty soils.

### Practical soil fertility targets (topsoil guide)

- pH (CaCl2): 5.5 to 7.2
- Colwell P: 20 to 35 mg/kg (depends on PBI)
- Exchangeable K: 80 to 180 mg/kg (texture dependent)
- Sulfur (KCl-40): 8 to 20 mg/kg
- Organic carbon: greater than 1.2% generally supports better N supply and structure

### Nutrition timing priorities

- N split across early growth and stem elongation to match rainfall and protein goals.
- P placed near seed at sowing for early vigor.
- S supplied early in deficient paddocks.

## Canola (Brassica napus)

### Typical nutrient demand and removal

- Nitrogen (N): Very high demand. Typical requirement about 40 to 80 kg N per tonne of seed, depending on target oil/protein.
- Phosphorus (P): Moderate to high early demand; removal around 6 to 9 kg P per tonne of seed.
- Potassium (K): Moderate to high; removal around 8 to 12 kg K per tonne of seed.
- Sulfur (S): High demand compared with cereals; roughly 10 to 15 kg S per tonne of seed.
- Boron (B): Important for flowering/pod set in deficient soils.
- Molybdenum (Mo): Can matter on acidic soils where N metabolism is constrained.

### Practical soil fertility targets (topsoil guide)

- pH (CaCl2): 5.5 to 7.5 (sensitive to strong acidity and Al toxicity)
- Colwell P: 25 to 45 mg/kg (depends on PBI and yield target)
- Exchangeable K: 100 to 220 mg/kg
- Sulfur (KCl-40): 10 to 25 mg/kg
- Boron (hot CaCl2): 0.5 to 1.5 mg/kg generally adequate in many systems

### Nutrition timing priorities

- Early N plus top-up around stem elongation where seasonal potential remains high.
- Ensure S is available before rapid biomass accumulation.
- Starter P at sowing for establishment and root growth.

## Lupins (Lupinus angustifolius and related species)

### Typical nutrient demand and removal

- Nitrogen (N): Lower fertilizer N need due to biological N fixation; effective nodulation is critical.
- Phosphorus (P): Moderate to high demand for root growth and nodulation.
- Potassium (K): Moderate demand; removal commonly 8 to 12 kg K per tonne of grain.
- Sulfur (S): Moderate demand, typically 3 to 6 kg S per tonne of grain.
- Molybdenum (Mo): Important for N fixation enzyme systems.
- Manganese (Mn): Can be limiting on high pH calcareous soils.

### Practical soil fertility targets (topsoil guide)

- pH (CaCl2): 5.0 to 7.0 (species dependent; avoid severe acidity and high Al)
- Colwell P: 20 to 40 mg/kg
- Exchangeable K: 80 to 200 mg/kg
- Sulfur (KCl-40): 8 to 20 mg/kg
- Aluminum (exchangeable): as low as possible, ideally less than 2%

### Nutrition timing priorities

- Seed inoculation with correct rhizobia strain is essential.
- P availability at sowing strongly affects nodulation and early vigor.
- Avoid excessive fertilizer N at sowing to prevent suppression of nodulation.

## Relative demand comparison (quick design guide)

- N demand: Canola > Wheat > Lupins (fertilizer N)
- P sensitivity at establishment: Canola ~= Lupins > Wheat
- S demand: Canola > Wheat ~= Lupins
- Micronutrient risk: Canola (B), Wheat (Zn/Cu), Lupins (Mo/Mn)

## How to use this in simulator balancing rules

- Weight N and S deficiencies more heavily for canola outcomes.
- Penalize lupin performance sharply if nodulation conditions are poor (low P, very acidic pH, high Al).
- Link wheat protein score to in-season N sufficiency.
