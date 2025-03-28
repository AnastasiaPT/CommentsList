import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PostsService from '../../services/PostService';
import './commentPage.scss';

class CommentsPage extends Component {

   state = {
       charData: [],
       comments: [],
       loading: false,
       error: false
   }

   postsService = new PostsService();

   componentDidMount() {
       this.updateChar();
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

    View = () => {
       const {charData, comments} = this.state;
       const {title, body} = charData; 
       
       const items =  comments.map(item=>{
             return (
               
               <li className="comm__item_info"  key={item.id}>
                   <div className="comm__email">by : {item.email} </div> 
                   <div className="comm__comments">{item.body}</div>
               </li>
           )
       }); 
       
       return (
           <div className="comm__info">
               <div className="comm__basics">
                   <div>
                       <div className="comm__info-name">{title}</div>
                   </div>
               </div>
               <div className="comm__description">
                   {body}
               </div>
               <div className="comm__tesis">Comments : </div>
                <ul >
                  {items}
               </ul>  
                        
           </div>
       )
   }


   render() {
       const {charData, loading, error} = this.state;
       const errorMessage = error ? <ErrorMessage/> : null;
       const spinner = loading ? <Spinner/> : null;

       const items = this.View();
       const content = !(loading || error || !charData) ? items : null;
      
       return (
           <div className="comm__info">
               {errorMessage}
               {spinner}
               {content}
           </div>
       )
   }
}



export default CommentsPage;