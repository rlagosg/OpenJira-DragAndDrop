import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    entries: Entry[];
    addNewEntry: ( descripcion:string ) => void;
    updateEntry: ( entry: Entry, showSnackbar: boolean ) => void;
}

export const EntriesContext = createContext({ } as ContextProps);

/*
debes crear:
1- index.ts
1- EntriesContex.tsx
2- EntriesProvider.tsx
3- entriesReducuer.ts
*/