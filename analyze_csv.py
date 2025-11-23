
import csv

filename = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv'

with open(filename, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Analyze the first few lines
for i in range(5):
    parts = lines[i].strip().split(';')
    print(f"Line {i+1} has {len(parts)} columns.")
    for j, part in enumerate(parts):
        if part.strip():
            print(f"  Col {j}: {part}")
