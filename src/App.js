import React, { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";

//import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import Stat from "./Stat";
import PostContext from "./components/context/postContext";
import PostState from "./components/context/PostState";

function App() {
	const postContext = useContext(PostContext);
	//addPost,
	const { stats, addPost } = postContext;
	//console.log(postContext);

	//console.log(stats);

	const [form, setForm] = useState({
		weight: ""
	});

	useEffect(() => {
		//set initial date to today
		setForm({ ...form, date: dateFnsFormat(new Date(), "MM/dd/yyyy") });
	}, []);
	//console.log(form.stats);

	const { weight, date } = form;

	if (stats.length === 0) {
		return <h4>Please add a user</h4>;
	}

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
		//console.log(e);
	};
	const onSubmit = e => {
		e.preventDefault();
		addPost(form);
		//console.log(form);

		//setForm(form);
		// const newData = {
		// 	stats: [
		// 		{
		// 			id: nanoid(),
		// 			weight,
		// 			date
		// 		}
		// 	]
		// };
		//setForm(previousData => ({ ...previousData, ...form, ...newData }));

		// setForm(previous => ({
		// 	...previous,
		// 	stats: [...previous.stats, ...newData.stats]
		// }));

		//console.log(...form, newData);
		//console.log(form);
		//console.log(newData);
	};

	function formatDate(date, format, locale) {
		return dateFnsFormat(date, format, { locale });
	}

	function parseDate(str, format, locale) {
		const parsed = dateFnsParse(str, format, new Date(), { locale });
		if (DateUtils.isDate(parsed)) {
			return parsed;
		}
		return undefined;
	}

	const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
		const input = dayPickerInput.getInput();
		//console.log(input);
		console.log(input.value.trim());
		setForm({ ...form, date: input.value.trim() });
	};

	// const sortByDate = form.stats.sort(
	// 	(a, b) =>
	// 		new Date(...a.date.split("/").reverse()) -
	// 		new Date(...b.date.split("/").reverse())
	// );

	const sortByDate = stats.sort((a, b) =>
		a.date
			.split("/")
			.reverse()
			.join()
			.localeCompare(b.date.split("/").reverse().join())
	);

	const renderLineChart = (
		<LineChart width={1000} height={250} data={sortByDate}>
			<Line type="monotone" dataKey="weight" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="date" />
			<YAxis />
		</LineChart>
	);

	return (
		<PostState>
			<div className="App">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						value={weight || ""}
						name="weight"
						onChange={onChange}
						placeholder="Enter Weight"
					/>

					<DayPickerInput
						name="date"
						value={date || `${dateFnsFormat(new Date(), "MM/dd/yyyy")}`}
						formatDate={formatDate}
						placeholder={`${dateFnsFormat(new Date(), "MM/dd/yyyy")}`}
						format="MM/dd/yyyy"
						onChange={onChange}
						onDayChange={handleDayChange}
						parseDate={parseDate}
						dayPickerProps={{
							month: new Date(),
							todayButton: "Today"
						}}
					/>
					<button>SEND</button>
				</form>
				{weight} - {date}
				{renderLineChart}
				{sortByDate &&
					sortByDate.map(stat => {
						return <Stat stat={stat} key={stat.id} />;
					})}
			</div>
		</PostState>
	);
}

export default App;
