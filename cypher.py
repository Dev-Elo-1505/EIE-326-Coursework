def caesar_cipher_encrypt(text, shift):
    result = ''
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) - start + shift) % 26 + start)
        else:
            result += char
    return result

result = caesar_cipher_encrypt('HELLO', 3)
print("Encrypted:", result)