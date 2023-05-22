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
  const [perPage, setPerPage] = useState(12);
  const [totalPage, setTotalPage] = useState(null);
  const [arrPictures, setArrPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {

    if (name || page) {

      try {
        setIsLoading(true);
        const { totalHits, hits, } = fetchImg(name, page, perPage);
        const totalP = Math.round(totalHits / perPage);
        const newArr = hits.map(({ id, largeImageURL, webformatURL, }) => {
          return { id, largeImageURL, webformatURL }
        });

        if (page === 1) {
          setArrPictures(newArr)
          setTotalPage(totalP)
        }
        else {
          setArrPictures([...arrPictures, newArr])
        };

        if (hits.length === 0) alert('Sorry, there are no images matching your search query. Please try again.');
      }

      catch (error) {
        setError(error.message);
      }

      finally {
        setIsLoading(false);
      }
    }
  }, [name, page, arrPictures, perPage]);



  const onSubmit = (nameForm) => {
    setName(nameForm.toLowerCase().trim());
    setPage(1);
    setArrPictures([]);
  };


  const hadlerOnClick = () => {
    setPage(page + 1);
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


// class App extends Component {

//   state = {
//     name: '',
//     page: 1,
//     perPage: 12,
//     totalPage: null,
//     arrPictures: [],
//     isLoading: false,
//     error: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const {name, page, perPage} = this.state;
        
//     if (prevState.name !== name || prevState.page !== page ) {
//       try {
//         this.setState({ isLoading: true });
//         const { totalHits, hits, } = await fetchImg(name, page, perPage);
//         const totalPage = Math.round(totalHits / perPage);

//         const newArr = hits.map(({ id, largeImageURL, webformatURL, }) => {
//           return { id, largeImageURL, webformatURL }
//         });

//         if (page === 1) {
//         this.setState({
//           arrPictures: newArr,
//           totalPage,
//         });
//         } else {
//         this.setState(prevState => ({
//           arrPictures: [...prevState.arrPictures, ...newArr],
//         }));
//         };

//         if (hits.length === 0) {
//           alert(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//         }
//       }
//       catch (error) {
//         this.setState({
//           error: error.message,
//         });
//       }
//       finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   };


//   onSubmit = (nameForm) => {
//     this.setState({
//       name: nameForm.toLowerCase().trim(),
//       page: 1,
//       arrPictures: []
//     })
//   };


//   hadlerOnClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }))
//   };


//   render() {
//     const {name, arrPictures, isLoading, totalPage, page } = this.state;
//     console.log(arrPictures)
//     return (
//       <div className={css.App} >
//         <Searchbar onSubmit={this.onSubmit} />
        
//         <ImageGallery
//           arr={arrPictures}
//           name={name}
//         />

//         {isLoading &&
//           <Loader />
//         }

//         {(arrPictures.length > 0 && page !== totalPage) &&
//           <Button
//           onClick={this.hadlerOnClick}
//           totalPage={totalPage}
//           page={page}
//           />}
//       </div>
//     )
//   }
// }

export default App;