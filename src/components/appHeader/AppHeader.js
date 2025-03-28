import {Link} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>All posts</span>  
                </Link>
            </h1>
        </header>
    )
}

export default AppHeader;