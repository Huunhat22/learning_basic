import React from 'react';
import PropTypes from 'prop-types';
import './css/Album_style.css';

Album.propTypes = {
    album: PropTypes.object.isRequired,
};

Album.defaultProps = {

};

function Album({ album }) {
    return (
        <div className="album">
            <div className="album__thumbnail">
                <img src={album.thumbnail} alt={album.thumbnail} />
            </div>
            <div>
                <p className="album__title">{album.title}</p>
            </div>
        </div>
    );
}

export default Album;