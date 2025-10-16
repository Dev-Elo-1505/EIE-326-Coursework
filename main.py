t = 'anagram'
expected_frq = [0] * 26

for c in t:
    expected_frq[ord(c) - ord('a')] += 1
    print(expected_frq)
