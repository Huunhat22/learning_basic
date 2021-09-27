import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Menu } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { array } from 'yup/lib/locale';

FilterSkeletonList.propTypes = {
    length: PropTypes.number,
};

FilterSkeletonList.defaultProps = {
    length: 6,
}

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)

    },
    menu: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        '& > li': {
            marginTop: theme.spacing(1),
        }
    }
}))

function FilterSkeletonList({ length }) {
    const classes = useStyle();
    return (
        <Box className={classes.root} minHeight="202px">
            <Skeleton variant="subtitle2" />

            <ul className={classes.menu}>
                {Array.from(new Array(length)).map((x, index) => (
                    <li key={index} variant="body2">
                        <Skeleton />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterSkeletonList;