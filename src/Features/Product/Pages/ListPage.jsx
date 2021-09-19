import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    paddingBottom: '30px',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  // Bài 121: tạo state ProductList và isloading
  const [productList, setProductList] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Bài 126: tạo state filters và pagination , state trong filters được khởi tạo tương tự trong Api
  const [filters, setFilters] = useState({
    _limit: 9,
    _page: 1,
  });

  // các state trong pagination được khởi tạo tương tự trong Api
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  // tạo UseEffect
  // Bài 126: mỗi khi filters thay đổi thì sẽ get api lại.
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        // sử dụng object destructuring
        setProductList(data);
        setPagination(pagination);

        console.log({ data, pagination });
        //console.log(response);
      } catch (error) {
        console.log('Failed to fetch product list ', error);
      }
      // sau khi load productlist xong sẽ tắt loading
      setLoading(false);
    })();
  }, [filters]);

  // Bài 126: handle onPageChange
  const handlePageChange = (e, page) => {
    setFilters((preFilters) => ({
      ...preFilters,
      _page: page,
    }));
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Colum left</Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {Loading ? <ProductSkeletonList /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
