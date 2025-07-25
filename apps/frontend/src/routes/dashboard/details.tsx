import {
  ArrowLeft,
  CircleGauge,
  Fuel,
  MapPin,
  Power,
  PowerOff,
  Route,
  Wrench,
  Car,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useVehicleStore } from "@/store/useVehicleStore";

import MapsViewer from "./components/maps";

// Komponen untuk menampilkan status badge
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'ACTIVE':
        return {
          icon: Power,
          text: 'Aktif',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'INACTIVE':
        return {
          icon: PowerOff,
          text: 'Tidak Aktif',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-500'
        };
      case 'MAINTENANCE':
        return {
          icon: Wrench,
          text: 'Maintenance',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      default:
        return {
          icon: Power,
          text: status,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-500'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
      <Icon className={`size-4 ${config.iconColor}`} />
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};

// Komponen untuk menampilkan info item
const InfoItem = ({ icon: Icon, label, value, valueColor }: {
  icon: any;
  label: string;
  value: string | number;
  valueColor?: string;
}) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
      <Icon className="size-5 text-gray-600" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className={cn("text-lg font-semibold text-gray-900", valueColor)}>
        {value}
      </p>
    </div>
  </div>
);

export default function DashboardDetails() {
  const { vehicleId } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { currentVehicle, findVehicleById, error, clearError } =
    useVehicleStore();

  useEffect(() => {
    if (vehicleId) {
      findVehicleById(vehicleId);
    }

    if (error !== null) {
      toast.error(error);
      clearError();
    }
  }, [findVehicleById, vehicleId, error, clearError]);

  // Fungsi untuk memformat path gambar
  const getImagePath = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    return `/${imagePath}`;
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
  };

  const handleBackClick = () => {
    window.location.href = '/dashboard';
  };

  const getFuelLevelColor = (fuelLevel: number) => {
    if (fuelLevel >= 66) return "text-green-600";
    if (fuelLevel >= 33) return "text-yellow-600";
    return "text-red-600";
  };

  const imagePath = getImagePath((currentVehicle as any)?.gambar);

  return (
    <section className="min-h-screen bg-gray-50 pt-16">
      {/* Header dengan tombol kembali */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 p-4 py-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
          >
            <ArrowLeft className="size-5" />
            <span className="font-medium">Kembali</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Detail Kendaraan</h1>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {!currentVehicle ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Loader2 className="size-12 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel Kiri - Informasi Kendaraan */}
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentVehicle.name}
                    </h2>
                    <StatusBadge status={currentVehicle.status} />
                  </div>
                </div>
              </div>

              {/* Gambar Kendaraan */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Foto Kendaraan
                </h3>
                <div className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
                  {imagePath && !imageError ? (
                    <>
                      {isLoading && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
                        </div>
                      )}
                      <img
                        src={imagePath}
                        alt={currentVehicle.name || 'Vehicle Image'}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <Car className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Gambar tidak tersedia</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Informasi Detail */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informasi Kendaraan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoItem
                    icon={Fuel}
                    label="Tingkat Bahan Bakar"
                    value={`${currentVehicle.fuel_level || 0}%`}
                    valueColor={getFuelLevelColor(currentVehicle.fuel_level || 0)}
                  />
                  <InfoItem
                    icon={CircleGauge}
                    label="Kecepatan"
                    value={`${currentVehicle.speed || 0} km/h`}
                  />
                  <InfoItem
                    icon={Route}
                    label="Odometer"
                    value={`${currentVehicle.odometer?.toLocaleString() || 0} km`}
                  />
                  <div className="sm:col-span-2">
                    <InfoItem
                      icon={MapPin}
                      label="Koordinat"
                      value={`${currentVehicle.latitude?.toFixed(6) || 0}, ${currentVehicle.longitude?.toFixed(6) || 0}`}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Bar Bahan Bakar */}
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status Bahan Bakar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Level Bahan Bakar
                    </span>
                    <span className={cn("text-sm font-bold", getFuelLevelColor(currentVehicle.fuel_level || 0))}>
                      {currentVehicle.fuel_level || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        (currentVehicle.fuel_level || 0) >= 66 ? 'bg-green-500' :
                        (currentVehicle.fuel_level || 0) >= 33 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${currentVehicle.fuel_level || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Kanan - Peta */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lokasi Kendaraan
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Posisi real-time kendaraan pada peta
                  </p>
                </div>
                <div className="p-6">
                  {currentVehicle && <MapsViewer vehicle={currentVehicle} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}