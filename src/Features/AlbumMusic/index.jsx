import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';
AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {

    const albumlist = [
        {
            id : 1,
            title : 'Top 100 bài nhạc trẻ hay nhất',
            thumbnail : 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/c/e/7/dce7d09905fd4a7a281125ca2a34fa3a.jpg' 
        },
        {
            id : 2,
            title : 'Top 100 bài nhạc pop âu mỹ hay nhất',
            thumbnail : 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/5/4/7/95473f42319ac6c5e4934ea446534a86.jpg' 
        },
        {
            id : 3,
            title : 'Top 100 bài nhạc trữ tình hay nhất',
            thumbnail : 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/5/f/c/c5fc615c43215c6b72676f42767855ee.jpg' 
        },
        {
            id : 4,
            title : 'Top 100 bài nhạc trẻ hay nhất',
            thumbnail : 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/9/8/7/f987690e18af09d221abd9c0aab7a44d.jpg' 
        },
    ];

    return (
        <div>
            <AlbumList albumlist = {albumlist}/>
        </div>
    );
}

export default AlbumFeature;