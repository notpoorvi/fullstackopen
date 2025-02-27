import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const setToSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const changeVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const indexofMax = (arr) => {
    let max = arr[0];
    let maxIndex = 0;
    for (let i = 1; i <= arr.length; i++) {
      if (max < arr[i]) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return maxIndex;
  };

  let maxIndex = indexofMax(votes);

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has votes {votes[selected]}</div>
      <Button handleClick={changeVotes} text={"vote"} />
      <Button handleClick={setToSelected} text={"next anecdote"} />
      <h2>Anecdote with the most votes</h2>
      <div>{anecdotes[maxIndex]}</div>
      <div>has votes {votes[maxIndex]}</div>
    </>
  );
};

export default App;
