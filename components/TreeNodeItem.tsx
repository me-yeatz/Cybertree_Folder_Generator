import React, { useState } from 'react';
import { TreeNode } from '../types';
import {
    ChevronDown,
    Folder,
    FolderOpen,
    File,
    FileCode,
    FileJson,
    FileText,
    Image as ImageIcon,
    Globe,
    Settings,
    Box,
    Plus,
    Trash2,
    Edit2,
} from 'lucide-react';

interface TreeNodeItemProps {
    node: TreeNode;
    level: number;
    onAdd: (parentId: string, type: 'file' | 'folder') => void;
    onDelete: (id: string) => void;
    onRename: (id: string, newName: string) => void;
    onToggle: (id: string) => void;
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const getFileIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    const ext = lowerName.split('.').pop();

    const iconProps = { size: 16, className: "icon-glow transition-all duration-300" };

    if (lowerName === 'package.json' || lowerName.includes('config') || lowerName === 'dockerfile') {
        return <Settings {...iconProps} className={`${iconProps.className} text-pink-400`} />;
    }

    switch (ext) {
        case 'tsx':
        case 'ts':
            return <FileCode {...iconProps} className={`${iconProps.className} text-blue-400`} />;
        case 'jsx':
        case 'js':
            return <FileCode {...iconProps} className={`${iconProps.className} text-yellow-300`} />;
        case 'css':
        case 'scss':
        case 'less':
        case 'sass':
            return <FileCode {...iconProps} className={`${iconProps.className} text-cyan-300`} />;
        case 'html':
        case 'htm':
            return <Globe {...iconProps} className={`${iconProps.className} text-orange-400`} />;
        case 'json':
        case 'yaml':
        case 'yml':
            return <FileJson {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
        case 'md':
        case 'txt':
        case 'env':
            return <FileText {...iconProps} className={`${iconProps.className} text-gray-300`} />;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'ico':
            return <ImageIcon {...iconProps} className={`${iconProps.className} text-purple-400`} />;
        case 'zip':
        case 'rar':
            return <Box {...iconProps} className={`${iconProps.className} text-red-400`} />;
        default:
            return <File {...iconProps} className={`${iconProps.className} text-cyber-gold`} />;
    }
};

export const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
    node,
    level,
    onAdd,
    onDelete,
    onRename,
    onToggle,
    selectedId,
    onSelect
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(node.name);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onRename(node.id, editName);
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setEditName(node.name);
            setIsEditing(false);
        }
    };

    const isSelected = selectedId === node.id;

    return (
        <div className="select-none font-mono relative">
            {/* Selection Highlighter - Glassmorphic bar */}
            {isSelected && (
                <div className="absolute inset-0 bg-cyber-gold/10 border-l-2 border-cyber-gold shadow-[inset_10px_0_20px_-10px_rgba(255,219,137,0.3)] z-0 pointer-events-none"></div>
            )}

            <div
                className={`
          group flex items-center py-1.5 px-2 cursor-pointer transition-all duration-200 relative z-10
          ${isSelected
                        ? 'text-cyber-gold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
        `}
                style={{ paddingLeft: `${level * 20 + 12}px` }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(node.id);
                }}
            >
                {/* Toggle Icon */}
                <div
                    className={`mr-2 w-4 h-4 flex items-center justify-center transition-transform duration-200 ${node.isOpen ? 'rotate-0' : '-rotate-90'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (node.type === 'folder') onToggle(node.id);
                    }}
                >
                    {node.type === 'folder' && (
                        <ChevronDown size={12} className={isSelected ? 'text-cyber-gold' : 'text-gray-500'} />
                    )}
                </div>

                {/* Type Icon */}
                <div className="mr-3 relative">
                    {node.type === 'folder'
                        ? (node.isOpen
                            ? <FolderOpen size={20} className="text-cyber-gold icon-glow" />
                            : <Folder size={20} className="text-cyber-gold/70" />)
                        : getFileIcon(node.name)}
                </div>

                {/* Name / Edit Input */}
                <div className="flex-1 overflow-hidden">
                    {isEditing ? (
                        <input
                            autoFocus
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={() => {
                                onRename(node.id, editName);
                                setIsEditing(false);
                            }}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-black/80 border border-cyber-gold text-cyber-gold px-1 text-sm outline-none shadow-neon-subtle"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <span
                            className={`text-sm tracking-wide truncate block transition-all ${isSelected ? 'font-bold text-shadow-neon' : ''}`}
                            style={isSelected ? { textShadow: '0 0 8px rgba(255, 219, 137, 0.4)' } : {}}
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {node.name}
                        </span>
                    )}
                </div>

                {/* Hover Actions */}
                <div className={`flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isEditing ? 'hidden' : ''}`}>
                    {node.type === 'folder' && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onAdd(node.id, 'file'); }}
                                className="p-1 text-gray-500 hover:text-cyber-gold hover:bg-cyber-gold/10 rounded" title="Add File"
                            >
                                <Plus size={12} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onAdd(node.id, 'folder'); }}
                                className="p-1 text-gray-500 hover:text-cyber-gold hover:bg-cyber-gold/10 rounded" title="Add Folder"
                            >
                                <Folder size={12} />
                            </button>
                        </>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                        className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded" title="Rename"
                    >
                        <Edit2 size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
                        className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded" title="Delete"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {/* Children Recursion - with line guide */}
            {node.type === 'folder' && node.isOpen && node.children && (
                <div className="relative">
                    {/* Dynamic Tail Line */}
                    <div
                        className="absolute top-0 bottom-0 w-px bg-cyber-gold/20 shadow-[0_0_2px_#ffdb89]"
                        style={{ left: `${(level * 20) + 46}px` }}
                    ></div>

                    <div>
                        {node.children.map(child => (
                            <TreeNodeItem
                                key={child.id}
                                node={child}
                                level={level + 1}
                                onAdd={onAdd}
                                onDelete={onDelete}
                                onRename={onRename}
                                onToggle={onToggle}
                                selectedId={selectedId}
                                onSelect={onSelect}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
