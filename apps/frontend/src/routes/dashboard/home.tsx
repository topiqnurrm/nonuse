import { Loader2, Car, Battery, Gauge, MapPin, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate dan Route, Routes

import { useVehicleStore } from "@/store/useVehicleStore";
// import DashboardDetails from "./routes/dashboard/details"; // Pastikan Anda memiliki komponen ini
// import DashboardLayout from "./routes/dashboard/components/layout"; // Pastikan Anda memiliki komponen ini
// import Home from "./routes/home"; // Pastikan Anda memiliki komponen ini

// Anggap Anda memiliki definisi ini di tempat lain, atau bisa tambahkan di sini jika hanya di App.tsx
// interface Vehicle {
//   id: string;
//   name: string;
//   status: string;
//   fuel_level: number;
//   odometer: number;
//   latitude: number;
//   longitude: number;
//   speed: number;
//   gambar: string; // Pastikan ini ada
// }

// --- Komponen StatsCard (dari DashboardHome) ---
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}

const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => (
  <div className="bg-white rounded-lg border p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

// --- Komponen VehicleCard ---
interface VehicleCardProps {
  vehicle: any; // Ganti 'any' dengan tipe Vehicle Anda jika sudah didefinisikan
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate(); // Inisialisasi hook useNavigate

  const getImagePath = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    return `/${imagePath}`;
  };

  const getStatusColor = (status: string) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      case 'MAINTENANCE':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'ACTIVE':
        return 'Aktif';
      case 'INACTIVE':
        return 'Tidak Aktif';
      case 'MAINTENANCE':
        return 'Maintenance';
      default:
        return status;
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
    setImageLoaded(false);
    console.warn(`Failed to load image: ${vehicle.gambar}`);
    console.log("Path yang dicoba:", imagePath);
  };

  const handleCardClick = () => {
    navigate(`/dashboard/${vehicle.id}`); 
  };

  const imagePath = getImagePath(vehicle.gambar);

  return (
    <div
      className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {imagePath && !imageError ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            )}
            
            <img
              src={imagePath}
              alt={vehicle.name || 'Vehicle Image'}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <Car className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
            {getStatusText(vehicle.status)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{vehicle.name}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Bahan Bakar</span>
            </div>
            <span className="text-sm font-medium">{vehicle.fuel_level || 0}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                (vehicle.fuel_level || 0) > 50 ? 'bg-green-500' : 
                (vehicle.fuel_level || 0) > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${vehicle.fuel_level || 0}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">Odometer</span>
            </div>
            <span className="text-sm font-medium">{vehicle.odometer?.toLocaleString() || 0} km</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-600">Kecepatan</span>
            </div>
            <span className="text-sm font-medium">{vehicle.speed || 0} km/h</span>
          </div>

          {vehicle.latitude && vehicle.longitude && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-sm text-gray-600">Lokasi</span>
              </div>
              <span className="text-xs text-gray-500">
                {vehicle.latitude.toFixed(4)}, {vehicle.longitude.toFixed(4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Komponen DashboardHome ---
function DashboardHome() {
  const { vehicles, loading, findAllVehicles, error, clearError } =
    useVehicleStore();

  useEffect(() => {
    findAllVehicles();
    if (error !== null) {
      toast.error(error);
      clearError();
    }
  }, [findAllVehicles, error, clearError]);

  const totalVehicles = vehicles?.length || 0;
  const activeVehicles = vehicles?.filter(v => v.status?.toUpperCase() === 'ACTIVE')?.length || 0;
  const inactiveVehicles = vehicles?.filter(v => v.status?.toUpperCase() === 'INACTIVE')?.length || 0;
  const maintenanceVehicles = vehicles?.filter(v => v.status?.toUpperCase() === 'MAINTENANCE')?.length || 0;
  
  const activeFuelLevels = vehicles?.filter(v => v.status?.toUpperCase() === 'ACTIVE').map(v => v.fuel_level) || [];
  const averageFuelLevel = activeFuelLevels.length > 0 
    ? Math.round(activeFuelLevels.reduce((sum, level) => sum + level, 0) / activeFuelLevels.length)
    : 0;

  return (
    <section className="flex w-full flex-col">
      {loading ? (
        <div className="flex h-[80svh] w-full items-center justify-center rounded-lg border bg-muted mx-4">
          <Loader2 className="size-12 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 pt-15">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <StatsCard
                title="Total Kendaraan"
                value={totalVehicles}
                icon={Car}
                color="bg-blue-500"
              />
              <StatsCard
                title="Aktif"
                value={activeVehicles}
                icon={Zap}
                color="bg-green-500"
              />
              <StatsCard
                title="Tidak Aktif"
                value={inactiveVehicles}
                icon={Car}
                color="bg-red-500"
              />
              <StatsCard
                title="Maintenance"
                value={maintenanceVehicles}
                icon={Car}
                color="bg-yellow-500"
              />
              <StatsCard
                title="Efisiensi"
                value={`${averageFuelLevel}%`}
                icon={Battery}
                color="bg-purple-500"
              />
            </div>
          </div>

          <div className="p-4 pt-6">
            {vehicles && vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="flex h-[40vh] w-full items-center justify-center rounded-lg border bg-gray-50">
                <div className="text-center">
                  <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Tidak ada kendaraan ditemukan</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

// --- Komponen App.tsx (dari yang Anda berikan sebelumnya) ---
// Jika ini adalah file App.tsx utama Anda, pastikan Anda telah mengimpor
// DashboardLayout, DashboardDetails, dan Home dari lokasi yang benar.
// Contoh:
// import DashboardLayout from "./routes/dashboard/components/layout";
// import DashboardDetails from "./routes/dashboard/details";
// import Home from "./routes/home";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="dashboard">
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path=":vehicleId" element={<DashboardDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;