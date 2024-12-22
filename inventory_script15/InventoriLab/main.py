#1 -----------------------------------------------------------------------
# from database.db_connection import create_connection, close_connection

# if __name__ == "__main__":
#     # Membuat koneksi ke database
#     conn = create_connection()
#     # Menutup koneksi setelah pengujian
#     close_connection(conn)

#2 -----------------------------------------------------------------------
# from logic.barang import Barang

# if __name__ == "__main__":
#     # Contoh menambahkan barang baru
#     barang_baru = Barang("Komputer", 5, "Lab A", "Tersedia")
#     barang_baru.tambah_barang()

#3 -----------------------------------------------------------------------
# from logic.peminjaman import Peminjaman

# if __name__ == "__main__":
#     # Contoh peminjaman barang
#     peminjaman = Peminjaman(1, "Andi")
#     peminjaman.pinjam_barang()

#     # Contoh pengembalian barang
#     Peminjaman.kembalikan_barang(1)

#4 -----------------------------------------------------------------------
# from logic.barang import Barang

# if __name__ == "__main__":
#     # Contoh pencarian barang berdasarkan nama
#     Barang.cari_barang(keyword="Komputer")

#     # Contoh pencarian barang berdasarkan lokasi
#     Barang.cari_barang(lokasi="Lab A")

#     # Contoh pencarian barang berdasarkan status
#     Barang.cari_barang(status="Tersedia")

#5 cek ketersediaan ----------------------------------------------------------
# from logic.barang import Barang

# if __name__ == "__main__":
#     # Cek ketersediaan barang dengan id_barang 1
#     Barang.cek_ketersediaan(1)


#6 peminjaman barang dengan pengguna --------------------------------------------
# from logic.peminjaman import Peminjaman

# if __name__ == "__main__":
#     # Contoh peminjaman barang dengan ID pengguna
#     peminjaman = Peminjaman(id_barang=1, id_pengguna=1)
#     peminjaman.pinjam_barang()


#7 riwayat pinjaman id --------------------------------------------
# from logic.peminjaman import Peminjaman

# if __name__ == "__main__":
#     # Contoh melihat riwayat peminjaman untuk pengguna dengan ID 1
#     peminjaman = Peminjaman(id_barang=1, id_pengguna=1)
#     peminjaman.riwayat_peminjaman(id_pengguna=1)


#8 pengembalian barang --------------------------------------------
# from logic.peminjaman import Peminjaman

# if __name__ == "__main__":
#     # Contoh pengembalian barang dengan ID pengguna dan ID barang
#     peminjaman = Peminjaman(id_barang=1, id_pengguna=1)
#     peminjaman.kembalikan_barang()


#8 laporan peminjaman --------------------------------------------
# from logic.peminjaman import Peminjaman

# if __name__ == "__main__":
#     # Contoh menampilkan laporan peminjaman
#     peminjaman = Peminjaman(id_barang=1, id_pengguna=1)
#     peminjaman.tampilkan_laporan_peminjaman()


# main.py
from gui.gui import start_app  # Asumsikan ada fungsi 'start_app' dalam gui.py untuk memulai GUI

if __name__ == "__main__":
    start_app()
