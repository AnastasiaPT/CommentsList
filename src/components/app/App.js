import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import CommentsPage from "../commentPage/commentPage";
import { CharPage } from '../charPage/charPage';
import { getCharPageRoute, getCommentsPageRoute } from '../lib/routers';
import './app.scss';
class App extends Component {
    state = {
        selectedChar: []
    }

    onCharSelected = (item) => {
        this.setState({
            selectedChar: item
        })
    }


    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <Routes>
                        <Route path={getCharPageRoute()} 
                               element={<CharPage onCharSelected={this.onCharSelected} 
                               char={this.state.selectedChar} />} 
                        />
                        <Route path={getCommentsPageRoute(this.state.selectedChar.id)} 
                               element={<CommentsPage charData={this.state.selectedChar}/>} 
                        />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;