
import { TreeNode } from './tree';

const INDENTATION = 2;

/**
 * A directory structure.
 */
export class Directory {
    private rootDirectory: TreeNode<string>;

    /**
     * Constructor creates root directory.
     */
    constructor() {
        this.rootDirectory = new TreeNode<string>('');
    }

    /**
     * Create a new diretory.
     * @param directoryPath Directory path delimited by "/".
     */
    public create(directoryPath: string): void {
        const subDirPath: Array<string> = directoryPath.split('/');
        let currentDir: TreeNode<string> = this.rootDirectory;

        console.log(`CREATE ${directoryPath}`);

        subDirPath.forEach((subDirName) => {
            if (currentDir.children.map((child) => child.value).includes(subDirName)) {
                currentDir = currentDir.children.find((x) => x.value === subDirName)!;
            } else {
                const subDirectory = new TreeNode<string>(subDirName);
                currentDir.addChild(subDirectory);
                currentDir = subDirectory;
            }
        });
    }

    /**
     * Output entire directory tree to console with no maximum depth.
     */
    public list(): void {

        console.log(`LIST`);

        this.rootDirectory.children = this.rootDirectory.children.sort((a, b) => (a.value < b.value) ? -1 : 0);

        this.rootDirectory.children.forEach((subDir: TreeNode<string>) => {
            const directoryName = subDir.value;
            
            console.log(directoryName);
            
            this.printFullSubs(subDir.children);
        });
    }

    /**
     * Move directory by finding the source subdirectory, copying to the destination subdirectory
     * and ultimately deleting from the source subdirectory.
     * @param sourceDirectoryPath 
     * @param destinationDirectoryPath 
     */
    public move(sourceDirectoryPath: string, destinationDirectoryPath: string): void {
        const subDirToMove: TreeNode<string> | null = this.findSubdirectory(sourceDirectoryPath);
        const subDirToReceive: TreeNode<string> | null = this.findSubdirectory(destinationDirectoryPath);

        console.log(`MOVE ${sourceDirectoryPath} ${destinationDirectoryPath}`);

        if (subDirToMove && subDirToReceive) {
            // Add to destination.
            subDirToReceive.addChild(subDirToMove);

            // Remove from source.
            this.delete(sourceDirectoryPath, false);
        }
    }

    /**
     * Delete directory and all its subdirectories.  If directory path not found, return that message.
     * @param directoryPath 
     * @returns {string} 
     */
    public delete(directoryPath: string, verbose: boolean = true): string {
        const subDirTree: Array<string> = directoryPath.split('/');
        let parentDir: TreeNode<string> | null = this.rootDirectory;
        let result = 'Success';

        if (verbose) {
            console.log(`DELETE ${directoryPath}`);
        }

        for (let i = 0; subDirTree.length > i; i++) {

            if (parentDir.children.map((child) => child.value).includes(subDirTree[i])) {
                if ((i === 0) && (subDirTree.length === 1)) {
                    parentDir.removeChild(subDirTree[i]);
                    break;
                }
                parentDir = parentDir.children.find((x) => x.value === subDirTree[i])!;

                if (i === subDirTree.length - 2) {
                    parentDir.removeChild(subDirTree[i+1]);
                    break;
                }
            } else {
                result = `Cannot delete ${directoryPath} - ${subDirTree[i]} does not exist.`
            }
        }

        return result;
    }

    /**
     * Recursive helper that prints subdirectory tree with proper indentation.
     * @param subDirectory 
     * @param level 
     */
    private printFullSubs(subDirectory: TreeNode<string>[], level: number = 1) {
        if (subDirectory.length > 0) {
            subDirectory.forEach((subDir) => {
                console.log(`${' '.repeat(INDENTATION * level)}${subDir.value}`);
                subDir.children = subDir.children.sort((a, b) => (a.value < b.value) ? -1 : 0);
                this.printFullSubs(subDir.children, ++level);
                level--;
            });
        }
    }

    /**
     * Return the actual node by passed directory path.
     * @param directoryPath 
     * @returns 
     */
    private findSubdirectory(directoryPath: string): TreeNode<string> | null {
        let result: TreeNode<string> | null = null;
        const subDirTree: Array<string> = directoryPath.split('/');
        let parentDir: TreeNode<string> | null = this.rootDirectory;

        for (let i = 0; subDirTree.length > i; i++) {

            if (parentDir.children.map((child) => child.value).includes(subDirTree[i])) {
                parentDir = parentDir.children.find((x) => x.value === subDirTree[i])!;

                if (i === subDirTree.length - 2) {
                    result = parentDir.children.find((x) => x.value === subDirTree[i+1])!;
                    break;
                } else {
                    result = parentDir;
                }
            }
        }
        return result;
    }
} 