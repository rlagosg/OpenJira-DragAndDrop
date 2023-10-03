import { createContext } from "react";

interface ContextProps {
    sidemenuOpen  : boolean;
    openSideMenu  : () => void;
    closeSideMenu : () => void;
    
    isAdding      : boolean;
    isAddingEntry : ( isAdding: boolean ) => void;

    isDragging    : boolean;
    startDragging : () => void;
    endDragging   : () => void;
}

export const UIContext = createContext({ } as ContextProps)
