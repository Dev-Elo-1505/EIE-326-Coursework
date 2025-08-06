import requests
import os
from dotenv import load_dotenv

load_dotenv()
access_key = os.getenv('access_key')

def convert_currency(base_currency, target_currency, amount):
    response = requests.get(f'https://api.exchangerate.host/convert?from={base_currency}&to={target_currency}&amount={amount}&access_key={access_key}')
    if response.status_code == 200:
        data = response.json()
        if data.get('result') is not None:
            return data
        else:
            raise ValueError("Invalid currency code or data not available.")
    else:
        raise Exception("Error fetching data from the API. Please try again later.")
    

def main():
    print("Welcome to Currency Converter!!")
    
    while True:
        base_currency = input("Enter base currency (e.g NGN, USD): ").upper()
        target_currency = input("Enter target currency (e.g NGN, USD): ").upper()
        while True:
            amount = input("Enter amount to convert: ")
            try:
                amount = float(amount)
                break
            except ValueError:
                print("Please enter a valid amount.")
                
        try:
            result = convert_currency(base_currency, target_currency, amount)
            converted_amount = result['result']
            print(f"{amount} {base_currency} is equal to {converted_amount:,.2f} {target_currency}.")
        except ValueError as e:
            print("Error:", e)
        except Exception as e:
            print("Error:", e)

        again = input("Do you want to make another conversion? (yes/no): ").strip().lower()
        if again != 'yes':
            print("Thank you for using the Currency Converter!")
            break

    

if __name__ == "__main__":
    main()
    
