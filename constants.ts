import { TreeNode } from './types';

export const APP_TITLE = 'CYBERTREE GEN';
export const APP_VERSION = 'v1.0.0';

export const INITIAL_TREE: TreeNode[] = [
    {
        id: 'root-1',
        name: 'src',
        type: 'folder',
        isOpen: true,
        parentId: null,
        children: [
            {
                id: 'file-1',
                name: 'index.ts',
                type: 'file',
                isOpen: false,
                parentId: 'root-1',
                children: []
            },
            {
                id: 'folder-2',
                name: 'components',
                type: 'folder',
                isOpen: true,
                parentId: 'root-1',
                children: [
                    {
                        id: 'file-2',
                        name: 'App.tsx',
                        type: 'file',
                        isOpen: false,
                        parentId: 'folder-2',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'file-3',
        name: 'package.json',
        type: 'file',
        isOpen: false,
        parentId: null,
        children: []
    },
    {
        id: 'file-4',
        name: 'README.md',
        type: 'file',
        isOpen: false,
        parentId: null,
        children: []
    }
];
