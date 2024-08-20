import type { DataNode } from 'antd/es/tree';

/**
 * 根据目标结点的 ID 找出树中对应的目标结点
 *
 * @param key 目标 ID
 * @param nodes 结点树
 * @returns 目标结点
 */
export function findTreeNode<T extends { children?: T[] }>(
  nodes: T[],
  predicate: (node: T) => boolean,
): T | undefined {
  for (const node of nodes) {
    if (predicate(node)) {
      return node;
    }

    if (!node.children || node.children.length === 0) {
      continue;
    }

    const result = findTreeNode(node.children, predicate);

    if (!result) {
      continue;
    }

    return result;
  }
}

export interface TreeNodesFilterOptions {
  /**
   * 是否将无叶子节点的节点清理掉
   */
  treeShaking: boolean;
}

/**
 * 根据判断条件过滤树结点
 *
 * @param nodes 结点树
 * @param predicate 判定条件
 * @returns
 */
export function filterTreeNodes<T extends { children?: T[] }>(
  nodes: T[],
  predicate: (node: T) => boolean,
  options?: Partial<TreeNodesFilterOptions>,
): T[] {
  const mergedOptions: TreeNodesFilterOptions = {
    treeShaking: false,
    ...options,
  };

  if (nodes.length === 0) {
    return nodes;
  }

  const matchedNodes: T[] = [];

  for (const node of nodes) {
    let matchedChildren: T[] = [];

    if (node.children) {
      matchedChildren = filterTreeNodes(node.children, predicate, options);
    }

    const isChildrenMatched = matchedChildren.length > 0;

    if (isChildrenMatched) {
      matchedNodes.push({
        ...node,
        children: matchedChildren,
      });
      continue;
    }

    if (!predicate?.(node)) {
      continue;
    }

    if (mergedOptions.treeShaking && node.children && !isChildrenMatched) {
      continue;
    }

    matchedNodes.push({
      ...node,
      children: void 0,
    });
  }

  return matchedNodes;
}

export interface BuildTreeOptions {
  /**
   * ID 的字段名称
   *
   * @default 'id'
   */
  keyFieldName: string;
  /**
   * 标题的字段名称
   *
   * @default 'name'
   */
  titleFieldName: string;
  /**
   * 父级 ID 的字段名称
   *
   * @default 'parentId'
   */
  parentKeyFieldName: string;
  /**
   * 孤儿节点的处理方式
   *
   * `ignore` - 直接忽略，不做任何处理
   * `error` - 报错退出
   * `root` - 放置到根节点处
   */
  orphanHandling: 'ignore' | 'error' | 'root';
}

/**
 * 将列表结构转换为属性结构
 *
 * @param list 数据列表
 * @param options 配置
 * @returns
 */
export function buildTreeNodes(
  list: any[],
  options?: Partial<BuildTreeOptions>,
): DataNode[] {
  const settings: BuildTreeOptions = {
    keyFieldName: 'id',
    titleFieldName: 'name',
    parentKeyFieldName: 'parentId',
    orphanHandling: 'ignore',
    ...options,
  };

  const itemMap = new Map<any, any>();
  const nodeMap = new Map<any, DataNode>();

  list.forEach((item) => {
    const key = item[settings.keyFieldName];

    itemMap.set(key, item);
    nodeMap.set(key, {
      key: item[settings.keyFieldName],
      title: item[settings.keyFieldName],
    });
  });

  const root: Array<DataNode> = [];

  Array.from(itemMap.entries()).forEach(([key, item]) => {
    const node = nodeMap.get(key);

    if (!node) {
      return;
    }

    if (!item[settings.parentKeyFieldName]) {
      root.push(node);
      return;
    }

    const parent = nodeMap.get(item[settings.parentKeyFieldName]);

    if (!parent) {
      const message = `找到孤儿节点[${item.id}][${item.title}]`;
      console.warn(message);

      switch (settings.orphanHandling) {
        case 'root':
          root.push(node);
          return;
        case 'error':
          throw new Error(message);
        case 'ignore':
          return;
        default:
          return;
      }
    }

    parent.children ??= [];
    parent.children.push(node);
  });

  return root;
}

export interface NodeVisitor {
  (node: DataNode, parent?: DataNode): void;
}

/**
 * 遍历整个节点树
 *
 * @param nodes 节点树
 * @param visitor 访问器，以当前节点和父节点为参数
 */
export function traverseTree(nodes: DataNode[], visitor: NodeVisitor) {
  const walkNode = (node: DataNode, parentNode?: DataNode) => {
    visitor(node, parentNode);

    if (node.children) {
      for (const childNode of node.children) {
        walkNode(childNode, node);
      }
    }
  };

  for (const node of nodes) {
    walkNode(node);
  }
}
