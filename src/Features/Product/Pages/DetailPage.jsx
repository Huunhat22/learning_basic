import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import ProducThumbnail from '../components/ProducThumbnail';

DetailPage.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root: {
    },
  
    left: {
      width: '400px',
      padding: theme.spacing(1.5),
      borderRight: `1px solid ${theme.palette.grey[300]}`
    },
  
    right: {
        padding: theme.spacing(1.5),
    },

  }));


function DetailPage(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container clas>
                        <Grid item className={classes.left}>
                            <ProducThumbnail product={{}}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            Detail Info
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;