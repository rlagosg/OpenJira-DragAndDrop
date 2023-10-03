import { Button, Box, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext( EntriesContext );
    const { isAdding, isAddingEntry } = useContext( UIContext );
    
    const onTextFieldChane = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;     
        addNewEntry(inputValue);

        isAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2}}>
        {
            isAdding 
            ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1}}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label = 'Nueva entrada'
                        error = { inputValue.length <= 0 && touched }
                        value={inputValue}
                        onChange={onTextFieldChane}
                        helperText = { inputValue.length <= 0 && touched && 'Ingrese un valor'}
                        onBlur={ () => setTouched(true)}
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button 
                            variant='text'                 
                            endIcon = { <CancelOutlinedIcon/> }
                            onClick={ () => isAddingEntry(false)}
                            >
                            Cancelar
                        </Button>
                        <Button 
                            variant='outlined' 
                            color='secondary'
                            endIcon = { <SaveOutlinedIcon/> }
                            onClick={ onSave }
                            >
                            Guardar
                        </Button>
                    </Box>
                </>

            ) 
            : (
                <Button
                    startIcon = { <AddCircleOutlinedIcon/>}
                    fullWidth
                    variant='outlined'
                    onClick={ () => isAddingEntry(true) }
                >
                    Nuevo
                </Button>
            )

        }

        

        

    </Box>
  )
}
