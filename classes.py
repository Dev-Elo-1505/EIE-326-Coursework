class Employee:
    
    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        self.email = f"{first.lower()}.{last.lower()}@company.com"

emp_1 = Employee("Joy", "Addisi", 1000000)
print(emp_1.email)