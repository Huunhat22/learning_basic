import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    listStyleType: 'none',
    margin: theme.spacing(2, 0),
    padding: 0,

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  {
    id: 3,
    getLabel: (filters) => `từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: (filters) => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  //   {
  //     id: 4,
  //     getLabel: (filters) => 'Danh mục',
  //     isActive: (filters) => true,
  //     isVisible: (filters) => true,
  //     isRemovable: true,
  //     onRemove: (filters) => {},
  //     onToggle: (filters) => {},
  //   },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyle();

  return (
    <Box component="ul" className={classes.root}>
      {/* mình sẽ lọc lại những filter nào đang visible và sau đó sẽ duyệt bằng hàm map */}
      {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            size="small"
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    // nếu remove được thì sẽ ko làm gì, ngược lại ko remove được là sẽ toggle
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    // nếu remove được thì sẽ remove, ngược lại không làm gì
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
