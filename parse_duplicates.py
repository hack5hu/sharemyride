import json

with open('./jscpd-report/jscpd-report.json') as f:
    data = json.load(f)

duplicates = data.get('duplicates', [])
summary = {}

for dup in duplicates:
    file1 = dup['firstFile']['name']
    file2 = dup['secondFile']['name']
    lines = dup.get('lines', 0)
    tokens = dup.get('tokens', 0)
    
    pair = tuple(sorted([file1, file2]))
    if pair not in summary:
        summary[pair] = {'lines': 0, 'tokens': 0, 'count': 0}
    
    summary[pair]['lines'] += lines
    summary[pair]['tokens'] += tokens
    summary[pair]['count'] += 1

sorted_summary = sorted(summary.items(), key=lambda x: x[1]['lines'], reverse=True)

for pair, stats in sorted_summary:
    print(f"{pair[0]} <---> {pair[1]}: {stats['lines']} lines duplicated ({stats['count']} occurrences, {stats['tokens']} tokens)")
