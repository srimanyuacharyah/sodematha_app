import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-maroon-950 text-white py-12 border-t border-gold-500/20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-serif font-bold text-2xl mb-6 text-gold-400 uppercase tracking-widest">Sri Sode Sri Vadiraja Matha</h3>
                    <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto md:mx-0">
                        Preserving the legacy of Sri Vadiraja Teertharu. A spiritual sanctuary in the heart of Udupi, dedicated to the service of Lord Sri Krishna.
                    </p>
                    <div className="mt-6 text-sm opacity-90">
                        <p className="font-bold">Headquarters:</p>
                        <p>Car Street, Udupi, Karnataka, India - 576101</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-serif font-bold text-lg mb-6 text-gold-400">Navigation</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Home</Link></li>
                        <li><Link href="/history" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Guru Parampara</Link></li>
                        <li><Link href="/sevas" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Online Sevas</Link></li>
                        <li><Link href="/gallery" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Gallery</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-serif font-bold text-lg mb-6 text-gold-400">Support</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/privacy" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Terms & Conditions</Link></li>
                        <li><Link href="/contact" className="hover:text-gold-400 transition-colors uppercase tracking-wider">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
                © {new Date().getFullYear()} Sode Sri Vadiraja Matha. Managed with devotion.
            </div>
        </footer>
    );
}
