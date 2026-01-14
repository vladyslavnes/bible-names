import { writable, get } from 'svelte/store'

export const players = writable(["John", "Jane", "Jake"]);
export const answerTime = writable(Infinity);

let rawNames = `Adam, Abel, Abraham, Aaron, Solomon, David, Esther, Ruth,
Jesse, Dathan, Nathan, Mathew, Luke, Jesus Christ, Joshua,
Job, Mary Magdalene, Peter, Paul, Jude, Simeon, John Baptist,
Joseph, Boaz, Nebuchadnezzar, Daniel, Isaiah, Thomas, Noah, Eve,
Cain, Moses, Elizabeth, Zechariah, Benjamin, Jonathan, Saul, Samuel,
Ezekiel, Jeremiah, Hezekiah, Nehemiah, Levi, Gideon, Zipporah, Hagar,
Esau, Jacob, Michael, Gabriel, Timothy, Titus, Amos, Habakkuk, Hosea,
Absalom, Joseph from Arimathea, Simon the Cananite, Keren-Happuch,
Keziah, Jemima, Zedekiah, Isaac, Rachel, Deborah, Barnabas`

export const names = writable(rawNames.split(/,\s/));

export const currentPlayerIndex = writable(0);
export const gameState = writable('setup');

function createPlayerScores() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    set,
    update,
    initialize: (playerNames) => {
      set(playerNames.map(name => ({ name, score: 0 })));
    },
    addScore: (playerIndex, points) => {
      update(scores => {
        const newScores = [...scores];
        if (newScores[playerIndex]) {
          newScores[playerIndex].score += points;
        }
        return newScores;
      });
    },
    reset: (playerNames) => {
      initialize(playerNames);
    }
  };
}

export const playerScores = createPlayerScores();

export function nextPlayer() {
  currentPlayerIndex.update(index => {
    const playerCount = get(players).length;
    return (index + 1) % playerCount;
  });
}

export function resetGame() {
  const playerNames = get(players);
  playerScores.initialize(playerNames);
  currentPlayerIndex.set(0);
  gameState.set('playing');
  
  const allNames = rawNames.split(/,\s/);
  names.set(allNames.slice().sort(() => Math.random() - 0.5));
}

export function shuffleNames() {
  names.update(n => n.slice().sort(() => Math.random() - 0.5));
}