import React, { useState } from 'react';

const ZakatCalculator = () => {
    const [values, setValues] = useState({
        gold: '',
        silver: '',
        savings: '',
        investments: ''
    });

    const [zakatCheck, setZakatCheck] = useState<number | null>(null);

    const priceGold = 1200000; // Est. Price per gram IDR
    const nisabGold = 85; // grams

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const calculateZakat = (e: React.FormEvent) => {
        e.preventDefault();

        const totalAssets =
            (Number(values.gold) * priceGold) + // Assuming input is grams? Or let's assume input is IDR value for simplicity or provide clarity
            Number(values.savings) +
            Number(values.investments); // Simplified logic

        // Actually, usually users enter asset value in IDR directly except for Gold grams
        // Let's assume users enter IDR Values directly for simplicity in this MVP

        const totalIDR = Number(values.savings) + Number(values.investments) + (Number(values.gold) * priceGold);
        const nisabIDR = nisabGold * priceGold;

        if (totalIDR >= nisabIDR) {
            setZakatCheck(totalIDR * 0.025);
        } else {
            setZakatCheck(0);
        }
    };

    const formatIDR = (num: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);
    };

    return (
        <section className="py-20 px-6 bg-white border-y border-gray-100" id="zakat-calculator">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-4">Hitung Zakat Maal Anda</h2>
                    <p className="text-gray-600">Bersihkan harta, sucikan jiwa. Hitung kewajiban zakat Anda dengan mudah.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 flex-1 space-y-6">
                        <form onSubmit={calculateZakat} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tabungan & Deposito (Rp)</label>
                                <input
                                    type="number"
                                    name="savings"
                                    value={values.savings}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emas & Perak (Gram)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="gold"
                                        value={values.gold}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none pl-4 pr-16"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">gram</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">*Asumsi harga emas Rp {priceGold.toLocaleString('id-ID')}/gram</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Investasi & Surat Berharga (Rp)</label>
                                <input
                                    type="number"
                                    name="investments"
                                    value={values.investments}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-secondary/30 mt-4"
                            >
                                Hitung Zakat
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-900 p-8 md:p-12 flex-1 flex flex-col justify-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-serif font-medium text-secondary mb-2">Total Zakat Wajib Keluarkan</h3>
                            {zakatCheck !== null ? (
                                zakatCheck > 0 ? (
                                    <div className="animate-fade-in-up">
                                        <div className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{formatIDR(zakatCheck)}</div>
                                        <p className="text-white/70 mb-8 border-l-2 border-secondary pl-4">
                                            Alhamdulillah, harta Anda telah mencapai nishab. Segerakan tunaikan zakat untuk keberkahan harta.
                                        </p>
                                        <a href="#donate" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                            Bayar Zakat Sekarang
                                        </a>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in-up">
                                        <div className="text-3xl font-bold mb-2">Belum Wajib Zakat</div>
                                        <p className="text-white/70">
                                            Total harta Anda belum mencapai nishab (85 gram emas). Namun, Anda sangat dianjurkan untuk berinfaq.
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="text-white/30 text-lg">
                                    Isi data di samping untuk melihat perhitungan zakat Anda.
                                </div>
                            )}
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZakatCalculator;
