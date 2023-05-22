import { Component } from "react";
import css from './Searchbar.module.css';

class Searchbar extends Component{
    
    state = {
        name: '',
        disabled: true,
    };

    handleOnChange = (e) => {
        this.setState({
            name: e.currentTarget.value,
            disabled: false
        });
    };

    handleOnSubmit = (e) => {
        e.preventDefault()

        if (this.state.name.trim() === "") {
            return alert("Please, enter a name for the image :)")
        }

        this.props.onSubmit(this.state.name);
        this.setState({
            name: '',
            disabled: true,
        });
    };

    render() {
        return (
            <>
                <header className={css.Searchbar}>
                    <form
                        className={css.SearchForm}
                    onSubmit={this.handleOnSubmit}>
                        <button type="submit"
                            className={css.SearchFormButton}
                            disabled={this.state.disabled}>
                            <span className={css.SearchFormButtonLabel}>Search</span>
                        </button>

                        <input
                            onChange={this.handleOnChange}
                            className={css.SearchFormInput}
                            value={this.state.name}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </form>
                </header>
            </>
        );
    }
}; 
export default Searchbar;

