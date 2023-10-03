import React, { DragEvent, FC, useContext } from 'react'

import { Card, CardActionArea, Typography, CardActions } from '@mui/material'
import { Entry } from '@/interfaces'
import { UIContext } from '@/context/ui'
import { useRouter } from 'next/router'
import { getFormatDistanceToNow } from '@/utils/dateFunctions'

interface Props{
  entry: Entry
}  

export const EntryCard: FC<Props> = ({ entry }) => {

  const { endDragging, startDragging } = useContext( UIContext );

  const route  = useRouter()

  const onDragStart = ( event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    route.push(`/entries/${entry._id}`)
  }

  return (
    <Card
        onClick= { onClick }
        sx={{ marginBottom: 1}}
        draggable
        onDragStart = { onDragStart }
        onDragEnd = { onDragEnd }
    >
        <CardActionArea>
            
            
            <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
            

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
            <Typography variant='body2' sx={{ whiteSpace: 'pre-line' }}>creado hace { getFormatDistanceToNow( entry.createAt)} minutos</Typography>
            </CardActions>

        </CardActionArea>
    </Card>
  )
}

