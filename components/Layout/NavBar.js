
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import {
  Hidden,
  Drawer,
  Box,
  List,  
  ListItemIcon,
  ListItemText,  
  ListItemButton,  
  Divider  
} from "@mui/material";

import { Home, Whatshot, Subscriptions } from "@mui/icons-material";
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
  },
}));



function NavBar() {
  const classes = useStyles();
  const router = useRouter();

  const primaryMenu = [
    { id: 1, label: 'Início', path: '/', icon: Home },
    { id: 2, label: 'Ações', path: '/acoes', icon: Whatshot },
    { id: 3, label: 'Fundo Imobiliário', path: '/fundo-imobiliario', icon: Whatshot },
    { id: 4, label: 'BDR', path: '/bdr', icon: Whatshot },    
    { id: 5, label: 'Extrato', path: '/extrato', icon: Whatshot },
    { id: 6, label: 'Parametros', path: '/parametro', icon: Whatshot },
    { id: 7, label: 'Uploads', path: '/uploads', icon: Whatshot },
    { id: 8, label: 'Ativos', path: '/ativos', icon: Whatshot },
  ];

  const isSelected = (item) => router.pathname === item.path;

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {primaryMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.path} passHref  key={item.id}>
              <ListItemButton
                key={item.id}
                button
                classes={{ root: classes.listItem }}
                selected={isSelected(item)}
              >
                <ListItemIcon >
                  <Icon style={{ color: isSelected(item) && '#f44336' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.listItemText,
                  }}
                  primary={item.label}
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  );
}

export default NavBar;