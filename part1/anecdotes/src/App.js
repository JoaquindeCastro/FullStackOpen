import React, { useState } from 'react';
import DailyAnecdote from './DailyAnecdote.js';
import AnecdoteWithMostVotes from './AnecdoteWithMostVotes.js'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const startVotes = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(startVotes)

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const getMaxIndex = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <DailyAnecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={()=>{
        setSelected(Math.floor(Math.random() * anecdotes.length))
      }}>
        Next Anecdote
      </button>
      <button onClick={()=>{
        handleVote()
      }}>
        Vote
      </button>

      {
        getMaxIndex() === 0
        ? <AnecdoteWithMostVotes text="No votes yet :)" votes="0" />
        : <AnecdoteWithMostVotes text={anecdotes[getMaxIndex()]} votes={votes[getMaxIndex()]} />
      }
    </div>
  )
}

export default App