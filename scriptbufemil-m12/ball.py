import turtle
import random
import math

# Membuat window
wn = turtle.Screen()
wn.bgcolor("black")  # Mengatur warna latar belakang menjadi hitam
wn.title("Bouncing Shapes Simulator")
wn.tracer(0)  # Mematikan auto-update untuk meningkatkan kinerja

# Membuat list untuk menyimpan bentuk
shapes = ["circle", "square", "triangle"]  # Daftar bentuk yang tersedia
colors = ["red", "green", "blue", "yellow", "purple", "orange", "white"]  # Daftar warna yang tersedia

# Membuat list untuk menyimpan objek bentuk
shapes_list = []

# Mengatur jumlah bentuk
num_shapes = 10

# Membuat bentuk
for _ in range(num_shapes):
    shape = turtle.Turtle()
    shape.shape(random.choice(shapes))  # Memilih bentuk acak
    shape.color(random.choice(colors))  # Memilih warna acak
    shape.speed(0)  # Kecepatan animasi
    shape.penup()  # Menghapus jejak
    shape.goto(random.randint(-350, 350), random.randint(0, 250))  # Memindahkan bentuk ke posisi acak

    shape.dy = random.uniform(5, 10)  # Kecepatan vertikal acak lebih tinggi
    shape.dx = random.choice([-3, 3])  # Kecepatan horizontal acak (kiri atau kanan)
    shape.setheading(random.randint(0, 360))  # Mengatur sudut awal acak
    shapes_list.append(shape)  # Menambahkan bentuk ke list

gravity = 0.3  # Meningkatkan gravitasi untuk pantulan yang lebih tinggi
friction = 0.98  # Mengurangi faktor gesekan untuk memperlambat bola

def check_collision(shape1, shape2):
    # Menghitung jarak antara dua bentuk
    distance = math.sqrt((shape1.xcor() - shape2.xcor()) ** 2 + (shape1.ycor() - shape2.ycor()) ** 2)
    return distance < 30  # Mengatur ambang batas untuk tabrakan

def update():
    for shape in shapes_list:  # Memperbarui semua bentuk dalam list
        shape.dy -= gravity  # Menerapkan gravitasi
        shape.sety(shape.ycor() + shape.dy)  # Memperbarui koordinat y
        shape.setx(shape.xcor() + shape.dx)  # Memperbarui koordinat x
        shape.right(2)  # Memutar bentuk sedikit setiap frame

        # Memeriksa untuk pantulan
        # Y cor
        if shape.ycor() < -300:
            shape.sety(-300)  # Memastikan bentuk tidak keluar dari batas bawah
            shape.dy *= -0.8  # Membalikkan arah bentuk dengan sedikit kehilangan energi

            # Memastikan bentuk tidak memantul terlalu lemah
            if abs(shape.dy) < 1:  # Jika kecepatan bentuk di bawah ambang tertentu
                shape.dy = 0  # Set kecepatan menjadi 0

        # Memeriksa untuk pantulan di sudut kanan
        if shape.xcor() > 400:  # Mengatur batas kanan
            shape.setx(400)  # Memastikan bentuk tidak keluar dari batas kanan
            shape.dx *= -0.8  # Membalikkan arah bentuk dengan sedikit kehilangan energi

        # Memastikan bentuk tidak keluar dari batas atas
        if shape.ycor() > 300:
            shape.sety(300)  # Memastikan bentuk tidak keluar dari batas atas
            shape.dy *= -0.8  # Membalikkan arah bentuk dengan sedikit kehilangan energi

        # Memeriksa untuk pantulan di sudut kiri
        if shape.xcor() < -400:  # Mengatur batas kiri
            shape.setx(-400)  # Memastikan bentuk tidak keluar dari batas kiri
            shape.dx *= -0.8  # Membalikkan arah bentuk dengan sedikit kehilangan energi

    # Memeriksa tabrakan antara semua bentuk
    for i in range(len(shapes_list)):
        for j in range(i + 1, len(shapes_list)):
            if check_collision(shapes_list[i], shapes_list[j]):
                # Menghitung arah tabrakan
                shapes_list[i].dx, shapes_list[j].dx = shapes_list[j].dx, shapes_list[i].dx
                shapes_list[i].dy, shapes_list[j].dy = shapes_list[j].dy, shapes_list[i].dy

    wn.update()  # Memperbarui window
    wn.ontimer(update, 16)  # Memanggil fungsi ini lagi setelah 16 ms untuk animasi yang lebih halus

# Memulai loop update
update()

# Menjaga window tetap terbuka
wn.mainloop()
