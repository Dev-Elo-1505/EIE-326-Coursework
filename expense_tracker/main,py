# use an array/object to store expense
# adding pushes to the array
# viewing lists the array
# deleting pops from the array/ (find out how to delete from middle)
# updating hmmmmm
# saving to a csv file
# charts with matplotlib

from datetime import date
import csv
import os

FILE_NAME = "expenses.csv"

if not os.path.exists(FILE_NAME):
    with open(FILE_NAME, mode='w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Id','Date', 'Category', 'Amount', 'Description'])

def get_next_id():
    if not os.path.exists(FILE_NAME) or os.stat(FILE_NAME).st_size == 0:
        return 1
    with open(FILE_NAME, mode='r') as csvfile:
        reader = list(csv.reader(csvfile))
        if len(reader) <= 1:
            return 1
        last_id = (reader[-1][0])
        return last_id + 1

def add_expense():
    print("Adding an expense...")
    date_entry = date.today().strftime("%d-%b-%Y")
    category = input("Enter what money was spent on: e.g(Food, Transport, Data): ").capitalize()
    
    while True:
        try:
            amount = float(input("Enter the amount spent: "))
            if amount < 0:
                print("Amount cannot be negative. Please enter a valid amount.")
                continue
            break
        except ValueError:
            print("Invalid input. Please enter a numeric value.")
            
    description = input('Enter a brief description: ')
    next_id = get_next_id()  
    
    with open(FILE_NAME, mode='a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([next_id, date_entry, category, amount, description])

    print(f"Expense added successfully: ID: {next_id} {amount:.2f} naira - {category} - {date_entry}")

    

def view_expenses():
    print("Viewing expenses...")
    if not os.path.exists(FILE_NAME) or os.stat(FILE_NAME).st_size == 0:
        print('No expenses recorded yet.')
        return
    
    with open(FILE_NAME, mode='r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        
        print('\nId         | Date            | Category         | Amount       | Description')
        print('-'*70)
        for row in reader:
            print(f"{row[0]:<4} | {row[1]:<13} | {row[2]:<15} | {row[3]:>10.2f} | {row[4]}")

            
    
            

def delete_expense():
    print("Deleting an expense...")

def update_expense():
    print("Updating an expense...")
    
def visualize_expenses():
    print("Visualizing expenses...")

def main():
    print("Welcome to the Expense Tracker!")
    while True:
        print("\nMenu:")
        print("1. Add Expense")
        print("2. View Expenses")
        print("3. Delete Expense")
        print("4. Update Expense")
        print("5. Visualize expense")
        print("6. Exit")
        choice = input("Please choose an option (1-6): ")


        if choice == "1":
            add_expense()
        elif choice == "2":
            view_expenses()
        elif choice == "3":
            delete_expense()
        elif choice == "4":
            update_expense()
        elif choice == "5":
            visualize_expenses()
        elif choice == "6":
            print("Exiting the Expense Tracker. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
        

if __name__ == "__main__":
    main()