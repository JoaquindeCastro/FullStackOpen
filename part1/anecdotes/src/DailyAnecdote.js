import React from 'react';

const DailyAnecdote = ({text, votes}) => {
	return (
		<div>
			<h1>Anecdote of The Day</h1>
			<p>{text}</p>
			<p>Votes: {votes}</p>
		</div>
	)
}

export default DailyAnecdote