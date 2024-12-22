import tkinter as tk
from tkinter import ttk, messagebox
from logic.barang import Barang  # pastikan modul ini sudah tersedia

def start_app():
    root = tk.Tk()
    root.title("Aplikasi Manajemen Inventori Laboratorium")
    root.geometry("600x400")

    # Frame untuk pencarian
    search_frame = tk.Frame(root)
    search_frame.pack(pady=10)

    tk.Label(search_frame, text="Cari Barang:").grid(row=0, column=0, padx=5)
    search_entry = tk.Entry(search_frame, width=30)
    search_entry.grid(row=0, column=1, padx=5)

    search_button = tk.Button(search_frame, text="Cari", command=lambda: cari_barang(search_entry))
    search_button.grid(row=0, column=2, padx=5)

    # Tabel untuk menampilkan barang
    tree = ttk.Treeview(root, columns=("ID", "Nama", "Jumlah", "Lokasi", "Status"), show="headings")
    tree.heading("ID", text="ID")
    tree.heading("Nama", text="Nama Barang")
    tree.heading("Jumlah", text="Jumlah")
    tree.heading("Lokasi", text="Lokasi")
    tree.heading("Status", text="Status")
    tree.pack(fill=tk.BOTH, expand=True, pady=10)

    # Tombol untuk operasi lainnya
    button_frame = tk.Frame(root)
    button_frame.pack(pady=10)

    add_button = tk.Button(button_frame, text="Tambah Barang", command=tambah_barang)
    add_button.grid(row=0, column=0, padx=10)

    borrow_button = tk.Button(button_frame, text="Pinjam Barang", command=pinjam_barang)
    borrow_button.grid(row=0, column=1, padx=10)

    # Fungsi untuk memuat barang dari database
    load_barang(tree)
    
    root.mainloop()

# Fungsi untuk memuat barang dari database ke dalam tabel
def load_barang(tree):
    tree.delete(*tree.get_children())
    barang_list = Barang.cari_barang()  # Mengambil data barang dari kelas Barang
    for barang in barang_list:
        tree.insert("", "end", values=barang)

# Fungsi pencarian barang
def cari_barang(entry):
    keyword = entry.get()
    # Implementasikan fungsi pencarian sesuai kebutuhan
    messagebox.showinfo("Pencarian", f"Mencari barang dengan kata kunci: {keyword}")

# Fungsi placeholder untuk tambah dan pinjam barang
def tambah_barang():
    messagebox.showinfo("Tambah Barang", "Form tambah barang akan muncul di sini.")

def pinjam_barang():
    messagebox.showinfo("Pinjam Barang", "Form pinjam barang akan muncul di sini.")
