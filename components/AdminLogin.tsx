
import React, { useState } from 'react';

interface AdminLoginProps {
    onLoginSuccess: () => void;
    onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLoginSuccess();
        } else {
            setError('Username atau Password salah');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold font-serif text-stone-800 mb-6 text-center">Admin Login</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            required 
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-bold"
                        >
                            Masuk
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                   <p className="text-xs text-stone-400">Default: admin / admin</p>
                </div>
            </div>
        </div>
    );
};
