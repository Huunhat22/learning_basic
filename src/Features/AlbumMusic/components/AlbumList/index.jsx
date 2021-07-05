import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album';
import './css/Albumlist_style.css';

AlbumList.propTypes = {
    albumlist: PropTypes.array.isRequired,
};

AlbumList.defaultProps = {

};

function AlbumList({ albumlist }) {
    return (
        <ul className="albumlist">
            {albumlist.map((item, index) => (
                <li key={item.id}>
                    <Album album={item} />
                </li>
            ))}

        </ul>
    );
}

export default AlbumList;