from database.db_connection import create_connection, close_connection
from datetime import date

class Peminjaman:
    def __init__(self, id_barang, id_pengguna):
        self.id_barang = id_barang
        self.id_pengguna = id_pengguna
        self.tanggal_pinjam = date.today()

    def pinjam_barang(self):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            # Cek apakah barang tersedia
            cursor.execute("SELECT status FROM barang WHERE id_barang = %s", (self.id_barang,))
            result = cursor.fetchone()
            if result and result[0] == "Tersedia":
                # Update status barang dan tambahkan ke tabel peminjaman
                cursor.execute("UPDATE barang SET status = 'Dipinjam' WHERE id_barang = %s", (self.id_barang,))
                sql = "INSERT INTO peminjaman (id_barang, id_pengguna, tanggal_pinjam) VALUES (%s, %s, %s)"
                values = (self.id_barang, self.id_pengguna, self.tanggal_pinjam)
                cursor.execute(sql, values)
                connection.commit()
                print("Barang berhasil dipinjam oleh pengguna.")
            else:
                print("Barang tidak tersedia untuk dipinjam.")
        except Exception as e:
            print(f"Error saat meminjam barang: {e}")
        finally:
            close_connection(connection)

    @staticmethod
    def kembalikan_barang(id_barang):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            # Cek apakah barang dipinjam
            cursor.execute("SELECT status FROM barang WHERE id_barang = %s", (id_barang,))
            result = cursor.fetchone()
            if result and result[0] == "Dipinjam":
                # Update status barang dan catat tanggal kembali di tabel peminjaman
                cursor.execute("UPDATE barang SET status = 'Tersedia' WHERE id_barang = %s", (id_barang,))
                cursor.execute(
                    "UPDATE peminjaman SET tanggal_kembali = %s WHERE id_barang = %s AND tanggal_kembali IS NULL",
                    (date.today(), id_barang)
                )
                connection.commit()
                print("Barang berhasil dikembalikan.")
            else:
                print("Barang tidak dalam status dipinjam.")
        except Exception as e:
            print(f"Error saat mengembalikan barang: {e}")
        finally:
            close_connection(connection)

    def riwayat_peminjaman(self, id_pengguna):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            # Ambil data riwayat peminjaman berdasarkan ID pengguna
            sql = """
                SELECT b.nama_barang, p.tanggal_pinjam
                FROM peminjaman p
                JOIN barang b ON p.id_barang = b.id_barang
                WHERE p.id_pengguna = %s
            """
            cursor.execute(sql, (id_pengguna,))
            result = cursor.fetchall()
            if result:
                print(f"Riwayat peminjaman pengguna ID {id_pengguna}:")
                for row in result:
                    print(f"Barang: {row[0]}, Tanggal Pinjam: {row[1]}")
            else:
                print("Tidak ada riwayat peminjaman untuk pengguna ini.")
        except Exception as e:
            print(f"Error saat mengambil riwayat peminjaman: {e}")
        finally:
            close_connection(connection)

    def kembalikan_barang(self):
        # Pastikan koneksi database dibuat di dalam fungsi
        connection = create_connection()
        try:
            cursor = connection.cursor()
            # Cek apakah barang yang dipinjam ada dalam tabel peminjaman
            cursor.execute("SELECT id_barang, id_pengguna FROM peminjaman WHERE id_barang = %s AND id_pengguna = %s", (self.id_barang, self.id_pengguna))
            result = cursor.fetchone()
            if result:
                # Update status barang menjadi Tersedia
                cursor.execute("UPDATE barang SET status = 'Tersedia' WHERE id_barang = %s", (self.id_barang,))
                # Hapus data peminjaman dari tabel peminjaman
                cursor.execute("DELETE FROM peminjaman WHERE id_barang = %s AND id_pengguna = %s", (self.id_barang, self.id_pengguna))
                connection.commit()
                print("Barang berhasil dikembalikan.")
            else:
                print("Barang ini tidak dipinjam oleh pengguna ini.")
        except Exception as e:
            print(f"Error saat mengembalikan barang: {e}")
        finally:
            close_connection(connection)  # Pastikan koneksi ditutup di sini

    def tampilkan_laporan_peminjaman(self):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            # Ambil data peminjaman dari tabel peminjaman dan pengguna
            cursor.execute("""
                SELECT p.id_barang, b.nama_barang, u.nama, p.tanggal_pinjam
                FROM peminjaman p
                JOIN barang b ON p.id_barang = b.id_barang
                JOIN pengguna u ON p.id_pengguna = u.id_pengguna
                ORDER BY p.tanggal_pinjam DESC
            """)
            result = cursor.fetchall()
            if result:
                print("Laporan Peminjaman Barang:")
                for row in result:
                    print(f"ID Barang: {row[0]}, Nama Barang: {row[1]}, Pengguna: {row[2]}, Tanggal Pinjam: {row[3]}")
            else:
                print("Tidak ada peminjaman barang.")
        except Exception as e:
            print(f"Error saat menampilkan laporan peminjaman: {e}")
        finally:
            close_connection(connection)
