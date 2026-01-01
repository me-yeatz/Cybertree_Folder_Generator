import React, { useState, useEffect } from 'react';
import { TreeNode } from '../types';
import { generateAsciiTree } from '../utils/treeUtils';
import { Copy, Check, Terminal } from 'lucide-react';

interface AsciiPreviewProps {
    nodes: TreeNode[];
}

export const AsciiPreview: React.FC<AsciiPreviewProps> = ({ nodes }) => {
    const [ascii, setAscii] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setAscii(generateAsciiTree(nodes));
    }, [nodes]);

    const handleCopy = () => {
        navigator.clipboard.writeText(ascii);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-cyber-dark/50 border border-cyber-gray clip-corner relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 z-10">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-cyber-black border border-cyber-gold/30 hover:border-cyber-gold text-cyber-gold text-xs transition-colors clip-corner-sm"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'COPIED' : 'COPY'}
                </button>
            </div>

            <div className="p-3 border-b border-cyber-gray flex items-center gap-2 bg-cyber-gray/10">
                <Terminal size={16} className="text-cyber-gold" />
                <span className="text-xs font-bold tracking-widest text-cyber-gold">OUTPUT_STREAM</span>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-cyber-black">
                <pre className="font-mono text-sm leading-6 text-gray-300 whitespace-pre">
                    {ascii || <span className="text-gray-600 opacity-50">// No structure generated...</span>}
                </pre>
            </div>

            {/* Decorative Cyberpunk Elements */}
            <div className="absolute bottom-2 right-2 flex gap-1">
                <div className="w-1 h-1 bg-cyber-gold animate-pulse"></div>
                <div className="w-1 h-1 bg-cyber-gold opacity-50"></div>
                <div className="w-1 h-1 bg-cyber-gold opacity-20"></div>
            </div>
        </div>
    );
};
