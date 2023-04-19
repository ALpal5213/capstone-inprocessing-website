import Details from "./Details";
import { GlobalContext } from '../../App';
import {  useContext } from 'react';

export const DetailsPage = () => {
    const { theme, setTheme, userLogin } = useContext(GlobalContext);
    // setTheme(userLogin.preferredTheme);
    return (
        // <div className={(theme === 'dark' ) ? 'dark-theme' : 'light-theme'}>
            <Details />
        // </div>
    )
}