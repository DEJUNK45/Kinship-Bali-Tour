
import React, { useState, useMemo } from 'react';
import { ItineraryPreferences, Vehicle, BookingDetails } from '../types';
import { calculatePrice, PriceDetails } from '../services/pricingService';
import { PaymentGateway } from './PaymentGateway';

interface BookingFormProps {
    preferences: ItineraryPreferences;
    vehicle: Vehicle | null;
    onConfirm: (details: BookingDetails) => void;
    onCancel: () => void;
}

const PriceVisualization: React.FC<{ details: PriceDetails }> = ({ details }) => {
    const total = details.total;
    if (total === 0) return null;

    const subtotalPercent = (details.subtotal / total) * 100;
    const vehiclePercent = (details.vehicleCost / total) * 100;
    const feePercent = (details.serviceFee / total) * 100;

    return (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-stone-200">
            <div className="flex h-4 w-full rounded-full overflow-hidden bg-stone-100 mb-3">
                <div 
                    style={{ width: `${subtotalPercent}%` }} 
                    className="h-full bg-teal-500 relative group transition-all duration-500"
                />
                 {details.vehicleCost > 0 && (
                    <div 
                        style={{ width: `${vehiclePercent}%` }} 
                        className="h-full bg-blue-500 relative group transition-all duration-500"
                    />
                )}
                <div 
                    style={{ width: `${feePercent}%` }} 
                    className="h-full bg-orange-400 relative group transition-all duration-500"
                />
            </div>
            <div className="flex flex-wrap justify-between text-xs font-medium text-stone-500 gap-2">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                    <span>Paket ({subtotalPercent.toFixed(1)}%)</span>
                </div>
                {details.vehicleCost > 0 && (
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span>Transport ({vehiclePercent.toFixed(1)}%)</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    <span>Biaya Layanan ({feePercent.toFixed(1)}%)</span>
                </div>
            </div>
        </div>
    );
};

export const BookingForm: React.FC<BookingFormProps> = ({ preferences, vehicle, onConfirm, onCancel }) => {
    const [step, setStep] = useState<'details' | 'payment'>('details');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [travelDate, setTravelDate] = useState(preferences.startDate);
    const [requests, setRequests] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const priceDetails: PriceDetails = useMemo(() => calculatePrice(preferences, vehicle || undefined), [preferences, vehicle]);

    const handleProceedToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !travelDate) {
            setError('Nama Lengkap, Email, dan Tanggal Perjalanan wajib diisi.');
            return;
        }
        setError(null);
        setStep('payment');
    };

    const handlePaymentSuccess = () => {
        setIsSubmitting(true);
        // Simulate final API call after payment
        setTimeout(() => {
            setIsSubmitting(false);
            const bookingDetails: BookingDetails = {
                fullName,
                email,
                phone,
                travelDate,
                travelers: preferences.travelers,
                totalPrice: priceDetails.total
            };
            onConfirm(bookingDetails);
        }, 1500);
    }

    const renderDetailsStep = () => (
        <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-stone-700">Nama Lengkap</label>
                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
             <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Nomor Telepon (Opsional)</label>
                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-stone-700">Jumlah Pelancong</label>
                    <input type="number" id="travelers" value={preferences.travelers} readOnly className="mt-1 w-full p-3 border border-stone-300 rounded-lg bg-stone-100 cursor-not-allowed" />
                </div>
                <div>
                    <label htmlFor="travelDate" className="block text-sm font-medium text-stone-700">Tanggal Perjalanan</label>
                    <input type="date" id="travelDate" value={travelDate} onChange={e => setTravelDate(e.target.value)} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
            </div>
            
            {/* Vehicle Summary */}
             <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-800 mb-2">Pilihan Transportasi</h4>
                {vehicle ? (
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded border border-stone-200 overflow-hidden">
                            <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <p className="font-medium text-stone-800">{vehicle.name}</p>
                            <p className="text-xs text-stone-500">{vehicle.price.toLocaleString('id-ID', {style:'currency', currency:'IDR'})} x {preferences.duration} hari</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-stone-500 italic">Tidak ada kendaraan yang dipilih.</p>
                )}
            </div>

            <div>
                <label htmlFor="requests" className="block text-sm font-medium text-stone-700">Permintaan Khusus (Opsional)</label>
                <textarea id="requests" value={requests} onChange={e => setRequests(e.target.value)} rows={3} className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="flex gap-4 pt-4">
                 <button type="button" onClick={onCancel} className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3 px-6 rounded-lg transition-colors">
                    Kembali
                </button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Lanjutkan ke Pembayaran
                </button>
            </div>
        </form>
    );

    const renderPaymentStep = () => (
        <div>
            <div className="mb-6 bg-stone-50 p-6 rounded-xl border border-stone-200">
                <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 3.666V14m-7 3.666V10m7 7.333v-2.5a2.5 2.5 0 00-5 0v2.5m5-2.5a2.5 2.5 0 00-5 0v-2.5" /></svg>
                    Rincian Biaya
                </h3>
                
                <PriceVisualization details={priceDetails} />

                <div className="space-y-3 text-stone-600 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-500">Paket Perjalanan ({preferences.duration} hari x {preferences.travelers} pax)</span>
                        <span className="font-semibold text-stone-700">{priceDetails.subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    </div>
                     {vehicle && (
                        <div className="flex justify-between items-center">
                            <span className="text-stone-500">Sewa {vehicle.name} ({preferences.duration} hari)</span>
                            <span className="font-semibold text-stone-700">{priceDetails.vehicleCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-stone-500">Biaya Layanan (5%)</span>
                         <span className="font-semibold text-stone-700">{priceDetails.serviceFee.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    </div>
                    <div className="border-t border-stone-300 my-3 pt-3 flex justify-between items-center">
                        <span className="font-bold text-lg text-stone-800">Total Pembayaran</span>
                        <span className="font-bold text-xl text-teal-700">{priceDetails.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    </div>
                </div>
            </div>

            <PaymentGateway 
                totalPrice={priceDetails.total} 
                onPaymentSuccess={handlePaymentSuccess} 
                isProcessing={isSubmitting}
            />

            <div className="mt-6">
                <button onClick={() => setStep('details')} className="flex items-center justify-center w-full text-stone-500 hover:text-stone-800 font-medium transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Kembali ke Detail Pemesanan
                </button>
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full transform transition-all animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold font-serif text-stone-800 text-center">
                    {step === 'details' ? 'Konfirmasi Pemesanan' : 'Selesaikan Pembayaran'}
                </h2>
                <p className="text-center text-stone-600 mt-2 mb-6">
                    {step === 'details' ? 'Langkah terakhir sebelum petualangan dimulai!' : 'Aman & Terjamin. Semua harga dalam IDR.'}
                </p>
                
                {step === 'details' ? renderDetailsStep() : renderPaymentStep()}
            </div>
        </div>
    );
};
