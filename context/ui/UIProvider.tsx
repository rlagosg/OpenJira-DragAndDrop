import React, { FC, ReactNode, useReducer} from 'react'
import { UIContext, uiReducer } from '.'

export interface UIState {
    sidemenuOpen : boolean,
    isAdding     : boolean,
    isDragging   : boolean
}

interface ProviderProps{
    children: ReactNode
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen : false,
    isAdding     : false,
    isDragging   : false
}

export const UIProvider:FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () =>{
        dispatch({type:'UI - Open Sidebar'})
    }

    const closeSideMenu = () =>{
        dispatch({type:'UI - Close Sidebar'})
    }

    const isAddingEntry = ( isAdding: boolean ) => {
        dispatch({type: 'UI - Set isAddingEntry', payload: isAdding })
    }

    const startDragging = () => {
        dispatch({type:'UI - Start Dragging'});    
    }

    const endDragging = () => {
        dispatch({type:'UI - End Dragging'});        
    }

  return (
    <UIContext.Provider value={{ 
        ...state, 
        closeSideMenu, 
        openSideMenu,
        isAddingEntry,
        startDragging,
        endDragging
    }}>
        { children }
    </UIContext.Provider>
  )
}




