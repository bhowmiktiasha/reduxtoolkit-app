import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function Hotel() {

  
  const hotels = useSelector(state => state.hotel.hotels);

  const {id} = useParams();

  const hotelToDisplay = hotels.find(hotel => hotel.id === id)

  return (
    <div className="hotel-list-container">  
        <div
          key={hotelToDisplay.id}
          className="hotel-list-item"
        >
          <img className="hotel-img" src={hotelToDisplay.image} />
          <div className="hotel-title">
            {hotelToDisplay.name}
          </div>
          <div className="hotel-price">
            ₹{hotelToDisplay.price}
          </div>
          {hotelToDisplay.freeBreakfast &&
            <div className="free-breakfast-tag">
              Free Breakfast
            </div>
          }
        </div>
      
    </div>
  );
}

export default Hotel;
