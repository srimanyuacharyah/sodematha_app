"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { RenovationDashboard } from "@/components/renovation-dashboard";
import { EducationSection } from "@/components/education-section";
import { NewsletterForm } from "@/components/newsletter-form";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-white luminance-guard">
      <Header />

      <main className="flex-1 pb-16 bg-wallpaper">
        {/* Premium Hero Section - Dark & Gold */}
        <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-maroon-900 via-background to-background opacity-90"></div>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-gold-500)_1px,_transparent_1px)] bg-[size:50px_50px] opacity-10"></div>

          <div className="relative z-10 text-center px-4 max-w-5xl animate-slide-up space-y-12">
            <div className="space-y-4">
              <span className="text-gold-500 font-black uppercase tracking-[0.5em] text-xs md:text-sm drop-shadow-lg">Ashta Matha Tradition</span>
              <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.9]">
                {t.hero.welcome}
              </h1>
              <div className="h-1 w-32 bg-gold-500 mx-auto rounded-full shadow-[0_0_20px_rgba(212,175,55,1)]"></div>
            </div>

            <p className="text-2xl md:text-4xl text-gold-400 font-serif italic max-w-3xl mx-auto drop-shadow-md">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black px-12 py-10 rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.3)] text-xl transition-all hover:scale-110 active:scale-95">
                <Link href="/sevas" className="flex items-center gap-3">
                  {t.buttons.bookSeva} <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-12 py-10 rounded-full backdrop-blur-md text-xl transition-all hover:border-white shadow-2xl">
                <Link href="/history">{t.buttons.viewAll}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Renovation Dashboard (NEW) */}
        <RenovationDashboard />

        {/* Education Institutions (NEW) */}
        <EducationSection />

        {/* About Sode Matha Section (ENHANCED) */}
        <section className="container mx-auto px-4 py-32 bg-maroon-950/20 relative">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gold-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Swamiji Image Placeholder with high-quality styling */}
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-gold-500/20 font-serif text-8xl italic select-none">Sode</div>
                <div className="absolute bottom-10 left-10 z-20">
                  <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">Sri Vishwavallabha Teertha</h3>
                  <p className="text-gold-500 font-black uppercase tracking-[0.2em] text-xs mt-2">36th Pontiff of Sri Sode Vadiraja Matha</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-gold-500 font-bold uppercase tracking-[0.4em] text-sm">Divine Heritage</span>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-white uppercase leading-tight">700 Years of Spiritual Legacy</h2>
                <div className="h-1 w-24 bg-gold-500"></div>
              </div>

              <p className="text-xl text-white/80 leading-relaxed font-sans italic border-l-4 border-gold-500 pl-8">
                "Sri Sode Vadiraja Matha, established by Sri Madhvacharya and significantly developed by the great saint Sri Vadiraja Teertha, stands as a beacon of the Madhwa tradition."
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-3 underline decoration-gold-500/20 underline-offset-8">Sacred Sites</h4>
                  <ul className="space-y-2 text-sm text-white/60 font-medium">
                    <li>• Rama Thrivikrama Temple</li>
                    <li>• Hayagriva Samudra</li>
                    <li>• Pancha Vrindavans</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-3 underline decoration-gold-500/20 underline-offset-8">Traditions</h4>
                  <ul className="space-y-2 text-sm text-white/60 font-medium">
                    <li>• Madhwa Philosophy</li>
                    <li>• Chandramana Panchanga</li>
                    <li>• Gurukula Education</li>
                  </ul>
                </div>
              </div>

              <Button asChild variant="outline" className="border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-maroon-950 transition-all rounded-full px-10 py-6 font-bold uppercase tracking-widest text-xs">
                <Link href="/history">Explore Full History</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest News & Events Section - Dark High Contrast */}
        <section className="container mx-auto px-4 py-32">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-widest">
              {t.headings.news}
              <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
            </h2>
            <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm pt-8">Celestial Tidings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Vadiraja Vaibhavotsava Hackathon 2026", date: "Jan 29, 2026", desc: "Digital innovation meets divine tradition. Final round starting soon at Udupi." },
              { title: "Sode Utsava 2025 Brahmarathotsava", date: "March 12, 2025", desc: "Experience the majesty of the Chariot Festival in Sode Kshetra. All are welcome." },
              { title: "Temple Renovation - Phase 2", date: "Ongoing", desc: "Be a part of preserving our 700-year-old architectural heritage through Seva." }
            ].map((news, i) => (
              <Card key={i} className="glass-card hover:bg-white/10 transition-premium border-gold-500/10 group cursor-pointer shadow-2xl overflow-hidden">
                <CardContent className="p-12 space-y-6">
                  <span className="text-xs font-black text-gold-500 uppercase tracking-[0.2em]">{news.date}</span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gold-400 transition-colors font-serif leading-tight">{news.title}</h3>
                  <p className="text-white/70 text-base leading-relaxed font-sans">{news.desc}</p>
                  <div className="pt-4 flex items-center text-gold-500 font-black text-xs uppercase tracking-[0.3em] group/btn">
                    {t.buttons.readMore} <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-3 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription (NEW) */}
        <section className="container mx-auto px-4 py-24">
          <NewsletterForm />
        </section>

        {/* Timings Section - Sode Matha Pattern */}
        <section className="py-32 bg-maroon-950/40 relative border-y border-gold-500/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-widest">{t.headings.timings}</h2>
              <div className="h-1 w-24 bg-gold-500 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Sode Location */}
              <Card className="glass-card overflow-hidden border-gold-500/30 shadow-2xl relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
                <CardHeader className="bg-gold-500/5 border-b border-gold-500/10 py-10 text-center">
                  <CardTitle className="text-3xl text-gold-400 font-serif tracking-widest uppercase">Sode Sri Vadiraja Matha</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <span className="font-bold text-white flex items-center gap-6 text-2xl"><Clock className="h-7 w-7 text-gold-500" /> Morning Darshan</span>
                      <span className="text-2xl font-medium text-gold-100">5:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <span className="font-bold text-white flex items-center gap-6 text-2xl"><Clock className="h-7 w-7 text-gold-500" /> Evening Darshan</span>
                      <span className="text-2xl font-medium text-gold-100">4:00 PM - 8:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between bg-gold-500/10 p-8 rounded-2xl border border-gold-500/20 shadow-inner">
                      <span className="font-black text-gold-500 uppercase tracking-widest text-sm">Maha Prasada</span>
                      <span className="font-bold text-white text-xl">12:30 PM - 2:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Udupi Location */}
              <Card className="glass-card overflow-hidden border-gold-500/30 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-1 h-full bg-gold-500"></div>
                <CardHeader className="bg-gold-500/5 border-b border-gold-500/10 py-10 text-center">
                  <CardTitle className="text-3xl text-gold-400 font-serif tracking-widest uppercase">Udupi Sri Krishna Matha</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                  <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <span className="font-bold text-white flex items-center gap-6 text-2xl"><Clock className="h-7 w-7 text-gold-500" /> Morning Darshan</span>
                      <span className="text-2xl font-medium text-gold-100">4:30 AM - 1:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <span className="font-bold text-white flex items-center gap-6 text-2xl"><Clock className="h-7 w-7 text-gold-500" /> Evening Darshan</span>
                      <span className="text-2xl font-medium text-gold-100">4:00 PM - 9:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between bg-gold-500/10 p-8 rounded-2xl border border-gold-500/20 shadow-inner">
                      <span className="font-black text-gold-500 uppercase tracking-widest text-sm">Maha Prasada</span>
                      <span className="font-bold text-white text-xl">11:30 AM - 2:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
