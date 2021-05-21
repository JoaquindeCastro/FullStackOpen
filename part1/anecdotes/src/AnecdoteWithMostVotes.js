import React from 'react';

const AnecdoteWithMostVotes = ({text, votes}) => {
	return (
		<div>
			<h1>AnecdoteWithMostVotes</h1>
			<p>{text}</p>
			<p>Votes: {votes}</p>
		</div>
	)
}

export default AnecdoteWithMostVotes