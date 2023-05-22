const MY_KEY = '35015448-c7fa8b01ad4ad6351d3127809';
const API = `https://pixabay.com/api/`;

    
const fetchImg = async (nameImg, page, ) => {
    const URL = `${API}?q=${nameImg}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        
    try {
        const res = await fetch(URL);
        return await res.json();
    } catch (error) {
        console.log(error.message);
    }
};

export default fetchImg;
