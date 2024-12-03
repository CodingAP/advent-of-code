value = '165061'
digits = [int(digit) for digit in str(value)]

class Scoreboard(list):
    def __init__(self):
        super().__init__([3,7])
        self.elf1 = 0
        self.elf2 = 1
    
    def __next__(self):
        total = self[self.elf1] + self[self.elf2]
        self.extend(divmod(total, 10) if total >= 10 else (total,))
        self.elf1 = (self.elf1 + 1 + self[self.elf1]) % len(self)
        self.elf2 = (self.elf2 + 1 + self[self.elf2]) % len(self)
      
#Part 1
scores = Scoreboard()
value = int(value)
while len(scores) < value + 10:
    next(scores)
    
print(''.join(str(score) for score in scores[value:value+10]))

#Part2
scores = Scoreboard()
while scores[-len(digits):] != digits and scores[-len(digits)-1:-1] != digits:
    next(scores)

print(len(scores) - len(digits) - (0 if scores[-len(digits):] == digits else 1))