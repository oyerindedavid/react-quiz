import './Options.css';
import { nanoid } from 'nanoid';

export default function Options(props){

    function styleIncludingAllIncorrect(isSelected, isCorrect, isSubmit){
        let style
        if(isCorrect && isSubmit){
          style = {
                color: "#293264",
                backgroundColor: "#94D7A2",
          }
         }else if(!isCorrect && isSubmit){
              style = {
                color: "#293264",
                backgroundColor: "#F8BCBC",     
              }
         }else if(isSelected){
            style = {
                  color: "#293264",
                  backgroundColor: "#D6DBF5", 
              }
        }
         return style
      }

    function styleOnlyCorrectAndIncorrect(isSelected, isCorrect, isSubmit){
        let style
        if(isSelected && isCorrect && isSubmit){
            style = {
                  color: "#293264",
                  backgroundColor: "#94D7A2",
            }
           }else if(isSelected && !isCorrect && isSubmit){
                style = {
                  color: "#293264",
                  backgroundColor: "#F8BCBC",     
                }
           }else if(!isSelected && !isCorrect && isSubmit){
              style = {
                  color: "#293264",
                  backgroundColor: "transparent",     
              }
           }else if(!isSelected && isCorrect && isSubmit){
              style = {
                  color: "#293264",
                  backgroundColor: "#94D7A2",     
              }
           }
           else if(isSelected){
              style = {
                    color: "#293264",
                    backgroundColor: "#D6DBF5", 
                }
          }
          return style
      }


    return(
        <>
           {<button 
                  key={nanoid()} 
                  className='option'
                  style={styleOnlyCorrectAndIncorrect(props.option.isSelected, props.isSelectionCorrect, props.isSubmit)}
                  onClick={props.isSubmit ? ()=>{console.log("Do nothing")} : props.handleSelection}
              >
                  {props.option.value}
              </button>}
        </>
        
    )
}