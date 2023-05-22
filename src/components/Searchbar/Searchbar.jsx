import { useState } from "react";
import css from './Searchbar.module.css';

const Searchbar = ({onSubmit})=> {

    const [name, setName] = useState('');
    const [disabled, setDisable] = useState(true);

    const handleOnChange = (e) => {
        setName(e.currentTarget.value);
        setDisable(false);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (name.trim() === "") {
            return alert("Please, enter a name for the image :)")
        }

        onSubmit(name);
        setName('');
        setDisable(true);
    };

    return (
            <header className={css.Searchbar}>
                <form
                    className={css.SearchForm}
                    onSubmit={handleOnSubmit}>
                    <button type="submit"
                        className={css.SearchFormButton}
                        disabled={disabled}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        onChange={handleOnChange}
                        className={css.SearchFormInput}
                        value={name}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
    );
}; 

export default Searchbar;

