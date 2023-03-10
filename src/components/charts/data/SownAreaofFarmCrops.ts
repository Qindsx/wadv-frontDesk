/**
 *
 * @param items 数据
 * @param idKey 各项数据的id名称
 * @param parentKey 父节点id名称
 * @param rootVal 选填 根节点名称，没有则表示有多个根节点
 * @param sort  选填 排序函数，没有则按递归栈返回的顺序
 * @returns 返回带有父子关系的树形结构
 */
export const buildTree = <
  ID extends string,
  PID extends string,
  T extends { [key in ID | PID]: string }
>(
  items: T[],
  idKey: ID,
  parentKey: PID,
  rootVal?: string,
  sort?: (a: T, b: T) => -1 | 1 | 0
) => {
  type Wrapper = Map<string, T[]>;
  type TreeNode = T & { children?: TreeNode[] };

  const parnetWrap = (items: T[]): Wrapper => {
    let parnetWrapper: Wrapper = new Map();
    items.forEach((item) => {
      if (parnetWrapper.has(item[parentKey])) {
        let children = parnetWrapper.get(item[parentKey]) as T[];
        children.push(item);
      } else {
        parnetWrapper.set(item[parentKey], [item]);
      }
    });
    return parnetWrapper;
  };

  const topLevelWrap = (items: T[]): T[] => {
    if (rootVal) {
      return items.filter((ele) => ele[parentKey] === rootVal);
    } else {
      return items.filter(
        //@ts-ignore
        (parent) => !items.find((item) => item[idKey] === parent[parentKey])
      );
    }
  };

  const build = (topLevel: T[], wrapper: Wrapper): TreeNode[] => {
    return topLevel.map((item) => {
      if (wrapper.has(item[idKey])) {
        let children = build(wrapper.get(item[idKey]) as TreeNode[], wrapper);
        if (sort) {
          children = children.sort(sort);
        }
        return {
          ...item,
          children,
        };
      } else {
        return item;
      }
    });
  };
  const parnetWrapper = parnetWrap(items);
  const topLevelWrapper = topLevelWrap(items);
  return build(topLevelWrapper, parnetWrapper);
};
