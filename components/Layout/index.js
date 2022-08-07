import { makeStyles } from '@material-ui/styles';
import Head from 'next/head';

import TopBar from './TopBar';
import NavBar from './NavBar';

const useStyles = makeStyles({
    root: {
        background: '#f4f6f8',
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        width: '100vw'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        paddingLeft: 280,
        paddingRight: 100
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
    },
});

function Layout({ title, children }) {
    const classes = useStyles();
    return (
        <>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className={classes.root}>
          <TopBar />          
          <NavBar />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>{children}</div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Layout;