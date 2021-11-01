import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState, useMemo } from 'react';
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
  // const queryParams = queryString.parse(location.search);

  // Bài 140: sử dụng useMemo , queryParams thay đổi khi location.sreach thay đổi
  // khi sử dụng back trên trình duyệt thì các params sẽ thay đổi
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // note: true => 'true', vì là chuỗi nên nó sẽ không nhận được kiểu bolean
    return {
      ...params,
      _limit: Number.parseInt(params._limit || 9),
      _page: Number.parseInt(params._page || 1),
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  // Bài 126: tạo state filters và pagination , state trong filters được khởi tạo tương tự trong Api
  // const [filters, setFilters] = useState({
  //   _limit: 9,
  //   _page: 1,
  //   _sort: 'salePrice:ASC',
  // });

  // Bài 139 : lấy queryParams từ sreach => truyền vào object filters
  // Bài 140: khi sử dụng queryParams bằng useMemo, thì mình sẽ ko sử dụng phần này nữa
  // const [filters, setFilters] = useState({
  //   ...queryParams,
  //   _limit: Number.parseInt(queryParams._limit || 9),
  //   _page: Number.parseInt(queryParams._page || 1),
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // });

  // các state trong pagination được khởi tạo tương tự trong Api
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  // Baì 139: tạo useEffect , dùng để push filters vào pathname
  // Bài 140: khi sử dụng queryParams bằng useMemo, thì mình sẽ ko sử dụng phần này nữa
  // todo : syns filters to Urls, chuyển object filers thành 1 chuỗi. history không thay đổi, chỉ filters thay đổi
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  // tạo UseEffect
  // Bài 126: mỗi khi filters thay đổi thì sẽ get api lại.
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
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
  }, [queryParams]);

  // Bài 126: handlePageChange
  const handlePageChange = (e, page) => {
    // setFilters((preFilters) => ({
    //   ...preFilters,
    //   _page: page,
    // }));

    // Bài 140: lúc này sẽ ko setFilters khi filters thay đổi nữa, mà chỉ push nó lên urls.
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  // Bài 128: handleSortChange
  const handleSortChange = (newSortValue) => {
    // setFilters((preFilters) => ({
    //   ...preFilters,
    //   _sort: newSortValue,
    // }));

    // Bài 140: lúc này sẽ ko setFilters khi filters thay đổi nữa, mà chỉ push nó lên urls.
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  // Bài 131: handleFilterChange , hàm này sẽ giữ lại các giá trị filter cũ và sẽ cộng thêm các filter mới.
  const handleFilterChange = (newFilters) => {
    // setFilters((preFilters) => ({
    //   ...preFilters,
    //   ...newFilters,
    // }));

    // Bài 140: lúc này sẽ ko setFilters khi filters thay đổi nữa, mà chỉ push nó lên urls.
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  // Bài 136:
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);

    // Bài 140: lúc này sẽ ko setFilters khi filters thay đổi nữa, mà chỉ push nó lên urls.
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {/* Bài 131: Lọc theo danh mục - component ProductFilters */}
              {/* Bài 140: thay đổi code cho phù hợp, lúc này không sử dụng filters nữa. thay vào queryParams */}
              {Loading ? (
                <FilterSkeletonList />
              ) : (
                <ProductFilters filters={queryParams} onChange={handleFilterChange} />
              )}
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {/* Bài 140: thay đổi code cho phù hợp, lúc này không sử dụng filters nữa. thay vào queryParams */}
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

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
