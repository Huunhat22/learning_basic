import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

ListCart.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root:{

    },

    left: {
        flex: '1 1 0'
    },
    
    right: {
        width: '350px',
    }

}));

function ListCart(props) {
    const classes = useStyles();
    return (
        <Box>
            <Container>
                <Typography variant='h5'>Cart List</Typography>
                <Grid container spacing={2}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            Cart item
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            total
                            {/* Bài 159: lấy ra tổng số tiền của giỏ hàng */}
                            {/* const totalCart = useSelector(cartTotalSelector); */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListCart;