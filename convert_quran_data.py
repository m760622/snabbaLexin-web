
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
                item = {
                    "id": row[0],
                    "word": row[1],
                    "surah": row[2],
                    "meaning_ar": row[3],
                    "word_sv": row[4],
                    "ayah_full": row[5],
                    "ayah_sv": row[6]
                }
                data.append(item)

    # Write the JS file
    with open('quranData.js', 'w', encoding='utf-8') as jsfile:
        jsfile.write('const quranData = ')
        json.dump(data, jsfile, ensure_ascii=False, indent=4)
        jsfile.write(';\n\n// Make it available globally or export it if module system is used\nif (typeof module !== "undefined" && module.exports) {\n    module.exports = quranData;\n} else {\n    window.quranData = quranData;\n}\n')

if __name__ == "__main__":
    convert_csv_to_js()
