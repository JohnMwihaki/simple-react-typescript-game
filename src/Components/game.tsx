import { useReducer } from "react";

type GameStateType = {
  newGameBtn: boolean;
  guessInput: boolean;
  guessNumber: boolean;
  gameTrials: number;
  secreteNumber: number | null;
  gameResult: string | null;
  inputValue:string;
};
type GameActions =
  | { type: "new_game" }
  | { type: "player_guess"; payload: number }
  | {type:"update_input";payload:string}

const initialStateValue: GameStateType = {
  newGameBtn: false,
  guessInput: true,
  guessNumber: true,
  gameTrials: 0,
  secreteNumber: null,
  gameResult: null,
  inputValue: "",
};
function generateNumber(): number {
  return Math.floor(Math.random() * 100);
}
function gameReducer(state: GameStateType, action: GameActions): GameStateType {
  switch (action.type) {
    case "new_game":
      return {
        ...state,
        newGameBtn: true,
        guessInput: false,
        guessNumber: false,
        gameTrials: 10,
        secreteNumber: generateNumber(),
        gameResult: null,
        inputValue: "",
      };
    case "player_guess":
      const guess = action.payload;
      const numTrials = state.gameTrials - 1;
      if(state.secreteNumber===null)
        return state;

      if (guess === state.secreteNumber) {
        return {
          ...state,
          newGameBtn: false,
          guessInput: true,
          guessNumber: true,
          gameTrials: 0,
          gameResult: `You won! Score: ${numTrials * 10}%`,
        };
      }
      if (numTrials === 0) {
        return {
          ...state,
          newGameBtn: false,
          guessInput: true,
          guessNumber: true,
          gameTrials: 0,
          gameResult: `You lost! The secret number was ${state.secreteNumber}`,
        };
      }
      return {
        ...state,
        gameTrials: numTrials,
        gameResult:
          guess > state.secreteNumber
            ? `${guess} is greater than secret number`
            : `${guess} is less than secret number`,
      };

      case "update_input":
        return{
            ...state,
            inputValue:action.payload,
        }
    default:
      return state;
  }
}
function GameMain() {
  const [state, dispatch] = useReducer(gameReducer, initialStateValue);
  function handleNewGame() {
    return dispatch({ type: "new_game" });
  }
  function handleGuessBtn(e: React.FormEvent) {
  e.preventDefault();
  const numberValue= parseInt(state.inputValue);
  dispatch({ type: "player_guess", payload: numberValue });
}

  return (
    <>
      <div className="game-wrapper">
        <div className="game-header">
          <div className="game-header-text">Guess a number between 0 and 100</div>
          <button
            className="new-game-btn"
            onClick={handleNewGame}
            disabled={state.newGameBtn}
          >
            New Game
          </button>
        </div>
        <div className="trial-messege">{" "}
        {state.newGameBtn
          ? `${state.gameTrials} remaining trial(s)`
          : "Welcome! Click New Game to Start"}</div>
       <form action="" className="input-wrapper">
         <input
          type="number"
          value={state.inputValue}
          onChange={(e) =>
            dispatch({ type: "update_input", payload: e.target.value})
          }
          readOnly={state.guessInput}
          placeholder="00"
          max={100}
          className="inputValue"
         
        />
        {state.gameResult && <p className="game-result ">{state.gameResult}</p>}
        <button
          className="guess-number"
          onClick={handleGuessBtn}
          disabled={state.guessNumber}
        >
          Guess
        </button>
       </form>
      </div>
    </>
  );
}
export default GameMain;
