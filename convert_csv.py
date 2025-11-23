
import csv
import json

input_filename = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv'
output_filename = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/data.js'

data = []

try:
    with open(input_filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    lines = content.splitlines()
    
    for line in lines:
        if not line.strip():
            continue
            
        parts = line.split(';')
        
        # Extract fields based on analysis
        # 0: ID, 1: Type, 2: Swe Word, 3: Arb Word, 4: Arb Def, 5: Swe Def, 
        # 7: Forms, 9: Ex Swe, 10: Ex Arb, 11: Idiom Swe, 12: Idiom Arb
        
        # Create a list instead of a dictionary to save space
        # Order: ID, Type, Swe, Arb, ArbDef, SweDef, Forms, ExSwe, ExArb, IdiomSwe, IdiomArb
        entry = [
            parts[0].strip() if len(parts) > 0 else "",   # 0: ID
            parts[1].strip() if len(parts) > 1 else "",   # 1: Type
            parts[2].strip() if len(parts) > 2 else "",   # 2: Swe
            parts[3].strip() if len(parts) > 3 else "",   # 3: Arb
            parts[4].strip() if len(parts) > 4 else "",   # 4: ArbDef
            parts[5].strip() if len(parts) > 5 else "",   # 5: SweDef
            parts[7].strip() if len(parts) > 7 else "",   # 6: Forms
            parts[9].strip() if len(parts) > 9 else "",   # 7: ExSwe
            parts[10].strip() if len(parts) > 10 else "", # 8: ExArb
            parts[11].strip() if len(parts) > 11 else "", # 9: IdiomSwe
            parts[12].strip() if len(parts) > 12 else ""  # 10: IdiomArb
        ]
        
        # Only add if there is at least a Swedish or Arabic word
        # Check indices 2 (Swe) and 3 (Arb)
        if entry[2] or entry[3]:
            data.append(entry)

    with open(output_filename, 'w', encoding='utf-8') as f:
        json_str = json.dumps(data, ensure_ascii=False, indent=0)
        f.write(f"const dictionaryData = {json_str};")

    print(f"Successfully converted {len(data)} entries to {output_filename}")

except Exception as e:
    print(f"Error: {e}")
