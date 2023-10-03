import React, { DragEvent, FC, useContext, useMemo } from 'react'

import { Paper, List } from '@mui/material'

import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'
import { EntryStatus } from '@/interfaces'
import styles from './EntryList.module.css';
import { EntryCard } from './'

interface Props{
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

   const { entries, updateEntry } = useContext( EntriesContext );
   const { isDragging, endDragging } = useContext( UIContext );

   const entriesByStatus = useMemo( ()=> entries.filter( e => e.status === status), [entries]);

   const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find( e => e._id === id)!;
        entry.status = status;
        updateEntry( entry );
        endDragging();
   }

   const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
   }

  return (
    <div
        onDrop={ onDropEntry }
        onDragOver={ allowDrop }
        className={isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ 
            height: 'calc(100vh - 180px)', 
            overflow: 'scroll',
            backgroundColor: 'transparent',
            padding: '1px 5px',
            '&::-webkit-scrollbar': { display: 'none' },
        }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
                {
                    entriesByStatus.map( (e) => (<EntryCard key={e._id} entry={e}/>) )
                }
            </List>
        </Paper>
    </div>
  )
}