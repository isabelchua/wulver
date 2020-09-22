import React from "react";
import Stat from "./Stat";

function MapStat() {
	return (
		<div className="notes-container">
			{stat.map((note, i) => {
				return <Stat stat={stat} key={stat.id} />;
			})}
		</div>
	);
}

export default MapStat;
