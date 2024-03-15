import { useState } from 'react'

const Votes = ({votes}) => {
  return (<div>has {votes} votes</div>)
}

const Anectode = ({title, anecdote, votes}) => {
  return (
  <>
  <h1>{title}</h1>
  <a>{anecdote}</a>
  <Votes votes={votes}></Votes>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  return (
    <div>
      <Anectode title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]}></Anectode>
      <br /><button onClick={() => {
        let copy = [...votes]
        copy[selected] += 1
        setVotes(copy)}}>vote</button><button onClick={() => {setSelected(Math.floor(Math.random()*8))}}>next anecdote</button>
        <Anectode title="Anecdote with most votes" anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]}></Anectode>
    </div>
  )
}

export default App