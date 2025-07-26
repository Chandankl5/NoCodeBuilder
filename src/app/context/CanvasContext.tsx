import { createContext, useEffect, useState } from "react";
import { CanvasElement, LayoutTree } from "../types/common";
import { defaultLayoutTree } from "../constants/LayoutTree";
import { Updater, useImmer } from "use-immer";
import { useSyncState } from "../hooks/useSyncState";

interface CanvasContextType {
  selectedElement: CanvasElement | null;
  layoutTree: LayoutTree;
  isLayoutLoading: boolean;
  setIsLayoutLoading: (isLayoutLoading: boolean) => void;
  setLayoutTree: Updater<LayoutTree>;
  setSelectedElement: Updater<CanvasElement | null>;
}

export const CanvasContext = createContext<CanvasContextType>({
  selectedElement: null,
  layoutTree: defaultLayoutTree,
  isLayoutLoading: false,
  setIsLayoutLoading: () => {},
  setLayoutTree: () => {},
  setSelectedElement: () => {},
});

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElement, setSelectedElement] = useImmer<CanvasElement | null>(
    null
  );

  const [initialLayoutTree, syncState] = useSyncState<LayoutTree>({
    key: "layoutTree",
    defaultState: defaultLayoutTree,
  });

  const [layoutTree, setLayoutTree] = useImmer<LayoutTree>(initialLayoutTree);

  const [isLayoutLoading, setLayoutLoading] = useState(false);

  const setIsLayoutLoading = (isLayoutLoading: boolean) => {
    setLayoutLoading(isLayoutLoading);
  };

  useEffect(() => {
    syncState(layoutTree);
  }, [layoutTree]);

  return (
    <CanvasContext.Provider
      value={{
        selectedElement,
        layoutTree,
        isLayoutLoading,
        setIsLayoutLoading,
        setLayoutTree,
        setSelectedElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
