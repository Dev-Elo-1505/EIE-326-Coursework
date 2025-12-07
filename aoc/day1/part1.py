input_str = """
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
""".strip()

input_arr = input_str.split()

count = 0
pointer = 50

for line in input_arr:
    direction = line[0]
    steps = int(line[1:])
    if direction == "R":
        pointer = (pointer + steps) % 100
    else:
        pointer = (pointer - steps) % 100
    
    if pointer == 0:
        count += 1

print(count)