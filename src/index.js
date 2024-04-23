const { document, Node, requestAnimationFrame } = globalThis;

const jsx = (type, props, key) => ({ type, props, key });

const jsxs = jsx;

const jsxDEV = jsx;

const jsxsDEV = jsx;

const Fragment = props => props.children;

const createContext = () => {
  const Context = ({ value, children }) => {
    const initialRef = useRef(true);
    currentVnode.contexts = new Map(currentVnode.contexts);
    if (initialRef.current) {
      currentVnode.contexts.set(Context, { vnodes: new Set(), value });
      initialRef.current = false;
    }
    const existing = currentVnode.contexts.get(Context);
    if (value !== existing.value) {
      currentVnode.contexts.set(Context, value);
      existing.vnodes.forEach(vnode => {
        vnode.shouldUpdate = true;
      });
    }

    return children;
  };

  return Context;
};

const isEmpty = value => value == null || value === false || value === '';

const emptyDef = { props: {} };

const textType = {};

const svgNs = 'http://www.w3.org/2000/svg';

const createNode = (def, parentNode) => {
  const { type, props } = def;

  if (!type) return null;

  if (type === textType) return document.createTextNode(props.nodeValue);

  const node =
    def.type === 'svg' || parentNode.namespaceURI === svgNs
      ? document.createElementNS(svgNs, type)
      : document.createElement(type);
  updateNode(node, {}, props);
  return node;
};

const updateNode = (node, prev, next) => {
  if (node.nodeType === Node.TEXT_NODE) {
    node.nodeValue = next.nodeValue;
    return;
  }

  const isSvg = node.namespaceURI === svgNs;

  for (const key in prev) {
    if (key === 'children') continue;

    if (!(key in next)) {
      if (key === 'ref') prev.ref.current = null;
      else if (key === 'style') {
        for (const key in prev.style) node.style[key] = '';
      } else if (key.startsWith('on')) {
        node.removeEventListener(key.slice(2).toLowerCase(), prev[key]);
      } else if (!isSvg && key in node) node[key] = '';
      else node.removeAttribute(key === 'className' ? 'class' : key);
    }
  }

  for (const key in next) {
    if (key === 'children') continue;

    if (prev[key] !== next[key]) {
      if (key === 'ref') {
        if (prev.ref) prev.ref.current = null;
        next.ref.current = node;
      } else if (key === 'style') {
        if (prev.style) {
          for (const key in prev.style) {
            if (!(key in next.style)) node.style[key] = '';
          }
        }
        for (const key in next.style) {
          let value = next.style[key];
          if (typeof value === 'number') value += 'px';
          node.style[key] = next.style[key] ?? '';
        }
      } else if (key.startsWith('on')) {
        if (typeof prev[key] === 'function') {
          node.removeEventListener(key.slice(2).toLowerCase(), prev[key]);
        }
        node.addEventListener(key.slice(2).toLowerCase(), next[key]);
      } else if (!isSvg && key in node) node[key] = next[key] ?? '';
      else {
        const attr = key === 'className' ? 'class' : key;
        if (next[key] != null) node.setAttribute(attr, next[key]);
        else node.removeAttribute(attr);
      }
    }
  }
};

const remove = root => {
  let vnode = root;
  let parentNode;
  while (true) {
    vnode.deleted = true;
    parentNode ??= vnode.node;
    if (vnode.child) vnode = vnode.child;
    else {
      while (vnode) {
        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.before) {
              effect.before();
              effect.before = null;
            }
          }
        }

        if (parentNode && vnode.node === parentNode) {
          parentNode.remove();
          parentNode = null;
        }

        if (vnode === root) return;

        if (vnode.sibling) {
          vnode = vnode.sibling;
          break;
        }

        vnode = vnode.parent;
      }
    }
  }
};

const reconcile = (vnode, children) => {
  const defs = isEmpty(children)
    ? []
    : Array.isArray(children)
      ? children
      : [children];
  const parentNode = vnode.node ?? vnode.parentNode;
  const prevByKey = {};
  for (
    let i = 0, prevVnode = vnode.child;
    prevVnode;
    ++i, prevVnode = prevVnode.sibling
  ) {
    if (prevVnode.beforeUpdates) prevVnode.beforeUpdates.forEach(fn => fn());
    prevByKey[
      prevVnode.key == null ? `implicit:${i}` : `explicit:${prevVnode.key}`
    ] ??= prevVnode;
  }
  vnode.child = null;

  for (let i = 0, prevSibling = null; i < defs.length; ++i) {
    let def = defs[i];
    if (isEmpty(def)) def = emptyDef;
    else if (Array.isArray(def)) {
      def = { type: Fragment, props: { children: def } };
    } else if (typeof def !== 'object') {
      def = { type: textType, props: { nodeValue: def } };
    }
    const key = def.key == null ? `implicit:${i}` : `explicit:${def.key}`;
    let childVnode = prevByKey[key];
    if (childVnode && childVnode.type === def.type) {
      prevByKey[key] = null;
      childVnode.parent = vnode;
      childVnode.parentNode = parentNode;
      childVnode.sibling = null;
      if (childVnode.props === def.props) childVnode.shouldUpdate ??= false;
      if (childVnode.node && childVnode.shouldUpdate !== false) {
        updateNode(childVnode.node, childVnode.props, def.props);
      }
      childVnode.props = def.props;
    } else {
      childVnode = {
        contexts: vnode.contexts,
        child: null,
        deleted: false,
        effects: null,
        key: def.key,
        node:
          typeof def.type === 'function' ? null : createNode(def, parentNode),
        parent: vnode,
        parentNode,
        path: vnode.path.concat(i),
        props: def.props,
        queued: false,
        refs: null,
        shouldUpdate: null,
        sibling: null,
        type: def.type,
        updated: false
      };
    }
    if (i === 0) vnode.child = childVnode;
    else prevSibling.sibling = childVnode;
    prevSibling = childVnode;
  }

  for (const key in prevByKey) {
    const vnode = prevByKey[key];
    if (vnode) remove(vnode);
  }
};

const render = (def, node) =>
  update({ node, path: [], props: { children: def } });

let currentVnode = null;
let effectIndex = 0;
let refIndex = 0;

const useRef = initial => {
  currentVnode.refs ??= [];
  let ref = currentVnode.refs[refIndex++];
  if (ref) return ref;

  ref = { current: typeof initial === 'function' ? initial() : initial };
  currentVnode.refs.push(ref);
  return ref;
};

/**
 * @template {unknown} T
 * @param {T | () => T} initial
 * @returns {[T, <S extends T>(value: S | ((previous: T) => S)) => S]}
 */
const useState = initial => {
  const vnode = currentVnode;
  const { current } = useRef(() => [
    typeof initial === 'function' ? initial() : initial,
    value => {
      if (typeof value === 'function') value = value(current[0]);

      if (value !== current[0]) {
        current[0] = value;
        if (currentVnode !== vnode) queueUpdate(vnode);
      }

      return value;
    }
  ]);
  return current;
};

const depsChanged = (prev, deps) =>
  !prev ||
  prev.length !== deps.length ||
  deps.some((dep, i) => dep !== prev[i]);

const useEffect = (fn, deps) => {
  const vnode = currentVnode;
  vnode.effects ??= [];
  let effect = vnode.effects[effectIndex++];
  if (!effect) {
    effect = { before: null, after: null, deps: null };
    vnode.effects.push(effect);
  }

  if (depsChanged(effect.deps, deps)) {
    effect.after = () => {
      effect.before = fn();
    };
    effect.deps = deps;
  }
};

const useMemo = (fn, deps) => {
  if (!deps) throw new Error('A dependency array must be provided to useMemo');

  const ref = useRef({ value: null, deps });

  if (depsChanged(ref.current.deps, deps)) {
    ref.current.value = fn();
    ref.current.deps = deps;
  }
  return ref.current;
};

const useCallback = fn => {
  const ref = useRef();
  ref.current = fn;
  return useRef(
    () =>
      (...args) =>
        ref.current(...args)
  ).current;
};

const defaultIsEqual = (prev, next) => {
  for (const key in prev) if (prev[key] !== next[key]) return false;
  for (const key in next) if (!(key in prev)) return false;
  return true;
};

const memo =
  (Component, isEqual = defaultIsEqual) =>
  props => {
    const { current } = useRef({ props: null });
    if (!current.props || !isEqual(current.props, props)) current.props = props;
    return jsx(Component, current.props);
  };

const useContext = Context => {
  const vnode = currentVnode;
  const context = vnode.contexts?.get(Context);
  context?.vnodes.add(vnode);
  useEffect(() => () => context?.vnodes.delete(vnode), []);
  return context?.value;
};

const batchComparator = (a, b) => {
  for (let i = 0; i < a.path.length; ++i) {
    if (i === b.path.length) return 1;

    if (a.path[i] !== b.path[i]) return a.path[i] - b.path[i];
  }
  return -1;
};

let updateQueue = [];
const queueUpdate = vnode => {
  if (vnode.queued) return;

  if (updateQueue.length === 0) {
    requestAnimationFrame(() => {
      const batch = updateQueue.sort(batchComparator);
      updateQueue = [];
      for (const vnode of batch) {
        vnode.shouldUpdate = true;
        vnode.updated = false;
        vnode.queued = false;
      }
      for (const vnode of batch) {
        if (!vnode.deleted && !vnode.updated) update(vnode);
      }
    });
  }
  updateQueue.push(vnode);
  vnode.queued = true;
};

const update = root => {
  let vnode = root;
  const nodeStack = [root.prevSiblingNode ?? null];
  while (true) {
    vnode.prevSiblingNode = nodeStack.at(-1);
    if (vnode.parent) vnode.shouldUpdate ??= vnode.parent.shouldUpdate;
    if (vnode.shouldUpdate !== false) {
      currentVnode = vnode;
      effectIndex = 0;
      refIndex = 0;
      reconcile(
        vnode,
        typeof vnode.type === 'function'
          ? vnode.type(vnode.props)
          : vnode.props.children
      );
      currentVnode = null;
      effectIndex = 0;
      refIndex = 0;
      vnode.updated = true;
    }
    if (vnode.node) nodeStack[nodeStack.length - 1] = vnode.node;

    if (vnode.child) {
      if (vnode.node) nodeStack.push(null);
      vnode = vnode.child;
    } else {
      vnode.shouldUpdate = null;
      while (vnode) {
        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.after && effect.before) {
              effect.before();
              effect.before = null;
            }
          }
        }

        if (vnode.node) {
          if (vnode.prevSiblingNode) {
            if (vnode.prevSiblingNode.nextSibling !== vnode.node) {
              vnode.prevSiblingNode.after(vnode.node);
            }
          } else if (
            vnode.parentNode &&
            vnode.parentNode.firstChild !== vnode.node
          ) {
            vnode.parentNode.prepend(vnode.node);
          }
        }

        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.after) {
              effect.after();
              effect.after = null;
            }
          }
        }

        if (vnode === root) return;

        if (vnode.sibling) {
          vnode = vnode.sibling;
          break;
        }

        vnode = vnode.parent;
        if (vnode.node) nodeStack.pop();
      }
    }
  }
};

export {
  createContext,
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
  jsxsDEV,
  memo,
  render,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
};
