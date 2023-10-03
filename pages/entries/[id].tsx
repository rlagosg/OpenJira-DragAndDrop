import React, { useState, ChangeEvent, useMemo, FC, useContext } from 'react'
import { GetServerSideProps } from 'next'

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl,FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { isValidObjectId } from 'mongoose';

import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { getEntryById }  from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props{
    entry: Entry
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext( EntriesContext );

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const onInputValueChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    }

    const onStatusChange = ( event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);        
    }

    const onSave = () => {

        if( inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry ,
            description : inputValue,
            status
        }

        updateEntry(updatedEntry, true);
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2}}
        >
            <Grid item xs={ 12 } sm = { 8 } md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow(entry.createAt)}`}
                    />

                    <CardContent>
                        <TextField
                            sx={{ marginTop: 2, marginBottom: 1}}
                            fullWidth 
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label = "Nueva Entrada"
                            value={inputValue}
                            onChange={onInputValueChange}
                            helperText={ isNotValid && 'Ingresa un valor' }
                            onBlur={()=> setTouched(true)}
                            error = { isNotValid }
                        />
                        <FormControl>
                            <FormLabel>
                                Estado:
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={status}   
                                onChange={ onStatusChange }                            
                            >
                                {
                                    validStatus.map((opcion) => (
                                        <FormControlLabel
                                        key={opcion} value={opcion} control={<Radio />} label={ capitalize(opcion)} />
                                    ))
                                }

                                <FormControlLabel
                                value="disabled"
                                disabled
                                control={<Radio />}
                                label="other"
                                />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SportsEsportsOutlinedIcon/>}
                            variant='contained'
                            fullWidth
                            onClick={ onSave }
                            disabled = { inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>

        <IconButton
            sx={{
                position:'fixed', bottom: '30', right:30, backgroundColor: 'text.secondary'
            }}
        >
            <DeleteOutlineOutlinedIcon/>
        </IconButton>

    </Layout>
  )
}

export default EntryPage;

//SSP (SERVER SIDE PROPS): nos sirve para tomar acciones antes de que se dibuje la pagina,
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };
    const entry = await getEntryById(id);

    if( !entry ){
        return {
            redirect: {
               destination:"/",
               permanent: false
            }
        }
    }

    return {
        props: {
           entry
        }
    }
}