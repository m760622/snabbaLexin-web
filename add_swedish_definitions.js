const fs = require('fs');

// Read data.js
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_ARB_DEF_SIMPLE = 5;
const COL_SWE_DEF = 6;

// Arabic to Swedish prefix mappings
const prefixMappings = {
    'مصطلح طبي': 'Medicinsk term',
    'مصطلح قانوني': 'Juridisk term',
    'مصطلح متخصص': 'Fackterm',
    'مصطلح سوق العمل': 'Arbetsmarknadsterm',
    'مصطلح بناء': 'Byggterm',
    'مصطلح هجرة': 'Migrationsterm',
    'مصطلح عسكري': 'Militärterm',
    'مصطلح ديني': 'Religiös term',
    'مصطلح مجتمعي': 'Samhällsterm',
    'مصطلح أسنان': 'Tandvårdsterm',
    'مصطلح تقني': 'Teknisk term',
    'مصطلح تعليمي': 'Utbildningsterm',
    'صفة تصف': 'Adjektiv som beskriver',
    'فعل يعني': 'Verb som betyder',
    'اسم يشير إلى': 'Substantiv som hänvisar till'
};

// Category to Swedish prefix mappings (for entries without Arabic prefix pattern)
const categoryPrefixes = {
    'Medicin': 'Medicinsk term',
    'MedicinMN': 'Medicinsk term',
    'MedicinMR': 'Medicinsk term',
    'MedicinR': 'Medicinsk term',
    'MedicinTB': 'Medicinsk term',
    'Juridik': 'Juridisk term',
    'JuridikMN': 'Juridisk term',
    'JuridikR': 'Juridisk term',
    'JuridikS': 'Juridisk term',
    'JuridikTB': 'Juridisk term',
    'Bygg': 'Byggterm',
    'Samhälle': 'Samhällsterm',
    'SamhälleMN': 'Samhällsterm',
    'SamhälleR': 'Samhällsterm',
    'SamhälleTB': 'Samhällsterm',
    'MigrationTB': 'Migrationsterm',
    'Militär': 'Militärterm',
    'Religion': 'Religiös term',
    'Multikulturella': 'Mångkulturell term',
    'Tandvård': 'Tandvårdsterm',
    'TandläkareMN': 'Tandvårdsterm',
    'ArbetsmarknadMN': 'Arbetsmarknadsterm',
    'ArbetsmarknadR': 'Arbetsmarknadsterm',
    'TeknikMN': 'Teknisk term',
    'UtbildningMN': 'Utbildningsterm',
    'Ekobrott': 'Ekonomisk brottsterm',
    'FörsäkringR': 'Försäkringsterm',
    'Försäkringskassan': 'Försäkringskassanterm',
    'FörsäkringskassanMN': 'Försäkringskassanterm',
    'KörkortMN': 'Körkortsterm',
    'Ministeriet': 'Myndighetsterm',
    'ÖvregaTB': 'Fackterm'
};

let updatedCount = 0;
let skippedCount = 0;

data.forEach((row, index) => {
    const arbDef = row[COL_ARB_DEF] || '';
    const sweDef = row[COL_SWE_DEF] || '';
    const sweWord = row[COL_SWE] || '';
    const type = (row[COL_TYPE] || '').replace('.', '');

    // Only process if Arabic def exists but Swedish def is empty
    if (arbDef.trim() !== '' && sweDef.trim() === '') {
        let swedishPrefix = null;

        // Try to find Arabic prefix pattern
        const colonIndex = arbDef.indexOf(':');
        if (colonIndex > 0 && colonIndex < 50) {
            const arabicPrefix = arbDef.substring(0, colonIndex).trim();
            swedishPrefix = prefixMappings[arabicPrefix];
        }

        // If no prefix found, use category mapping
        if (!swedishPrefix) {
            swedishPrefix = categoryPrefixes[type] || 'Definition';
        }

        // Create Swedish definition
        const newSweDef = `${swedishPrefix}: ${sweWord}`;
        row[COL_SWE_DEF] = newSweDef;
        updatedCount++;
    } else if (arbDef.trim() === '' && sweDef.trim() === '') {
        skippedCount++;
    }
});

console.log(`Updated: ${updatedCount} entries`);
console.log(`Skipped (no definitions): ${skippedCount} entries`);

// Generate new data.js content
let newContent = 'const dictionaryData = [\n';
data.forEach((row, index) => {
    newContent += '  [\n';
    row.forEach((field, fieldIndex) => {
        const escapedField = (field || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        newContent += `    "${escapedField}"`;
        if (fieldIndex < row.length - 1) {
            newContent += ',';
        }
        newContent += '\n';
    });
    newContent += '  ]';
    if (index < data.length - 1) {
        newContent += ',';
    }
    newContent += '\n';
});
newContent += '];\n';

// Write back to file
fs.writeFileSync('data.js', newContent);
console.log('File updated successfully!');
