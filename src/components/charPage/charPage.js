
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

export const CharPage = (props) => {
  return (
     <div>
        <div className="char__content">
             <ErrorBoundary>
                <CharList onCharSelected={props.onCharSelected} charData={props.char}/>
             </ErrorBoundary>
             <ErrorBoundary>
                <CharInfo charData={props.char}/>
              </ErrorBoundary> 
        </div>
    </div>
  )
}