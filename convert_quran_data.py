
import csv
import json

def convert_csv_to_js():
    data = []
    # Read the CSV file
    with open('quran.csv', 'r', encoding='utf-8') as csvfile:
        # Use csv.reader to handle quoted fields correctly
        reader = csv.reader(csvfile)
        # Skip the header
        next(reader, None)
        
        for row in reader:
            if len(row) >= 7:
                
                
                # Heuristics for Word Type (Swedish & Arabic)
                word_sv = row[4].strip()
                word_sv_lower = word_sv.lower()
                word_ar = row[1].strip()
                meaning_ar = row[3].strip()
                
                word_type = "word" # Default
                parts = word_sv_lower.split()

                # 1. Phrases (Multiple words)
                if len(parts) > 1 and not word_sv_lower.startswith(("en ", "ett ", "den ", "det ")):
                     word_type = "phrase"
                
                # 2. Verbs (Swedish 'att', or Arabic imperfect prefixes 'يَتَ...', 'يَ...')
                elif word_sv_lower.startswith("att ") or (word_ar.startswith("ي") and len(word_ar) > 3):
                    word_type = "verb"
                
                # 3. Nouns (Swedish articles or Arabic 'Al-')
                elif word_sv_lower.startswith(("en ", "ett ", "den ", "det ")) or word_ar.startswith("ال") or meaning_ar.startswith("ال"):
                    word_type = "noun"
                
                # 4. Adjectives (Sifat) - Swedish Suffixes
                elif word_sv_lower.endswith(("ande", "ende", "ig", "lig", "full", "bar", "sam")):
                    word_type = "adjective"

                # 5. Adverbs/Adjectives (Arabic Tanwin Fath often implies state/adverb/indefinite noun)
                elif word_ar.endswith("ً"): 
                    # Ambiguous: Could be Noun or Adverb. Check Swedish.
                    if word_sv_lower.endswith("t") or word_sv_lower.endswith("vis"):
                        word_type = "adjective" # Often adverbs in SE end in 't' but adjectives too. Let's group Adjective/Adverb or just Adjective.
                    else:
                        word_type = "adjective" # Fallback for Tanwin words (often descriptors)
                
                # 6. Fallback Nouns
                elif word_type == "word" and not word_sv_lower.endswith("a"): 
                     word_type = "noun" # Guess

                item = {
                    "id": row[0],
                    "word": row[1],
                    "surah": row[2],
                    "meaning_ar": row[3],
                    "word_sv": row[4],
                    "ayah_full": row[5],
                    "ayah_sv": row[6],
                    "type": word_type
                }
                data.append(item)

    # Write the JS file
    with open('quranData.js', 'w', encoding='utf-8') as jsfile:
        jsfile.write('const quranData = ')
        json.dump(data, jsfile, ensure_ascii=False, indent=4)
        jsfile.write(';\n\n// Make it available globally or export it if module system is used\nif (typeof module !== "undefined" && module.exports) {\n    module.exports = quranData;\n} else {\n    window.quranData = quranData;\n}\n')

if __name__ == "__main__":
    convert_csv_to_js()
