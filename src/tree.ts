interface Node<T> {
    value: T;
    children: Node<T>[];
}

/**
 * A generic tree.
 */
export class TreeNode<T> implements Node<T> {
    public value: T;
    public children: Array<TreeNode<T>> = new Array<TreeNode<T>>();

    constructor(value: T) {
        this.value = value;
    }

    public addChild(child: TreeNode<T>): void {
        this.children.push(child);
    }

    public removeChild(removeValue: T): void {
        const removeChildIndex = this.children.findIndex((x) => x.value === removeValue);

        if (removeChildIndex !== -1) {
            this.children.splice(removeChildIndex, 1);
        }
    }
}