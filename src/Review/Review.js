import './Review.css';

export default function Review(props){

    return(
        <span className="review">You scored {props.totalScore} out of {props.totalQuestion} question</span>
    )
}