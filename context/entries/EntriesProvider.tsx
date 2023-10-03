import { FC, ReactNode, useEffect, useReducer } from 'react'

import { useSnackbar } from 'notistack';


import { EntriesContext, entriesReducer } from '.'
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: Entry[]
}

interface ProviderProps{
    children: ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [ ]
};

export const EntriesProvider:FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const updateEntry =  async ( {_id, description, status}: Entry, showSnackbar = false ) => {

        try {

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
    
            dispatch({ type: 'Entries - Update-Entry', payload: data});

            if(showSnackbar){
                enqueueSnackbar('Entrada Actualzada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }

            
        } catch (error) {
            console.log( error);            
        }

    }

    const addNewEntry = async ( description:string ) =>{

        const { data } = await entriesApi.post<Entry>('/entries', { description });

        dispatch({ type: 'Entries - Add-Entry', payload: data });        
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: 'Entries - Refresh-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    return (
    <EntriesContext.Provider value={{ 
        ...state,
        addNewEntry,
        updateEntry
     }}>
        { children }
    </EntriesContext.Provider>
    )
}
