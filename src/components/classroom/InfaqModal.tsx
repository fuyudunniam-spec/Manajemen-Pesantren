'use client';

import { useState } from 'react';
import { Heart, BookOpen, Users, X, Loader2 } from 'lucide-react';

interface InfaqModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    minimumInfaq?: number;
    onSubmit: (amount: number) => Promise<void>;
}

const INFAQ_OPTIONS = [
    { amount: 50000, label: 'Rp 50.000', description: 'Paket Pemula' },
    { amount: 100000, label: 'Rp 100.000', description: 'Paket Muhsinin', recommended: true },
    { amount: 250000, label: 'Rp 250.000', description: 'Paket Dermawan' },
];

export function InfaqModal({
    isOpen,
    onClose,
    courseTitle,
    minimumInfaq = 50000,
    onSubmit
}: InfaqModalProps) {
    const [selectedAmount, setSelectedAmount] = useState<number>(minimumInfaq);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [useCustom, setUseCustom] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        const amount = useCustom ? parseInt(customAmount) : selectedAmount;

        if (!amount || amount < minimumInfaq) {
            alert(`Minimum infaq adalah Rp ${minimumInfaq.toLocaleString('id-ID')}`);
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit(amount);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')"
                    }} />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Heart className="w-8 h-8 text-emerald-950" fill="currentColor" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Gotong Royong Pendidikan Umat
                        </h2>

                        <p className="text-emerald-200 text-sm">
                            Infaq Anda membuka akses ilmu ini sekaligus mensubsidi pendidikan yatim & dhuafa
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Course Info */}
                    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Akses Kursus</p>
                            <p className="font-bold text-stone-900">{courseTitle}</p>
                        </div>
                    </div>

                    {/* Amount Options */}
                    <div className="space-y-3">
                        <p className="text-sm font-bold text-stone-600">Pilih Nominal Infaq:</p>

                        <div className="grid gap-3">
                            {INFAQ_OPTIONS.map((option) => (
                                <button
                                    key={option.amount}
                                    onClick={() => {
                                        setSelectedAmount(option.amount);
                                        setUseCustom(false);
                                    }}
                                    className={`
                                        p-4 rounded-xl border-2 text-left transition-all
                                        ${!useCustom && selectedAmount === option.amount
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-stone-200 hover:border-emerald-300'
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-stone-900">{option.label}</span>
                                            <span className="text-stone-500 text-sm ml-2">— {option.description}</span>
                                        </div>
                                        {option.recommended && (
                                            <span className="text-[9px] bg-yellow-500 text-emerald-950 px-2 py-1 rounded-full font-bold uppercase">
                                                Rekomendasi
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}

                            {/* Custom Amount */}
                            <div className={`
                                p-4 rounded-xl border-2 transition-all
                                ${useCustom ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'}
                            `}>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        checked={useCustom}
                                        onChange={() => setUseCustom(true)}
                                        className="text-emerald-600"
                                    />
                                    <span className="font-bold text-stone-900">Nominal Lain:</span>
                                </label>
                                {useCustom && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-stone-500">Rp</span>
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            placeholder={minimumInfaq.toString()}
                                            className="flex-1 p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Impact Info */}
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm">
                        <Users className="w-5 h-5 text-yellow-600 shrink-0" />
                        <p className="text-yellow-800">
                            <strong>5 orang yatim</strong> akan mendapat akses gratis dari setiap infaq Anda.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full py-4 bg-emerald-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <Heart className="w-5 h-5" />
                                Lanjutkan Infaq
                            </>
                        )}
                    </button>

                    <p className="text-[10px] text-stone-400 text-center">
                        Pembayaran aman melalui Midtrans • Akses langsung terbuka
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InfaqModal;
