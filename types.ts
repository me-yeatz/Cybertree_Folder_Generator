export interface TreeNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children: TreeNode[];
    isOpen: boolean;
    parentId: string | null;
}

export type TreeAction =
    | { type: 'ADD_NODE'; parentId: string | null; nodeType: 'file' | 'folder' }
    | { type: 'DELETE_NODE'; nodeId: string }
    | { type: 'RENAME_NODE'; nodeId: string; newName: string }
    | { type: 'TOGGLE_FOLDER'; nodeId: string }
    | { type: 'SET_TREE'; root: TreeNode[] };

export interface GenerationConfig {
    includeRootDot: boolean;
    trailingSlash: boolean;
}