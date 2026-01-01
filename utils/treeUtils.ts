import { TreeNode } from '../types';

export const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const findNode = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNode(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

// Returns a new copy of the tree
export const addNodeToTree = (nodes: TreeNode[], parentId: string | null, nodeType: 'file' | 'folder'): TreeNode[] => {
    const newNode: TreeNode = {
        id: generateId(),
        name: nodeType === 'folder' ? 'new-folder' : 'new-file',
        type: nodeType,
        children: [],
        isOpen: true,
        parentId: parentId
    };

    if (!parentId) {
        return [...nodes, newNode];
    }

    return nodes.map(node => {
        if (node.id === parentId) {
            return {
                ...node,
                isOpen: true,
                children: [...node.children, newNode].sort((a, b) => {
                    // Folders first
                    if (a.type === b.type) return a.name.localeCompare(b.name);
                    return a.type === 'folder' ? -1 : 1;
                })
            };
        }
        if (node.children.length > 0) {
            return { ...node, children: addNodeToTree(node.children, parentId, nodeType) };
        }
        return node;
    });
};

export const deleteNodeFromTree = (nodes: TreeNode[], nodeId: string): TreeNode[] => {
    return nodes.filter(node => node.id !== nodeId).map(node => ({
        ...node,
        children: deleteNodeFromTree(node.children, nodeId)
    }));
};

export const renameNodeInTree = (nodes: TreeNode[], nodeId: string, newName: string): TreeNode[] => {
    return nodes.map(node => {
        if (node.id === nodeId) {
            return { ...node, name: newName };
        }
        if (node.children.length > 0) {
            return { ...node, children: renameNodeInTree(node.children, nodeId, newName) };
        }
        return node;
    });
};

export const toggleFolderInTree = (nodes: TreeNode[], nodeId: string): TreeNode[] => {
    return nodes.map(node => {
        if (node.id === nodeId) {
            return { ...node, isOpen: !node.isOpen };
        }
        if (node.children.length > 0) {
            return { ...node, children: toggleFolderInTree(node.children, nodeId) };
        }
        return node;
    });
};

export const generateAsciiTree = (nodes: TreeNode[], prefix = ''): string => {
    let result = '';

    nodes.forEach((node, index) => {
        const isLast = index === nodes.length - 1;
        const connector = isLast ? '└── ' : '├── ';

        result += `${prefix}${connector}${node.name}${node.type === 'folder' ? '/' : ''}\n`;

        if (node.children && node.children.length > 0) {
            const childPrefix = prefix + (isLast ? '    ' : '│   ');
            result += generateAsciiTree(node.children, childPrefix);
        }
    });

    return result;
};

// Converts list of paths (e.g. "src/components/Button.tsx") to TreeNode structure
export const parsePathsToTree = (paths: string[]): TreeNode[] => {
    const rootNodes: TreeNode[] = [];

    const getOrAddChild = (parentChildren: TreeNode[], name: string, isFile: boolean, parentId: string | null): TreeNode => {
        let existing = parentChildren.find(n => n.name === name && n.type === (isFile ? 'file' : 'folder'));
        if (!existing) {
            existing = {
                id: generateId(),
                name,
                type: isFile ? 'file' : 'folder',
                children: [],
                isOpen: true,
                parentId
            };
            parentChildren.push(existing);
            // Sort on insert
            parentChildren.sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name);
                return a.type === 'folder' ? -1 : 1;
            });
        }
        return existing;
    };

    paths.forEach(path => {
        const parts = path.split('/').filter(Boolean);
        let currentLevel = rootNodes;
        let currentParentId: string | null = null;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            // Crude heuristic: if it has an extension, it's a file, unless clearly a directory name
            // But relying on "isLast" is safer for simple paths. 
            // Better: Check if it is last part.
            const node = getOrAddChild(currentLevel, part, isLast, currentParentId);
            currentLevel = node.children;
            currentParentId = node.id;
        });
    });

    return rootNodes;
};

export const filterTree = (nodes: TreeNode[], query: string): TreeNode[] => {
    if (!query) return nodes;
    const lowerQuery = query.toLowerCase();

    const filterNode = (node: TreeNode): TreeNode | null => {
        const matches = node.name.toLowerCase().includes(lowerQuery);
        const filteredChildren = node.children
            ? node.children.map(filterNode).filter((n): n is TreeNode => n !== null)
            : [];

        if (matches || filteredChildren.length > 0) {
            return {
                ...node,
                isOpen: true, // Auto expand
                children: filteredChildren
            };
        }
        return null;
    };

    return nodes.map(filterNode).filter((n): n is TreeNode => n !== null);
};

export const generateShellScript = (nodes: TreeNode[], parentPath = ''): string => {
    let script = '';

    // Add header only at root call
    if (parentPath === '') {
        script += '#!/bin/bash\n\n# Generated by CyberTree\n';
    }

    nodes.forEach(node => {
        const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

        if (node.type === 'folder') {
            script += `mkdir -p "${currentPath}"\n`;
            if (node.children && node.children.length > 0) {
                script += generateShellScript(node.children, currentPath);
            }
        } else {
            script += `touch "${currentPath}"\n`;
        }
    });

    return script;
};
