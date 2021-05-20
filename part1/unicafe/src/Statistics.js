import React from 'react';
import Stat from './Stat.js'

const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad;
	const positive = props.good/total;
	const avg = (props.good - props.bad)/total;

	if (total === 0){
		return (
		<div>
			<p>
				No feedback yet, why not give some :)
			</p>
		</div>
		)
	} else {
		return (
			<table>
				<tbody>
					<Stat text="Good" value={props.good} />
					<Stat text="Neutral" value={props.neutral} />
					<Stat text="Bad" value={props.bad} />
					<Stat text="Total" value={total} />
					<Stat text="Average" value={avg} />
					<Stat text="Positive" value={positive} />
				</tbody>
			</table>
		)
	}
}

export default Statistics