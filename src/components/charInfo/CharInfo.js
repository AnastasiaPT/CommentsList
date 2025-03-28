import { Component } from 'react';
import { Navigate } from 'react-router';
import PostsService from '../../services/PostService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { getCommentsPageRoute } from '../lib/routers';
import './charInfo.scss';

class CharInfo extends Component {

    state = {
        charData: [],
        comments: [],
        loading: false,
        error: false,
        navigateToComm: false
    }

    postsService = new PostsService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if (this.props.charData.id !== prevProps.charData.id) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charData} = this.props;
        if (!charData) {
            return;
        }

        this.setState({
            charData
        })
        this.onCharLoading();

        this.postsService
            .getCharacterComments(charData.id) 
            .then(this.onCharCommentsLoaded)
            .catch(this.onError);   
           
    
        
    }

    onCharCommentsLoaded = (commentsList) => {
        this.setState({
            comments: commentsList, 
            loading: false
        })
    }   
   
    onCharLoading = () => {
        this.setState({
            loading: true          
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onNavigateToComm = () => {
        this.setState({
            navigateToComm: true          
        })
    }

     View = () => {
        const {charData, comments} = this.state;
        const {title, body} = charData; 
        
        const items =  comments.filter((item, index) => (index<3)).map(item=>{
             return (
                <li className="char__item_info"  key={item.id}>
                    <div className="char__comments">{item.body}</div>
                </li>
            )
        }); 
        
        return (
            <div className="char__info">
                <div className="char__basics">
                    <div>
                        <div className="char__info-name">{title}</div>
                    </div>
                </div>
                <div className="char__descr">
                    {body}
                </div>
                <div className="char__tesis">Comments : </div>
                 <ul >
                   {items}
                </ul>  
                 <button 
                    className="button_more"
                    onClick={()=>this.onNavigateToComm()}> 
                    <div className="read_more">read more</div>
                </button>          
            </div>
        )
    }


    render() {
        const {charData, loading, error, navigateToComm} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        const items = this.View();
        const navItem = navigateToComm ? <Navigate to={getCommentsPageRoute(charData.id)}/> : null;
        const content = !(loading || error || !charData) ? items : null;
       
        return (
            <div className="char__info">
                {navItem}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}



export default CharInfo;