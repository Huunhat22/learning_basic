import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import FilterSkeletonList from '../components/Filters/FilterSkeletonList';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

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

  // Bài 139: sử dụng hook history
  const history = useHistory();
  const location = useLocation();
  // chuyển 1 chuổi urls thành object => truyền vào filters
  const queryParams = queryString.parse(location.search);

  // Bài 126: tạo state filters và pagination , state trong filters được khởi tạo tương tự trong Api
  // const [filters, setFilters] = useState({
  //   _limit: 9,
  //   _page: 1,
  //   _sort: 'salePrice:ASC',
  // });

  // Bài 139 : lấy queryParams từ sreach => truyền vào object filters
  const [filters, setFilters] = useState({
    ...queryParams,
    _limit: Number.parseInt(queryParams._limit || 9),
    _page: Number.parseInt(queryParams._page || 1),
    _sort: queryParams._sort || 'salePrice:ASC',
  });

  // các state trong pagination được khởi tạo tương tự trong Api
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  // Baì 139: tạo useEffect , dùng để push filters vào pathname
  useEffect(() => {
    // todo : syns filters to Urls, chuyển object filers thành 1 chuỗi. history không thay đổi, chỉ filters thay đổi
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

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

  // Bài 126: handlePageChange
  const handlePageChange = (e, page) => {
    setFilters((preFilters) => ({
      ...preFilters,
      _page: page,
    }));
  };

  // Bài 128: handleSortChange
  const handleSortChange = (newSortValue) => {
    setFilters((preFilters) => ({
      ...preFilters,
      _sort: newSortValue,
    }));
  };

  // Bài 131: handleFilterChange , hàm này sẽ giữ lại các giá trị filter cũ và sẽ cộng thêm các filter mới.
  const handleFilterChange = (newFilters) => {
    setFilters((preFilters) => ({
      ...preFilters,
      ...newFilters,
    }));
  };

  // Bài 136:
  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {/* Bài 131: Lọc theo danh mục - component ProductFilters */}
              {Loading ? <FilterSkeletonList /> : <ProductFilters filters={filters} onChange={handleFilterChange} />}
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={setNewFilters} />

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
