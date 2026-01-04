import React from 'react';
import { Terminal, Cpu, Share2, Shield, Zap, ChevronRight, Github } from 'lucide-react';
import { APP_VERSION } from '../constants';

interface LandingPageProps {
    onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
    return (
        <div className="min-h-screen bg-cyber-black text-cyber-gold font-tech selection:bg-cyber-gold selection:text-cyber-black overflow-y-auto custom-scrollbar">

            {/* Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#ffdb89 1px, transparent 1px), linear-gradient(90deg, #ffdb89 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-cyber-gold/20 bg-cyber-black/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cpu className="text-cyber-gold animate-pulse-fast" />
                        <span className="text-xl font-bold tracking-[0.2em]">CYBERTREE</span>
                        <span className="text-xs border border-cyber-gold/30 px-1 rounded text-cyber-gold/60">{APP_VERSION}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/me-yeatz/Cybertree-Folder-Generator" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                            <Github size={16} /> <span className="hidden sm:inline">SOURCE_CODE</span>
                        </a>
                        <button onClick={onLaunch} className="bg-cyber-gold text-cyber-black px-4 py-1.5 text-sm font-bold tracking-widest hover:bg-white transition-colors transform hover:-translate-y-0.5">
                            LAUNCH_APP
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">

                {/* Hero Section */}
                <section className="py-20 md:py-32 flex flex-col items-center text-center space-y-8">
                    <div className="inline-block border border-cyber-gold/30 px-3 py-1 text-xs tracking-[0.3em] text-cyber-gold/70 mb-4 bg-cyber-gold/5">
                        SYSTEM_STATUS: ONLINE
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                        NEURAL-POWERED <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-gold via-yellow-200 to-cyber-gold animate-gradient">
                            STRUCTURE ARCHITECT
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-mono leading-relaxed">
                        Generate, visualize, and export complex file directory structures in seconds using local LLMs or Gemini AI.
                        Stop creating folders manually.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                        <button onClick={onLaunch} className="group relative px-8 py-4 bg-cyber-gold text-cyber-black font-bold tracking-widest overflow-hidden">
                            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                            <span className="relative z-10 flex items-center gap-2 group-hover:tracking-[0.2em] transition-all">
                                INITIALIZE_SYSTEM <ChevronRight size={18} />
                            </span>
                        </button>
                        <a href="#features" className="px-8 py-4 border border-cyber-gold/30 text-cyber-gold font-bold tracking-widest hover:bg-cyber-gold/5 transition-colors">
                            READ_DOCS
                        </a>
                    </div>
                </section>

                {/* Screenshot/Demo Area */}
                <section className="relative rounded-lg border border-cyber-gold/20 bg-cyber-black overflow-hidden shadow-neon-subtle group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-gold to-transparent opacity-50"></div>
                    <img
                        src="/screenshot_Desktop.png"
                        alt="Cybertree Interface"
                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-700 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent pointer-events-none"></div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Terminal size={24} />}
                        title="SHELL EXPORT"
                        description="Convert your visual tree directly into an executable .sh script to generate folders instantly."
                    />
                    <FeatureCard
                        icon={<Zap size={24} />}
                        title="AI GENERATION"
                        description="Describe your project (e.g. 'Next.js Blog') and let the neural engine build the architecture."
                    />
                    <FeatureCard
                        icon={<Shield size={24} />}
                        title="SECURE & LOCAL"
                        description="Runs entirely in your browser or electron. Support for local LLMs via OpenAI protocol."
                    />
                    <FeatureCard
                        icon={<Share2 size={24} />}
                        title="ASCII PREVIEW"
                        description="Real-time ASCII tree generation for your README.md or technical documentation."
                    />
                    <FeatureCard
                        icon={<Cpu size={24} />}
                        title="CYBERPUNK UI"
                        description="Immersive 4K compliant interface with scanlines, neon glows, and tactile feedback."
                    />
                    <FeatureCard
                        icon={<Github size={24} />}
                        title="OPEN SOURCE"
                        description="MIT Licensed. Built with React, Vite, and Tailwind. Hackable by design."
                    />
                </section>

                {/* Footer */}
                <footer className="border-t border-cyber-gold/10 pt-12 pb-8 text-center">
                    <p className="text-cyber-gold/40 text-sm font-mono mb-4">
                        // END_OF_LINE
                    </p>
                    <p className="text-gray-500 text-xs tracking-widest">
                        DESIGNED BY <a href="https://github.com/me-yeatz" className="text-cyber-gold hover:underline">YEATZ</a> © 2026
                    </p>
                </footer>

            </main>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-6 border border-cyber-gold/10 bg-cyber-gray/20 hover:bg-cyber-gray/40 hover:border-cyber-gold/40 transition-all group">
        <div className="text-cyber-gold mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-cyber-gold transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);
