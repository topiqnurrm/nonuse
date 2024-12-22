-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2024 at 03:05 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbaiotani`
--

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(50) NOT NULL,
  `tanggal_pemesanan` date NOT NULL,
  `total_belanja` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pemesanan`
--

INSERT INTO `pemesanan` (`id_pemesanan`, `tanggal_pemesanan`, `total_belanja`) VALUES
(49, '2024-12-20', 2679000),
(50, '2024-12-20', 17063900);

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan_produk`
--

CREATE TABLE `pemesanan_produk` (
  `id_pemesanan_produk` int(50) NOT NULL,
  `id_pemesanan` int(50) NOT NULL,
  `id_menu` varchar(50) NOT NULL,
  `jumlah` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pemesanan_produk`
--

INSERT INTO `pemesanan_produk` (`id_pemesanan_produk`, `id_pemesanan`, `id_menu`, `jumlah`) VALUES
(1, 1, '101', 2),
(2, 1, '102', 1),
(3, 1, '118', 1),
(4, 2, '120', 1),
(5, 2, '119', 1),
(6, 2, '105', 1),
(7, 2, '109', 1),
(8, 2, '112', 1),
(45, 47, '102', 2),
(46, 47, '101', 2),
(47, 48, '118', 1),
(48, 48, '120', 1),
(49, 48, '109', 1),
(50, 49, '147', 1),
(51, 49, '134', 1),
(52, 50, '135', 2),
(53, 50, '139', 2),
(54, 50, '134', 2),
(55, 50, '129', 1),
(56, 50, '131', 1),
(57, 50, '132', 1),
(58, 50, '138', 1),
(59, 50, '144', 1),
(60, 50, '146', 1),
(61, 50, '136', 1),
(62, 50, '130', 1);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_menu` int(50) NOT NULL,
  `nama_menu` varchar(50) NOT NULL,
  `jenis_menu` varchar(50) NOT NULL,
  `stok` int(50) NOT NULL,
  `harga` int(50) NOT NULL,
  `gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_menu`, `nama_menu`, `jenis_menu`, `stok`, `harga`, `gambar`) VALUES
(129, 'Starter IoT Smart Garden - Kit IoT Penyiram Tanama', 'Alat', 50, 654000, '1.png'),
(130, 'IoT Kit Smart Farming - Kit IoT Pertanian Cerdas', 'Alat', 40, 1890000, '2.png'),
(131, 'Sensor Kelembaban Tanah IoT', 'Alat', 45, 500000, '3.png'),
(132, 'Sensor Suhu dan Kelembaban Udara IoT', 'Alat', 30, 600000, '4.png'),
(133, 'Drone Pertanian dengan Teknologi IoT', 'Alat', 35, 15000000, '5.png'),
(134, 'Sistem Irigasi Otomatis Berbasis IoT', 'Alat', 20, 2500000, '6.png'),
(135, 'Modul Sensor IoT untuk Greenhouse', 'Alat', 60, 4000000, '7.png'),
(136, 'Alat Pengukur Kualitas Air IoT', 'Alat', 55, 195000, '8.png'),
(137, 'Cangkul Besi Gagang Besi Full Coating', 'Alat', 53, 160000, '9.png'),
(138, 'Gunting Dahan Bunga', 'Alat', 47, 80000, '10.png'),
(139, 'Gergaji Dahan Lipat Portable', 'Alat', 80, 49000, '11.png'),
(140, 'Polybag Tanaman Ukuran 35cm x 35cm (Paket 30 pcs)', 'Alat', 77, 25000, '12.png'),
(141, 'Sprayer Kepala Semprotan Tanaman Tipe N28', 'Alat', 145, 8000, '13.png'),
(142, 'Pupuk Urea', 'Bahan', 200, 280000, '14.png'),
(143, 'Pupuk NPK', 'Bahan', 90, 25000, '15.png'),
(144, 'Pupuk Organik', 'Bahan', 146, 16900, '16.png'),
(145, 'Pestisida Nabati Organik 500mL Pekatan Pembasmi Se', 'Bahan', 345, 50000, '17.png'),
(146, 'Gramoxone 276 SL Herbisida Racun Basmi Rumput Gulm', 'Bahan', 234, 30000, '18.png'),
(147, 'Hormon Pengatur Tumbuh Tunas Akar 500 ML', 'Bahan', 567, 179000, '19.png'),
(148, 'BENIH PADI DARAT - PADI GOGO - NINUFARM - 100 BUTI', 'Bahan', 86, 20000, '20.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `nama_lengkap` varchar(25) NOT NULL,
  `jenis_kelamin` varchar(25) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` varchar(25) NOT NULL,
  `hp` varchar(25) NOT NULL,
  `status` enum('admin','user','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `nama_lengkap`, `jenis_kelamin`, `tanggal_lahir`, `alamat`, `hp`, `status`) VALUES
(501, 'taufiq', 'taufiq', 'taufiq nurrohman', 'Laki-Laki', '2004-08-06', 'sleman', '088232363332', 'user'),
(502, 'nurrohman', 'nurrohman', 'taufiq nurrohman', 'Laki-Laki', '2004-08-06', 'sleman', '088232363332', 'admin'),
(503, 'rahmad', 'rahmad', 'Rahmad Hidayatullah', 'Laki-Laki', '2001-12-13', 'sleman', '08895735803', 'user'),
(504, 'arfly', 'arfly', 'arkan rafly', 'Laki-Laki', '2024-12-02', 'Yogyakarta', '088232363332', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`);

--
-- Indexes for table `pemesanan_produk`
--
ALTER TABLE `pemesanan_produk`
  ADD PRIMARY KEY (`id_pemesanan_produk`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `pemesanan_produk`
--
ALTER TABLE `pemesanan_produk`
  MODIFY `id_pemesanan_produk` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_menu` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
