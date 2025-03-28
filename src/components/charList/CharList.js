import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PostsService from '../../services/PostService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        comments: [],
        users: [],
        loadingP: true,
        loadingC: true,
        loadingU: true,
        error: false,
    }
    
    
    postsService = new PostsService();

     componentDidMount() {
        this.onRequest();
    } 

   

    onRequest = () => {
        this.postsService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
        this.postsService.getAllComments()
            .then(this.onCommentsLoaded)
            .catch(this.onError)
        this.postsService.getAllUsers()
            .then(this.onUsersLoaded)
            .catch(this.onError)   
    }

     onCharListLoaded = (newCharList) => {
        this.setState({
            charList: newCharList,
            loadingP: false            
        }) 
        this.props.onCharSelected(newCharList[0])
     }   

     onCommentsLoaded = (newComments) => {
        this.setState({
            comments: newComments,
            loadingC: false            
        })  
     }   

     onUsersLoaded = (newUsers) => {
        this.setState({
            users: newUsers,
            loadingU: false            
        })  
     }   
           

    onError = () => {
        this.setState({
            error: true,
            loadingP: false,
            loadingC: false,
            loadingU: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let style_item = "char__item"
            if(item.id===this.props.charData.id) style_item = "char__item_selected"
            return (
                <li className= {style_item}
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item)}> 
                    <div className="char__name">{item.title}</div>
                    <div className="char__author">author  :  {item.user_name}</div> 
                    <div className="char__description">comments  :  {item.comments_num}</div> 
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, comments, users, loadingP, loadingC, loadingU, error} = this.state;
        const loading = loadingP || loadingC || loadingU
        let v = {comments_num: 0, user_name: 'none'};
        let list = charList;
        list = charList.map(item => {
            let result =  { ...item, ...v };
            const res1 = comments.filter(ex => (item.id === ex.postId));
            const res2 = !loadingU ? users.filter(ex => (item.userId === ex.id)) : [{user_name: 'none'}]
            const author = {...res2};
            result= {...result, user_name : author[0].username, comments_num : res1.length} ;
            return result; 
        })      
        
        const items = this.renderItems(list);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        
        return (
            <div className="char__list">
                {errorMessage} 
                {spinner}
                {content}               
            </div>
        )
    }
}

export default CharList;