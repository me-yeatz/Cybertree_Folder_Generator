import React, { useState, useCallback, useMemo } from 'react';
import { TreeNode } from './types';
import { INITIAL_TREE, APP_VERSION } from './constants';
import { addNodeToTree, deleteNodeFromTree, renameNodeInTree, toggleFolderInTree, parsePathsToTree, filterTree, generateShellScript } from './utils/treeUtils';
import { TreeNodeItem } from './components/TreeNodeItem';
import { AsciiPreview } from './components/AsciiPreview';
import { generateStructureFromPrompt } from './services/aiService';
import { Sparkles, FolderPlus, FilePlus, RefreshCcw, Cpu, AlertTriangle, Hexagon, Power, Search, Download } from 'lucide-react';

const App: React.FC = () => {
    const [tree, setTree] = useState<TreeNode[]>(INITIAL_TREE);
    const [selectedId, setSelectedId] = useState<string | null>('root');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // -- Tree Handlers --
    const handleAdd = useCallback((parentId: string | null, type: 'file' | 'folder') => {
        setTree(prev => addNodeToTree(prev, parentId, type));
    }, []);

    const handleDelete = useCallback((id: string) => {
        setTree(prev => deleteNodeFromTree(prev, id));
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const handleRename = useCallback((id: string, newName: string) => {
        setTree(prev => renameNodeInTree(prev, id, newName));
    }, []);

    const handleToggle = useCallback((id: string) => {
        setTree(prev => toggleFolderInTree(prev, id));
    }, []);

    const handleExport = () => {
        const script = generateShellScript(tree);
        const blob = new Blob([script], { type: 'text/x-sh' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'structure.sh';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // -- AI Handler --
    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        setAiError(null);

        try {
            const paths = await generateStructureFromPrompt(aiPrompt);
            if (paths.length > 0) {
                const newTree = parsePathsToTree(paths);
                setTree(newTree);
            } else {
                setAiError("AI returned no results. Try a more specific prompt.");
            }
        } catch (_err) {
            setAiError("API Error. Verify API Key configuration.");
        } finally {
            setIsGenerating(false);
        }
    };

    const clearTree = () => {
        setTree([]);
        setSelectedId(null);
    }

    // -- Derived State --
    const displayedTree = useMemo(() => {
        return filterTree(tree, searchQuery);
    }, [tree, searchQuery]);

    return (
        <div className="h-full flex flex-col md:flex-row bg-cyber-black text-cyber-gold font-tech selection:bg-cyber-gold selection:text-cyber-black overflow-hidden relative scanline">

            {/* Background Decorative Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#ffdb89 1px, transparent 1px), linear-gradient(90deg, #ffdb89 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
            </div>

            {/* Sidebar Controls - The "Control Unit" */}
            <aside className="w-full md:w-80 flex flex-col z-20 glass-panel-heavy border-r border-cyber-gold/20 relative">
                {/* Top Hardware details */}
                <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-1 h-1 bg-cyber-gold rounded-full opacity-50"></div>
                    <div className="w-1 h-1 bg-cyber-gold rounded-full opacity-30"></div>
                </div>

                {/* Header */}
                <div className="p-6 border-b border-cyber-gold/10 bg-gradient-to-r from-cyber-gold/5 to-transparent">
                    <h1 className="text-3xl font-bold tracking-[0.2em] flex items-center gap-2 neon-text text-white">
                        <Cpu className="text-cyber-gold icon-glow" />
                        <span className="text-cyber-gold">CYBER</span>
                    </h1>
                    <h2 className="text-lg font-light tracking-widest text-gray-400 ml-9 -mt-1 opacity-80">TREE_GEN</h2>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[10px] text-cyber-gold/60 font-mono border border-cyber-gold/20 px-2 py-0.5 rounded">{APP_VERSION}</span>
                        <div className="flex gap-1 items-center">
                            <span className="text-[9px] uppercase tracking-wider text-green-500/80">System Online</span>
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
                        </div>
                    </div>

                    {/* Credit Text */}
                    <div className="mt-3 text-right">
                        <span className="text-[9px] text-cyber-gold/40 font-mono tracking-wide uppercase">by yeatz 2026</span>
                    </div>
                </div>

                {/* AI Input Section - "Data Injection" */}
                <div className="p-5 border-b border-cyber-gold/10 space-y-4 relative">
                    <div className="absolute right-0 top-0 w-8 h-8 border-t border-r border-cyber-gold/20"></div>

                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-cyber-gold/80 mb-1">
                        <Sparkles size={12} className="text-cyber-gold" />
                        <span>NEURAL_GENERATION</span>
                    </div>

                    <div className="relative group">
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Initialize structure parameters..."
                            className="w-full bg-black/40 border border-cyber-gold/20 p-3 text-xs focus:border-cyber-gold/80 outline-none text-gray-300 resize-none h-24 placeholder:text-gray-600 font-mono transition-all focus:shadow-neon-subtle"
                        />
                        {/* Corner accents */}
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-gold/50 pointer-events-none group-hover:border-cyber-gold transition-colors"></div>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-gold/50 pointer-events-none group-hover:border-cyber-gold transition-colors"></div>
                    </div>

                    {aiError && (
                        <div className="text-red-400 text-[10px] font-mono flex items-center gap-2 bg-red-900/10 p-2 border-l-2 border-red-500">
                            <AlertTriangle size={12} /> {aiError}
                        </div>
                    )}

                    <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating || !aiPrompt.trim()}
                        className={`
              w-full py-3 px-4 text-xs font-bold tracking-[0.2em] uppercase transition-all relative overflow-hidden group
              border border-cyber-gold/30
              ${isGenerating
                                ? 'bg-cyber-gray/50 text-gray-500 cursor-not-allowed'
                                : 'bg-cyber-gold/10 text-cyber-gold hover:bg-cyber-gold hover:text-black hover:shadow-neon'}
            `}
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isGenerating ? <RefreshCcw className="animate-spin" size={14} /> : <Hexagon size={14} className="group-hover:rotate-90 transition-transform duration-500" />}
                            {isGenerating ? 'PROCESSING_DATA...' : 'INITIATE'}
                        </div>
                    </button>
                </div>

                {/* Manual Actions - "Manual Override" */}
                <div className="p-5 grid grid-cols-2 gap-3">
                    <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                        <div className="h-[1px] w-4 bg-gray-600"></div> MANUAL_OVERRIDE
                    </div>

                    <button
                        onClick={() => handleAdd(selectedId || null, 'folder')}
                        className="flex items-center justify-center gap-2 py-2 border border-cyber-gold/20 bg-black/20 hover:border-cyber-gold/60 text-cyber-gold/70 hover:text-cyber-gold text-xs transition-all hover:shadow-neon-subtle"
                    >
                        <FolderPlus size={14} /> MKDIR
                    </button>
                    <button
                        onClick={() => handleAdd(selectedId || null, 'file')}
                        className="flex items-center justify-center gap-2 py-2 border border-cyber-gold/20 bg-black/20 hover:border-cyber-gold/60 text-cyber-gold/70 hover:text-cyber-gold text-xs transition-all hover:shadow-neon-subtle"
                    >
                        <FilePlus size={14} /> TOUCH
                    </button>

                    <button
                        onClick={handleExport}
                        className="col-span-2 flex items-center justify-center gap-2 py-2 border border-cyber-gold/20 bg-cyber-gold/5 hover:bg-cyber-gold/20 text-cyber-gold text-xs transition-all hover:shadow-neon-subtle mt-2"
                    >
                        <Download size={14} /> EXPORT_SHELL_SCRIPT
                    </button>

                    <button
                        onClick={clearTree}
                        className="col-span-2 flex items-center justify-center gap-2 py-2 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-black text-xs transition-all mt-2 opacity-80 hover:opacity-100 group"
                    >
                        <Power size={12} className="group-hover:scale-110 transition-transform" /> PURGE_SYSTEM
                    </button>
                </div>

                {/* Footer info */}
                <div className="mt-auto p-4 border-t border-cyber-gold/10 text-[9px] text-gray-500 font-mono flex flex-col gap-1">
                    <div className="flex justify-between">
                        <span>MEM_USAGE: 42%</span>
                        <span>LATENCY: 12ms</span>
                    </div>
                    <div className="w-full bg-gray-800 h-0.5 mt-1 overflow-hidden">
                        <div className="h-full bg-cyber-gold w-1/3 animate-pulse"></div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden relative p-4 gap-4 bg-transparent">

                {/* Structure View Panel */}
                <section className="flex-1 flex flex-col z-10 glass-panel rounded-lg overflow-hidden relative edge-glow-l">
                    {/* Panel Header */}
                    <div className="h-14 bg-black/40 border-b border-cyber-gold/10 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyber-gold rounded-full shadow-neon-subtle"></div>
                            <h2 className="font-bold tracking-widest text-sm text-cyber-gold">ROOT_DIRECTORY</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group w-48 transition-all focus-within:w-64">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-cyber-gold/50 group-focus-within:text-cyber-gold" size={14} />
                            <input
                                className="w-full bg-black/40 border border-cyber-gold/10 rounded-sm py-1.5 pl-8 pr-4 text-xs text-cyber-gold placeholder:text-cyber-gold/30 focus:border-cyber-gold/50 outline-none transition-all focus:bg-black/60 shadow-inner"
                                placeholder="SEARCH_FILES..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-1 hidden md:flex">
                            <div className="w-8 h-[2px] bg-cyber-gold/30"></div>
                            <div className="w-2 h-[2px] bg-cyber-gold/30"></div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                        {displayedTree.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-sm opacity-50">
                                <Hexagon size={48} className="mb-4 text-cyber-gold/20" />
                                <p>// NO_DATA_STREAM</p>
                                <p className="text-xs mt-2 text-cyber-gold/40">
                                    {searchQuery ? "No matching files found" : "Initiate generation sequence or manual entry"}
                                </p>
                            </div>
                        ) : (
                            <div className="pl-2 pt-2 pb-10">
                                {displayedTree.map(node => (
                                    <TreeNodeItem
                                        key={node.id}
                                        node={node}
                                        level={0}
                                        onAdd={handleAdd}
                                        onDelete={handleDelete}
                                        onRename={handleRename}
                                        onToggle={handleToggle}
                                        selectedId={selectedId}
                                        onSelect={setSelectedId}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="h-2 bg-cyber-gold/5 border-t border-cyber-gold/10 w-full"></div>
                </section>

                {/* Preview Panel */}
                <section className="w-full md:w-1/3 z-10 glass-panel rounded-lg overflow-hidden flex flex-col edge-glow-r">
                    <div className="h-10 bg-black/40 border-b border-cyber-gold/10 flex items-center px-4 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyber-gold/50 rounded-sm"></div>
                            <h2 className="font-bold tracking-widest text-sm text-gray-300">ASCII_RENDER</h2>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-1 h-3 bg-cyber-gold opacity-${i * 20} transform skew-x-12`}></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <AsciiPreview nodes={displayedTree} />
                    </div>
                </section>

            </main>
        </div>
    );
};

export default App;
