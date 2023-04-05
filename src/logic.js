export default function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
}

export function style(isSelected, isCorrect, isSubmit){
  let style
  
   if(isSelected){
      style = {
            color: "#293264",
            backgroundColor: "#D6DBF5", 
        }
   }else if(isSelected && isCorrect){
    style = {
          color: "#293264",
          backgroundColor: "#94D7A2",
    }
   }else if(isSelected && !isCorrect){
        style = {
          color: "#293264",
          backgroundColor: "#F8BCBC",     
        }
   }
   return style
}
    