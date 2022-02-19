/*** UTILS ****/

function isNullOrUndefined(object:  Object): boolean {
  return object === null || object === undefined;
}

/**** DECLARATIONS  ****/

export interface IValue<T> {
  value: T;
}

export interface IEquitable<T> extends IValue<T> {
  equals(that: T): boolean;
}

export interface IComparable<T> extends IValue<T> {
  isBigger(that: T): boolean;
  isSmaller(that: T): boolean;
}

export interface IComparator<T> {
  equals(left: IEquitable<T>, right: IEquitable<T>): boolean;
  isBigger(left: IComparable<T>, right: IComparable<T>): boolean;
  isSmaller(left: IComparable<T>, right: IComparable<T>): boolean;
}

enum ComparsionResult {
  EQUALS,
  LESSTHAN,
  GREATERTHAN
}

export interface IBinaryNode<T> extends IComparable<T>, IEquitable<T>, IValue<T> {
  leftChild: IBinaryNode<T>;
  rightChild: IBinaryNode<T>;
  isLeaf(): boolean;
}

export interface IBinaryTree<T> {
  root: IBinaryNode<T>;
  searchFor(value: T): IBinaryNode<T>
}

/*** IMPLEMENTATIONS ***/

export abstract class BinaryNode<T> implements IBinaryNode<T> {

  public value: T;
  public leftChild: IBinaryNode<T>;
  public rightChild: IBinaryNode<T>;

  public isLeaf(): boolean {
    return isNullOrUndefined(this.leftChild) && isNullOrUndefined(this.rightChild);
  }

  public abstract equals(that: T): boolean
  public abstract isBigger(that: T): boolean
  public abstract isSmaller(that: T): boolean

}

export abstract class BinaryTree<T> implements IBinaryTree<T> {

  protected readonly _searcher: BinaryTreeSearcher<T>;
  public root: IBinaryNode<T>;

  constructor() {
    this._searcher = BinaryTreeSearcher.createFor(this);
  }

  public searchFor(value: T): IBinaryNode<T> {
    return this._searcher.search(value);
  }
}

/*** SEARCH ****/
/**
 * binary node comparator -> ctor(node), compare(value): enum (eq, lt, gt)
 */

class BinaryTreeSearcher<T> {

  private constructor(
    private readonly _tree: IBinaryTree<T>
  ) {}

  public static createFor<T>(tree: IBinaryTree<T>): BinaryTreeSearcher<T> {
    return new BinaryTreeSearcher(tree);
  }

  public search(value: T): IBinaryNode<T> {
    return BinaryNodeSearcher
      .createFor(this._tree.root)
      .search(value)
    ;
  }

}

class BinaryNodeSearcher<T> {

  private constructor(
    private readonly _node: IBinaryNode<T>
  ) {}

  public static createFor<T>(node: IBinaryNode<T>): BinaryNodeSearcher<T> {
    return new BinaryNodeSearcher(node);
  }

  public search(value: T): IBinaryNode<T> {
    const comparsionResult = this.compare(value);
    switch(comparsionResult) {
      case ComparsionResult.EQUALS: return this._node;
      case ComparsionResult.LESSTHAN: return this.searchLeftChild(value);
      case ComparsionResult.GREATERTHAN: return this.searchRightChild(value);
    }
  }

  private compare(obj: T): ComparsionResult {
    if(this._node.isSmaller(obj)) ComparsionResult.LESSTHAN;
    if(this._node.isBigger(obj)) ComparsionResult.GREATERTHAN;
    return ComparsionResult.EQUALS;
  }

  private searchLeftChild(value: T): IBinaryNode<T> {
    return this.searchChild(value, this._node.leftChild);
  }

  private searchRightChild(value: T): IBinaryNode<T> {
    return this.searchChild(value, this._node.rightChild);
  }

  private searchChild(value: T, currentNode: IBinaryNode<T>): IBinaryNode<T> {
    return BinaryNodeSearcher.createFor(currentNode).search(value);
  }

}
