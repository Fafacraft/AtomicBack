import fs from 'fs';
import { parse } from 'csv-parse/sync';

function formatHalfLife(halfLife) {
    // Normalize string
    const value = String(halfLife).toLowerCase();

    if (value === "stable") return "Stable";

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return halfLife; // Return original if not a valid number

    const units = [
        { name: "millisecond", value: 1e-3 },
        { name: "second", value: 1 },
        { name: "minute", value: 60 },
        { name: "hour", value: 3600 },
        { name: "day", value: 86400 },
        { name: "year", value: 31557600 },     // ~365.25 days
    ];

    // Find best unit (largest possible where value >= unit.value)
    let chosen = units[0]; // default to millisecond
    for (let i = units.length - 1; i >= 0; i--) {
        if (numValue >= units[i].value) {
            chosen = units[i];
            break;
        }
    }

    const result = numValue / chosen.value;

    // Format nicely (limit decimals)
    const formatted = result >= 100
        ? result.toFixed(0)
        : result >= 10
            ? result.toFixed(1)
            : result.toFixed(2);

    const isPlural = parseFloat(formatted) !== 1;
    if (formatted === "0.00") return "<0.01 millisecond"; // Handle very small values

    return `${formatted} ${chosen.name}${isPlural ? "s" : ""}`;
};

export const atomService = {
    /**
     * Get the stability of an atom based on its number of protons and neutrons, data from nudat3
     * https://www.nndc.bnl.gov/nudat3/
     * 
     * @param {string} proton 
     * @param {string} neutron 
     */
    getStability: async (proton, neutron) => {
        const p = parseInt(proton);
        const n = parseInt(neutron);

        // Load CSV file as string
        const csvString = fs.readFileSync('data/nndc_nudat_data_export.csv', 'utf-8');

        // Parse CSV into objects
        const data = parse(csvString, {
            columns: true,  // Use first row as header
            skip_empty_lines: true
        });

        const atom = data.find(a => Number(a.z) === p && Number(a.n) === n);

        var $result = "";
        if (atom) {
            $result = formatHalfLife(atom.halflife);
        } else {
            $result = 'unknown';
        }
        return $result;
    },
}
