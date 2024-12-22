from database.db_connection import create_connection, close_connection

class Barang:
    def __init__(self, nama_barang, jumlah, lokasi, status="Tersedia"):
        self.nama_barang = nama_barang
        self.jumlah = jumlah
        self.lokasi = lokasi
        self.status = status

    def tambah_barang(self):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            sql = "INSERT INTO barang (nama_barang, jumlah, lokasi, status) VALUES (%s, %s, %s, %s)"
            values = (self.nama_barang, self.jumlah, self.lokasi, self.status)
            cursor.execute(sql, values)
            connection.commit()
            print("Barang berhasil ditambahkan.")
        except Exception as e:
            print(f"Error saat menambahkan barang: {e}")
        finally:
            close_connection(connection)

    @staticmethod
    def hapus_barang(id_barang):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            sql = "DELETE FROM barang WHERE id_barang = %s"
            cursor.execute(sql, (id_barang,))
            connection.commit()
            print("Barang berhasil dihapus.")
        except Exception as e:
            print(f"Error saat menghapus barang: {e}")
        finally:
            close_connection(connection)

    @staticmethod
    def update_barang(id_barang, nama_barang=None, jumlah=None, lokasi=None, status=None):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            updates = []
            values = []
            if nama_barang:
                updates.append("nama_barang = %s")
                values.append(nama_barang)
            if jumlah is not None:
                updates.append("jumlah = %s")
                values.append(jumlah)
            if lokasi:
                updates.append("lokasi = %s")
                values.append(lokasi)
            if status:
                updates.append("status = %s")
                values.append(status)

            values.append(id_barang)
            sql = f"UPDATE barang SET {', '.join(updates)} WHERE id_barang = %s"
            cursor.execute(sql, values)
            connection.commit()
            print("Barang berhasil diperbarui.")
        except Exception as e:
            print(f"Error saat memperbarui barang: {e}")
        finally:
            clo



#cari barang --------------------------------------------------------------
    @staticmethod
    def cari_barang(keyword=None, lokasi=None, status=None):
        connection = create_connection()
        results = []
        try:
            cursor = connection.cursor()
            sql = "SELECT * FROM barang WHERE 1=1"
            values = []
            if keyword:
                sql += " AND nama_barang LIKE %s"
                values.append(f"%{keyword}%")
            if lokasi:
                sql += " AND lokasi = %s"
                values.append(lokasi)
            if status:
                sql += " AND status = %s"
                values.append(status)
            cursor.execute(sql, values)
            results = cursor.fetchall() or []  # Mengembalikan list kosong jika tidak ada hasil

        except Exception as e:
            print(f"Error saat mencari barang: {e}")
        finally:
            close_connection(connection)
        return results  # Selalu mengembalikan list



# cek ketersediaan ----------------------------------------------------------------
    @staticmethod
    def cek_ketersediaan(id_barang):
        connection = create_connection()
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT jumlah, nama_barang FROM barang WHERE id_barang = %s", (id_barang,))
            result = cursor.fetchone()
            if result:
                jumlah, nama_barang = result
                if jumlah > 0:
                    print(f"Barang '{nama_barang}' tersedia dengan jumlah: {jumlah}")
                else:
                    print(f"Barang '{nama_barang}' sudah habis.")
            else:
                print("Barang tidak ditemukan.")
        except Exception as e:
            print(f"Error saat mengecek ketersediaan barang: {e}")
        finally:
            close_connection(connection)
