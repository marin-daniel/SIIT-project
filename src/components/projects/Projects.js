import React from 'react';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
//import "react-image-gallery/styles/css/image-gallery.css";


// import AliceCarousel from 'react-alice-carousel';

// import { Carousel } from 'react-responsive-carousel';
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

const images = [
    {
        original: './images/clocks/DSC_0009.jpg',
        thumbnail: './images/clocks/DSC_0009.jpg',
    },
    {
        original: './images/clocks/DSC_0011.jpg',
        thumbnail: './images/clocks/DSC_0011.jpg',
    },
    {
        original: './images/clocks/DSC_0012.jpg',
        thumbnail: './images/clocks/DSC_0012.jpg',
    },
    {
        original: './images/clocks/DSC_0014.jpg',
        thumbnail: './images/clocks/DSC_0014.jpg',
    },
    {
        original: './images/clocks/DSC_0015.jpg',
        thumbnail: './images/clocks/DSC_0015.jpg',
    },
    {
        original: './images/clocks/DSC_0016.jpg',
        thumbnail: './images/clocks/DSC_0016.jpg',
    },
    {
        original: './images/clocks/DSC_0017.jpg',
        thumbnail: './images/clocks/DSC_0017.jpg',
    },
    {
        original: './images/clocks/DSC_0018.jpg',
        thumbnail: './images/clocks/DSC_0018.jpg',
    },
    {
        original: './images/clocks/DSC_1540.jpg',
        thumbnail: './images/clocks/DSC_1540.jpg',
    },
    {
        original: './images/clocks/DSC_1541.jpg',
        thumbnail: './images/clocks/DSC_1541.jpg',
    },
    {
        original: './images/clocks/DSC_1538.jpg',
        thumbnail: './images/clocks/DSC_1538.jpg',
    },
    {
        original: './images/clocks/DSC_1539.jpg',
        thumbnail: './images/clocks/DSC_1539.jpg',
    },
    {
        original: './images/clocks/DSC_1542.jpg',
        thumbnail: './images/clocks/DSC_1542.jpg',
    },
    {
        original: './images/clocks/DSC_1548.jpg',
        thumbnail: './images/clocks/DSC_1548.jpg',
    },
    {
        original: './images/clocks/DSC_1553.jpg',
        thumbnail: './images/clocks/DSC_1553.jpg',
    },
    {
        original: './images/clocks/DSC_1554.jpg',
        thumbnail: './images/clocks/DSC_1554.jpg',
    },
    {
        original: './images/clocks/DSC_1555.jpg',
        thumbnail: './images/clocks/DSC_1555.jpg',
    },
    {
        original: './images/clocks/DSC_1556.jpg',
        thumbnail: './images/clocks/DSC_1556.jpg',
    },
    {
        original: './images/clocks/DSC_1558.jpg',
        thumbnail: './images/clocks/DSC_1558.jpg',
    },
    {
        original: './images/clocks/DSC_1559.jpg',
        thumbnail: './images/clocks/DSC_1559.jpg',
    },
    {
        original: './images/clocks/DSC_1560.jpg',
        thumbnail: './images/clocks/DSC_1560.jpg',
    },
    {
        original: './images/clocks/DSC_1561.jpg',
        thumbnail: './images/clocks/DSC_1561.jpg',
    },
    {
        original: './images/clocks/DSC_1562.jpg',
        thumbnail: './images/clocks/DSC_1562.jpg',
    },
    {
        original: './images/clocks/DSC_1563.jpg',
        thumbnail: './images/clocks/DSC_1563.jpg',
    },
    {
        original: './images/clocks/DSC_1564.jpg',
        thumbnail: './images/clocks/DSC_1564.jpg',
    },
    {
        original: './images/clocks/DSC_1565.jpg',
        thumbnail: './images/clocks/DSC_1565.jpg',
    },
    {
        original: './images/clocks/DSC_1570.jpg',
        thumbnail: './images/clocks/DSC_1570.jpg',
    },
    {
        original: './images/clocks/DSC_1571.jpg',
        thumbnail: './images/clocks/DSC_1571.jpg',
    },
    {
        original: './images/clocks/DSC_1572.jpg',
        thumbnail: './images/clocks/DSC_1572.jpg',
    },
    {
        original: './images/clocks/DSC_1573.jpg',
        thumbnail: './images/clocks/DSC_1573.jpg',
    },
    {
        original: './images/clocks/DSC_1574.jpg',
        thumbnail: './images/clocks/DSC_1574.jpg',
    },
    {
        original: './images/clocks/DSC_1575.jpg',
        thumbnail: './images/clocks/DSC_1575.jpg',
    },
    {
        original: './images/clocks/DSC_1576.jpg',
        thumbnail: './images/clocks/DSC_1576.jpg',
    },
    {
        original: './images/clocks/DSC_1577.jpg',
        thumbnail: './images/clocks/DSC_1577.jpg',
    },
    {
        original: './images/clocks/DSC_1579.jpg',
        thumbnail: './images/clocks/DSC_1579.jpg',
    },
    {
        original: './images/clocks/DSC_1580.jpg',
        thumbnail: './images/clocks/DSC_1580.jpg',
    },
    {
        original: './images/clocks/DSC_1581.jpg',
        thumbnail: './images/clocks/DSC_1581.jpg',
    },
    {
        original: './images/clocks/DSC_1582.jpg',
        thumbnail: './images/clocks/DSC_1582.jpg',
    },


    {
        original: './images/clocks/DSC_1583.jpg',
        thumbnail: './images/clocks/DSC_1583.jpg',
    },
    {
        original: './images/clocks/DSC_1584.jpg',
        thumbnail: './images/clocks/DSC_1584.jpg',
    },
    {
        original: './images/clocks/DSC_1585.jpg',
        thumbnail: './images/clocks/DSC_1585.jpg',
    },
    {
        original: './images/clocks/DSC_1586.jpg',
        thumbnail: './images/clocks/DSC_1586.jpg',
    },
    {
        original: './images/clocks/DSC_1587.jpg',
        thumbnail: './images/clocks/DSC_1587.jpg',
    },
    {
        original: './images/clocks/DSC_1588.jpg',
        thumbnail: './images/clocks/DSC_1588.jpg',
    },
    {
        original: './images/clocks/DSC_1590.jpg',
        thumbnail: './images/clocks/DSC_1590.jpg',
    },
    {
        original: './images/clocks/DSC_1592.jpg',
        thumbnail: './images/clocks/DSC_1592.jpg',
    }
  ];

function Projects(){
       
    return( 
        <div className='project-page'>
           <ImageGallery items={images} /> 
        </div>
          
       
   
    )
}

export default Projects;


