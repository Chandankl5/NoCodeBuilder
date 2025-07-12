import { CanvasElement } from "../types/common";
import { original } from 'immer'

export function insertElement(
  element: CanvasElement,
  root: CanvasElement | null,
  targetElementId?: string,
  placement?: string
) {
  function insertNode(
    element: CanvasElement,
    root: CanvasElement | null,
    targetElementId?: string,
    placement?: string
  ) {
    const children = root?.children;

    if (!Array.isArray(children)) {
      return;
    }

    const targetNodeIdx =
      Array.isArray(children) && children.length > 0
        ? children.findIndex((child) => child.id === targetElementId)
        : -1;

    if (!targetElementId) {
      if (Array.isArray(children)) {
        children.push(element);
      }
    } else if (targetNodeIdx !== -1) {
      if (placement === "before") {
        children.splice(targetNodeIdx, 0, element);
      } else if (placement === "after") {
        children.splice(targetNodeIdx + 1, 0, element);
      }
    } else if (Array.isArray(children) && children.length > 0) {
      children.forEach((child) => {
        insertNode(child, root, targetElementId, placement);
      });
    }
  }

  if (root) {
    insertNode(element, root, targetElementId, placement);
  }

  return root;
}

function removeElement(element: CanvasElement, root: CanvasElement | null) {
  if (!root) return;

  if (Array.isArray(root.children)) {
    const elementToRemove = root.children.find(
      (child) => child.id === element.id
    );

    if (elementToRemove) {
      root.children = root.children.filter((child) => child.id !== element.id);
      return;
    } else {
      root.children.forEach((child) => {
        removeElement(element, child);
      });
    }
  }
}

export function updateElement(
  element: CanvasElement,
  root: CanvasElement | null,
  targetElementId?: string,
  placement?: string
) {
  removeElement(element, root);
  insertElement(element, root, targetElementId, placement);
}


export function getElementById(id: string, root: CanvasElement | null): CanvasElement | null {
  if (!root) return null;

  if (root.id === id) {
    return root;
  }

  if (Array.isArray(root.children)) {
    for (const child of root.children) {
      const result = getElementById(id, child);
      if (result) return result;
    }
  }

  return null;
}

export function updateElementProps(element: CanvasElement, root: CanvasElement | null, props: Record<string, any>) {
  const elementToUpdate = getElementById(element.id, root);
  if (elementToUpdate) {
    elementToUpdate.props = {
      ...elementToUpdate.props,
      ...props,
    };
  }
}

