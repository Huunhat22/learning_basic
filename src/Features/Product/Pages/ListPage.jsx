import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  // Bài 121: tạo state ProductList và isloading
  const [productList, setProductList] = useState([]);
  const [Loading, setLoading] = useState(true);

  // tạo UseEffect
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
        // sử dụng object destructuring
        setProductList(data);
        //console.log(response);
      } catch (error) {
        console.log('Failed to fetch product list ', error);
      }
      // sau khi load productlist xong sẽ tắt loading
      setLoading(false);
    })();
  }, []);
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Colum left</Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>{Loading ? <ProductSkeletonList /> : <ProductList data={productList} />}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
