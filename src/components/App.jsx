import { useState, useEffect } from "react";
import css from './App.module.css';
import fetchImg from '../helper/Helper';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader"; 

const App = () => {

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [arrPictures, setArrPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  console.log(error);
  
  useEffect(() => {
    let isMounted = true;

    if (name) {
        const fetch = async () => {
        
      try {
        setIsLoading(true);
        const { totalHits, hits, } = await fetchImg(name, page,);
        const totalP = Math.round(totalHits / 12);
        const newArr = hits.map(({ id, largeImageURL, webformatURL, }) => {
          return { id, largeImageURL, webformatURL }
        });

        if (page === 1) {
          setArrPictures(newArr)
          setTotalPage(totalP)
        }
        else {
          setArrPictures(prevArr => [...prevArr, ...newArr]);
        };

        if (hits.length === 0) alert('Sorry, there are no images matching your search query. Please try again.');
      }

      catch (err) {
        setError(err.message);
        console.log(err);
      }

      finally {
        if(isMounted) setIsLoading(false);
      }
          
      }
      fetch();
    };
  }, [name, page,]);


  const onSubmit = (nameForm) => {
    setName(nameForm.toLowerCase().trim());
    setPage(1);
    setArrPictures([]);
  };


  const hadlerOnClick = () => {
    setPage(prev=> prev+ 1);
  };


  return (
    <div className={css.App} >
      <Searchbar onSubmit={onSubmit} />
        
      <ImageGallery
        arr={arrPictures}
        name={name}
      />

      {isLoading &&
        <Loader />
      }

      {(arrPictures.length > 0 && page !== totalPage) &&
        <Button
          onClick={hadlerOnClick}
          totalPage={totalPage}
          page={page}
        />}
    </div>);
};

export default App;