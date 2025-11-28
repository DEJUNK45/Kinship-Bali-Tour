
import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { getVehicles, addVehicle, deleteVehicle } from '../services/vehicleService';

interface AdminDashboardProps {
    onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form State
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState<'scooter' | 'car'>('scooter');
    const [newPrice, setNewPrice] = useState<number>(0);
    const [newPriceUnit, setNewPriceUnit] = useState('/ hari');
    const [newDesc, setNewDesc] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newPassengers, setNewPassengers] = useState(2);

    useEffect(() => {
        setVehicles(getVehicles());
    }, []);

    const refreshList = () => {
        setVehicles(getVehicles());
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kendaraan ini?')) {
            deleteVehicle(id);
            refreshList();
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newVehicle: Vehicle = {
            id: Date.now().toString(),
            name: newName,
            type: newType,
            price: newPrice,
            priceUnit: newPriceUnit,
            description: newDesc,
            imageUrl: newImage || 'https://via.placeholder.com/500x300?text=No+Image',
            passengers: newPassengers,
            features: ['Standar Safety'] // Simplified for this demo
        };
        addVehicle(newVehicle);
        refreshList();
        setShowAddForm(false);
        // Reset form
        setNewName('');
        setNewPrice(0);
        setNewDesc('');
        setNewImage('');
    };

    return (
        <div className="min-h-screen bg-stone-100 pb-12">
            {/* Admin Header */}
            <div className="bg-stone-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold font-serif">Kinship Admin Dashboard</h1>
                    <button onClick={onExit} className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
                        Keluar
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-stone-800">Manajemen Armada Kendaraan</h2>
                    <button 
                        onClick={() => setShowAddForm(true)} 
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Tambah Kendaraan
                    </button>
                </div>

                {/* Add Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl my-8">
                            <h3 className="text-xl font-bold mb-4">Tambah Kendaraan Baru</h3>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Nama Kendaraan</label>
                                        <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full p-2 border rounded" placeholder="Misal: Honda Vario" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Tipe</label>
                                        <select value={newType} onChange={e => setNewType(e.target.value as any)} className="w-full p-2 border rounded">
                                            <option value="scooter">Motor (Scooter)</option>
                                            <option value="car">Mobil + Supir</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Harga</label>
                                        <input type="number" required value={newPrice} onChange={e => setNewPrice(parseInt(e.target.value))} className="w-full p-2 border rounded" placeholder="100000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Unit Harga</label>
                                        <input type="text" required value={newPriceUnit} onChange={e => setNewPriceUnit(e.target.value)} className="w-full p-2 border rounded" placeholder="/ hari" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">URL Gambar</label>
                                    <input type="url" required value={newImage} onChange={e => setNewImage(e.target.value)} className="w-full p-2 border rounded" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Deskripsi</label>
                                    <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-2 border rounded" rows={3} placeholder="Deskripsi singkat..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Jumlah Penumpang</label>
                                    <input type="number" required value={newPassengers} onChange={e => setNewPassengers(parseInt(e.target.value))} className="w-full p-2 border rounded" min="1" max="10" />
                                </div>

                                <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                                    <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded">Batal</button>
                                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-bold">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} className="bg-white rounded-lg shadow border border-stone-200 overflow-hidden">
                            <div className="h-48 bg-stone-200 relative">
                                <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold uppercase">
                                    {vehicle.type}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-stone-800">{vehicle.name}</h3>
                                <p className="text-teal-600 font-bold mt-1">
                                    IDR {vehicle.price.toLocaleString('id-ID')} <span className="text-xs text-stone-400 font-normal">{vehicle.priceUnit}</span>
                                </p>
                                <p className="text-stone-500 text-sm mt-2 line-clamp-2">{vehicle.description}</p>
                                
                                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                                    <span className="text-xs text-stone-400">ID: {vehicle.id}</span>
                                    <button 
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
