
 const list = document.querySelector(".table");
export default async (UI)=>{
    const scoreRecord = await UI.fetchScore();
    list.innerHTML = "";
    scoreRecord.forEach ((scoreList)=> UI.addTOList(scoreList));
  }
  