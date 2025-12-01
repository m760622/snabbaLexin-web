const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const sentences = {
    "ÅDER": "Blodet rinner i ådrorna.",
    "ÅKTA": "Det är äkta guld.",
    "ÅLDRAS": "Alla åldras.",
    "ÅNGA": "Vatten blir till ånga.",
    "ÅR": "Gott nytt år!",
    "AR": "Tomten är på 10 ar.",
    "ÄR": "Jag är glad.",
    "ÄRRA": "Han har ett ärra på kinden.",
    "ÄRT": "Ärtsoppa är gott.",
    "AS": "Det luktar as.",
    "ÅSKA": "Åskan går.",
    "ÅSNA": "Åsnan är envis.",
    "ÅT": "Han åt ett äpple.",
    "ÄTTA": "Han tillhör en kunglig ätta.",
    "AV": "Boken är skriven av mig.",
    "BADRUM": { s: "Jag tvättar mig i badrummet." }, // Object format just in case, but string is fine
    "BERGET": "Berget är högt.",
    "BILJETT": "Jag har köpt en biljett.",
    "BRODER": "Han är min broder.",
    "BROR": "Min bror leker med mig.",
    "DÅ": "Jag var liten då.",
    "DATORN": "Datorn är ny.",
    "DJUREN": "Djuren lever i skogen.",
    "DÖ": "Blommor dör utan vatten.",
    "DOTTER": "Hon är en smart dotter.",
    "EK": "Eken är ett starkt träd.",
    "EL": "Elen har gått.",
    "ETT": "Nummer ett.",
    "FÅ": "Jag fick en present.",
    "FAMILJ": "Jag älskar min familj.",
    "FAMILJEN": "Hela familjen är samlad.",
    "FAR": "Min far arbetar hårt.",
    "FARMOR": "Farmor bakar bullar.",
    "FE": "Fen i sagan.",
    "FLODEN": "Floden rinner mot havet.",
    "FLYGPLAN": "Flygplanet är stort.",
    "FÖNSTER": "Öppna fönstret.",
    "FRUKOST": "Frukost är viktigaste måltiden.",
    "GARDEROB": "Mina kläder hänger i garderoben.",
    "GRÖNSAK": "Ät dina grönsaker.",
    "HA": "Jag har en bok.",
    "HIMMEL": "Himlen är blå.",
    "HÖSTEN": "Löven faller på hösten.",
    "JA": "Ja, det vill jag.",
    "JO": "Jo, det gjorde jag.",
    "JU": "Du vet ju det.",
    "KAMERA": "Ta ett kort med kameran.",
    "KÖKET": "Vi lagar mat i köket.",
    "KUSIN": "Min kusin kommer på besök.",
    "LE": "Hon ler alltid.",
    "LINJAL": "Dra ett streck med linjalen.",
    "LÖKAR": "Vi behöver lök till maten.",
    "MIDDAG": "Vad blir det till middag?",
    "MÖ": "En ung mö.",
    "MORFAR": "Morfar berättar sagor.",
    "NÅ": "Har du nått fram?",
    "NATUR": "Vi älskar naturen.",
    "ÖKNA": "Ett roligt öknamn.",
    "ÖL": "En kall öl.",
    "OM": "Berätta om det.",
    "ÖM": "Min fot är öm.",
    "ÖN": "Vi bor på en ö.",
    "ÖRA": "Jag hör med örat.",
    "ÖRT": "Timjan är en ört.",
    "ÖST": "Solen går upp i öst.",
    "ÖT": "Han jobbade övertid.",
    "PEPPAR": "Peppar är starkt.",
    "RÅ": "Köttet är rått.",
    "RADERGUMMI": "Jag använder radergummi.",
    "RO": "Jag behöver lugn och ro.",
    "SALTET": "Var är saltet?",
    "SEMESTER": "Vi är på semester.",
    "SKOLAN": "Skolan ligger nära.",
    "SOCKER": "Vill du ha socker i kaffet?",
    "SOMMAR": "Sommaren är varm.",
    "SOVRUM": "Jag sover i sovrummet.",
    "SPEGEL": "Titta i spegeln.",
    "STRAND": "Vi leker på stranden.",
    "SUDD": "Har du ett sudd?",
    "SYSTER": "Min syster läser en bok.",
    "TELEFON": "Telefonen ringer.",
    "TRÄDGÅRD": "Vi har en fin trädgård.",
    "UR": "Gå ur rummet.",
    "UT": "Gå ut.",
    "UTLAND": "Vi reste utomlands.",
    "VÅ": "Vå är här (dialekt).",
    "VÅREN": "Blommorna slår ut på våren.",
    "VATTEN": "Drick mycket vatten.",
    "VINTER": "Vintern är kall.",
    "YRA": "Han yrar av feber.",
    "YTA": "Vattnets yta.",
    "YXA": "Hugg ved med yxan.",
    "ZON": "Det är en farlig zon.",
    "ZOO": "Vi besökte ett zoo.",
    "ÄGGA": "Han äggade upp stämningen.",
    "ÄKTA": "Det är äkta vara.",
    "ÄLGA": "Han älgade fram i skogen.",
    "ÄLVA": "Älvorna dansar i dimman.",
    "ÄNDA": "Slutet på vägen.",
    "ÄNGEL": "Du är en ängel.",
    "ÄNKA": "Hon är änka.",
    "AL": "Alen växer vid vattnet.",
    "LE": "Hon ler mot mig."
};

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
if (!dictMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

let WC_DICTIONARY;
try {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
} catch (e) {
    console.error("Error parsing dictionary:", e);
    process.exit(1);
}

let updatedCount = 0;

WC_DICTIONARY.forEach(entry => {
    if (entry.s === "TODO_SWEDISH_SENTENCE") {
        const sentence = sentences[entry.w];
        if (sentence) {
            entry.s = typeof sentence === 'string' ? sentence : sentence.s;
            updatedCount++;
        } else {
            console.warn(`Missing sentence for: ${entry.w}`);
            // Fallback to generic if not found (shouldn't happen if I covered all)
            entry.s = `Ord: ${entry.w}`;
            updatedCount++;
        }
    }
});

if (updatedCount > 0) {
    console.log(`Updating dictionary with ${updatedCount} sentences...`);
    WC_DICTIONARY.sort((a, b) => a.w.localeCompare(b.w));
    const newDictStr = JSON.stringify(WC_DICTIONARY, null, 4);
    fileContent = fileContent.replace(dictMatch[1], newDictStr);
    fs.writeFileSync(dataFilePath, fileContent);
    console.log("Done! wordConnectData.js updated.");
} else {
    console.log("No sentence updates needed.");
}
