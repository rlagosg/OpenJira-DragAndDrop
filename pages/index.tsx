import React, { useContext} from 'react'
import { NextPage } from 'next'

import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';
import { checkDatabaseConnection } from '@/database';

const HomePage: NextPage = () => {

  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm ={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title = 'Pendientes' />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las tareas */}
              <NewEntry />
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm ={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>          
            <CardHeader title = 'En Progreso' />
            <CardContent>
              <EntryList status='in-progress'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm ={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title = 'Completados' />
            <CardContent>
              <EntryList status='finished'/>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;
