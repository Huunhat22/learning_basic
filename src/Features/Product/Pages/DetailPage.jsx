import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCardForm from '../components/AddToCardForm';
import ProducThumbnail from '../components/ProducThumbnail';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import useProductDetail from '../hook/useProductDetail';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';

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
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },

    progress:{
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
    }
  }));


function DetailPage(props) {

    const classes = useStyles();

    // const match = useRouteMatch();
    // console.log({match});
    
    // Bài 151: thêm url sử dụng RouteMatch
    const { params :{productId},url} = useRouteMatch();

    // Bài 145: Tạo 1 custom hook thể lấy dữ liệu
    const {product, loading} = useProductDetail(productId);

    if(loading){
        return <Box className={classes.progress}>
                    {/* Bài 152: thêm LinearProgress khi fetch data */}
                    <LinearProgress  color="secondary"/>
                </Box>
    }

    // Bài 148: Handle Add To Card Form Submit
    const HandleAddToCardForm = (formValues) =>{
        console.log('Fomr Submit',formValues);
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
                            <ProductInfo product={product}/>
                            <AddToCardForm onSubmit={HandleAddToCardForm}/>
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />

                {/* Bài 151: render nội dung theo link, tại một thời điểm thì chỉ match 1 link thì sử dụng switch -> route */}
                <Switch>
                    <Route path={url} exact>
                        <ProductDescription  product={product}/>
                    </Route>

                    <Route path={`${url}/additional`} exact component={ProductAdditional}></Route>
                    <Route path={`${url}/reviews`} exact component={ProductReviews}></Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;