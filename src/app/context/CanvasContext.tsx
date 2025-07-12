import { createContext, useEffect } from "react";
import { CanvasElement, LayoutTree } from "../types/common";
import { defaultLayoutTree } from "../constants/LayoutTree";
import { Updater, useImmer } from "use-immer";
import { useSyncState } from "../hooks/useSyncState";

interface CanvasContextType {
  selectedElement: CanvasElement | null;
  layoutTree: LayoutTree;
  setLayoutTree: Updater<LayoutTree>;
  setSelectedElement: Updater<CanvasElement | null>;
}

export const CanvasContext = createContext<CanvasContextType>({
  selectedElement: null,
  layoutTree: defaultLayoutTree,
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

  useEffect(() => {
    syncState(layoutTree);
  }, [layoutTree]);

  return (
    <CanvasContext.Provider
      value={{
        selectedElement,
        layoutTree,
        setLayoutTree,
        setSelectedElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
