const CarouselItem = ({item}) => {
    return ( 
        <div className="carousel-item">
            <img src={item.image.default} alt="" className="carousel-img" />
        </div>
     );
}
 
export default CarouselItem;