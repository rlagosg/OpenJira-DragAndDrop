import React, { useContext, useState } from 'react'

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';

const menuItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {

    const { closeSideMenu, sidemenuOpen  } = useContext( UIContext);

  return (
    <Drawer
        anchor='left'
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
    >

        <Box sx={{ width: 250 }}>
            <Box sx={{ padding: '5px 10px'}}>
                
                <IconButton
                size='large'
                edge='start'
                onClick={ closeSideMenu }
                >                    
                    <Typography variant='h4'>Menu</Typography>
                </IconButton>

            </Box>

            <List>
            {
                menuItems.map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))
            }
            </List>

            <Divider/>            

            <List>
            {
                menuItems.map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))
            }
            </List>


        </Box>


    </Drawer>
  )
}