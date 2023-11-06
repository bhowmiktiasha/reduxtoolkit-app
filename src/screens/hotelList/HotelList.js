import { useCallback, useEffect, useState } from 'react';
import './HotelList.css';
import HotelApi from '../../api/HotelApi';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels } from '../../store/HotelSlice';
import { useNavigate } from 'react-router';

function HotelList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const hotels = useSelector(state => state.hotel.hotels);

  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isFavoritesSelected, setIsFavoritesSelected] = useState(false);
  const [isSortSelected, setIsSortSelected] = useState(false);

  // get hotel list
  const getHotels = useCallback(async () => {
    try {
      const response = await HotelApi.getHotels();

      if (response.status !== 200) {
        alert("An error occurred");
        console.error("Error while fetching hotels", response?.data);
        setIsLoading(false);
        return;
      }
  
      console.log("hotels", response.data);
      dispatch(setHotels(response.data))
    } catch (error) {
      alert("An error occurred");
      console.error("Error while fetching hotels", error);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getHotels();
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFavoritesClick = (e) => {
    setIsFavoritesSelected(!isFavoritesSelected);
  };

  const handleSortClick = (e) => {
    setIsSortSelected(!isSortSelected);
  };

  const handleHotelClick = (id) => {
    navigate(`/${id}`);
  };

  let hotelsToDisplay = hotels.filter(hotel => hotel.name?.toLowerCase().includes(searchText?.toLowerCase()))

  if (isSortSelected) {
    hotelsToDisplay = hotelsToDisplay.sort((hotel1, hotel2) => hotel1.price - hotel2.price)
  }

  return (
    isLoading ?
    "...loading"
    :
    <div className="hotel-list-container">
      <input
        className="hotel-list-search"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <div className='hotlel-list-filter-container'>
      <div
        className={isFavoritesSelected ? 'hotel-list-filter-selected' : 'hotel-list-filter'}
        onClick={handleFavoritesClick}
      >
        Favorites
      </div>
      <div
        className={isSortSelected ? 'hotel-list-filter-selected' : 'hotel-list-filter'}
        onClick={handleSortClick}
      >
        Sort by Price
      </div>
    </div>
      {hotelsToDisplay.map(hotelToDisplay =>
        <div
          key={hotelToDisplay.id}
          className="hotel-list-item"
          onClick={() => handleHotelClick(hotelToDisplay.id)}
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
      )}
    </div>
  );
}

export default HotelList;
