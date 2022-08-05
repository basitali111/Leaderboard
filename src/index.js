import './style.css';
import display from './modules/display';

class UI {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  static addTOList(scoreList) {
    const list = document.querySelector('.table');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${scoreList.user}:${scoreList.score}</td>`;
    list.appendChild(row);
  }

  static async fetchScore() {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zwf0BKoOaoU8Ux7gGyFF/scores/',
    );
    const scores = await response.json();
    scores.result.sort((a, b) => b.score - a.score);
    console.log(scores.result);
    return scores.result;
  }

  static async postScore(user, score) {
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zwf0BKoOaoU8Ux7gGyFF/scores/',
      {
        method: 'POST',
        body: JSON.stringify({ user, score }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
}

document.querySelector('#form').addEventListener('submit', async (e) => {
  // preventing default behaviour
  e.preventDefault();
  // selecting input fields and value
  const name = document.getElementById('name').value;
  const score = document.getElementById('score').value;
  await UI.postScore(name, score);
  display(UI);
});
const refreshBtn = document.querySelector('#refresh');
refreshBtn.addEventListener('click', () => {
  display(UI);
});