import React, { useState } from 'react';

interface PaymentGatewayProps {
    totalPrice: number;
    onPaymentSuccess: () => void;
    isProcessing: boolean;
}

type PaymentMethod = 'Credit Card' | 'QRIS' | 'PayPal' | 'E-Wallet';

const PaymentMethodTab: React.FC<{ name: string, active: boolean, onClick: () => void }> = ({ name, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors duration-200 focus:outline-none ${
            active 
            ? 'border-teal-500 text-teal-600' 
            : 'border-transparent text-stone-500 hover:text-stone-700'
        }`}
    >
        {name}
    </button>
);

const CreditCardForm: React.FC<{ onPay: () => void, isProcessing: boolean }> = ({ onPay, isProcessing }) => {
    const [card, setCard] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [error, setError] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!card || !name || !expiry || !cvc) {
            setError('Semua bidang kartu kredit wajib diisi.');
            return;
        }
        if (card.replace(/\s/g, '').length !== 16) {
             setError('Nomor kartu tidak valid.');
             return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            setError('Format tanggal kedaluwarsa tidak valid (MM/YY).');
            return;
        }
        if (cvc.length !== 3) {
            setError('CVC tidak valid.');
            return;
        }
        setError('');
        onPay();
    };
    
    const formatCardNumber = (value: string) => value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    const formatExpiry = (value: string) => value.replace(/[^0-9]/g, '').replace(/^([2-9])$/, '0$1').replace(/^(1{1})([3-9]{1})$/, '0$1/$2').replace(/^0{1,}/g, '0').replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/, '$1/$2');

    return (
        <form onSubmit={handlePayment} className="space-y-4 pt-4">
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-stone-700">Nomor Kartu</label>
                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" value={formatCardNumber(card)} onChange={e => setCard(e.target.value)} maxLength={19} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-stone-700">Nama pada Kartu</label>
                <input type="text" id="cardName" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-stone-700">Kedaluwarsa</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" value={formatExpiry(expiry)} onChange={e => setExpiry(e.target.value)} maxLength={5} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-stone-700">CVC</label>
                    <input type="text" id="cvc" placeholder="123" value={cvc} onChange={e => setCvc(e.target.value.replace(/[^0-9]/g, ''))} maxLength={3} required className="mt-1 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="pt-2">
                 <button type="submit" disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
                    {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Bayar Sekarang'}
                </button>
            </div>
        </form>
    );
};

const QrisPayment: React.FC<{ totalPrice: number, onPay: () => void, isProcessing: boolean }> = ({ totalPrice, onPay, isProcessing }) => {
    const qrData = `KINSHIPBALI-BOOKING-${totalPrice}-${Date.now()}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    
    return (
        <div className="text-center pt-4 flex flex-col items-center">
            <img src={qrUrl} alt="QRIS Code" className="w-48 h-48 rounded-lg border p-2" />
            <p className="mt-4 text-sm text-stone-600">Pindai kode QR di atas dengan aplikasi perbankan atau e-wallet Anda untuk membayar.</p>
             <div className="pt-4 w-full">
                 <button onClick={onPay} disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
                    {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Saya Sudah Membayar'}
                </button>
            </div>
        </div>
    );
};

const PayPalPayment: React.FC<{ onPay: () => void, isProcessing: boolean }> = ({ onPay, isProcessing }) => (
    <div className="pt-4">
        <p className="text-center text-sm text-stone-600 mb-4">Anda akan diarahkan ke PayPal untuk menyelesaikan pembayaran Anda dengan aman.</p>
        <button onClick={onPay} disabled={isProcessing} className="w-full bg-[#00457C] hover:bg-[#003057] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
            {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Lanjutkan dengan PayPal'}
        </button>
    </div>
);

const EWalletPayment: React.FC<{ onPay: () => void, isProcessing: boolean }> = ({ onPay, isProcessing }) => (
    <div className="pt-4 space-y-4">
        <p className="text-center text-sm text-stone-600">Pilih e-wallet pilihan Anda untuk melanjutkan.</p>
        <button onClick={onPay} disabled={isProcessing} className="w-full bg-[#00AEEF] hover:bg-[#0095c7] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
            {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Bayar dengan GoPay'}
        </button>
        <button onClick={onPay} disabled={isProcessing} className="w-full bg-[#481470] hover:bg-[#381058] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
            {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Bayar dengan OVO'}
        </button>
        <button onClick={onPay} disabled={isProcessing} className="w-full bg-[#108EE9] hover:bg-[#0e7cc3] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
            {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Bayar dengan Dana'}
        </button>
        <button onClick={onPay} disabled={isProcessing} className="w-full bg-[#EF1B24] hover:bg-[#d51820] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-stone-400 flex items-center justify-center text-lg">
            {isProcessing ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...</>) : 'Bayar dengan LinkAja'}
        </button>
    </div>
);

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({ totalPrice, onPaymentSuccess, isProcessing }) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit Card');
    
    const paymentMethods: PaymentMethod[] = ['Credit Card', 'QRIS', 'PayPal', 'E-Wallet'];
    
    const renderContent = () => {
        switch(paymentMethod) {
            case 'Credit Card':
                return <CreditCardForm onPay={onPaymentSuccess} isProcessing={isProcessing} />;
            case 'QRIS':
                return <QrisPayment totalPrice={totalPrice} onPay={onPaymentSuccess} isProcessing={isProcessing} />;
            case 'PayPal':
                return <PayPalPayment onPay={onPaymentSuccess} isProcessing={isProcessing} />;
            case 'E-Wallet':
                return <EWalletPayment onPay={onPaymentSuccess} isProcessing={isProcessing} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <div className="border-b border-stone-200">
                <div className="-mb-px flex space-x-2" aria-label="Tabs">
                    {paymentMethods.map(method => (
                        <PaymentMethodTab 
                            key={method} 
                            name={method}
                            active={paymentMethod === method}
                            onClick={() => setPaymentMethod(method)}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    )
}