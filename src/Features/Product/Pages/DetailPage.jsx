import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';
import ProducThumbnail from '../components/ProducThumbnail';
import useProductDetail from '../hook/useProductDetail';

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

    // const match = useRouteMatch();
    // console.log({match});

    const { params :{productId},} = useRouteMatch();

    // Bài 145: Tạo 1 custom hook thể lấy dữ liệu
    const {product, loading} = useProductDetail(productId);

    if(loading){
        return <Box>
                    Loading
                </Box>
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProducThumbnail product={product}/>
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