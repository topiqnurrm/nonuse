import mysql.connector
from mysql.connector import Error

def create_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",       # Sesuaikan dengan user MySQL Anda
            password="",       # Sesuaikan dengan password MySQL Anda
            database="inventori_script15"
        )
        if connection.is_connected():
            print("Koneksi ke database berhasil!")
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None

def close_connection(connection):
    if connection.is_connected():
        connection.close()
        print("Koneksi database ditutup.")
