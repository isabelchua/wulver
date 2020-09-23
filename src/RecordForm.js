import React, { useState, useEffect, useContext } from "react";
//import { nanoid } from "nanoid";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";

//import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import Stat from "./Stat";
import PostContext from "./components/context/postContext";

function RecordForm() {
	const postContext = useContext(PostContext);

	const { stats, addPost, editPost, current, clearCurrent } = postContext;
	//console.log(postContext);

	//console.log(stats);

	//setForm({ ...form, date: dateFnsFormat(new Date(), "MM/dd/yyyy") });

	useEffect(() => {
		setForm({ ...form, date: dateFnsFormat(new Date(), "MM/dd/yyyy") });

		console.log("useeffect " + current);

		if (current !== null) {
			setForm(current);
		} else {
			// setForm({
			// 	weight: "2",
			// 	date: dateFnsFormat(new Date(), "MM/dd/yyyy")
			// });
		}
		//set initial date to today
		//console.log(form);
	}, [postContext, current]);

	const [form, setForm] = useState({
		weight: "",
		date: dateFnsFormat(new Date(), "MM/dd/yyyy")
	});

	//console.log(form.stats);

	const { weight, date } = form;

	if (stats.length === 0) {
		return <h4>Please add weight</h4>;
	}

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
		//console.log(e);
	};
	const onSubmit = e => {
		e.preventDefault();
		console.log("current " + current);
		if (current === null) {
			addPost(form);
		} else {
			editPost(form);
		}
		//console.log(form);
		// setForm({
		// 	weight: "",
		// 	date: dateFnsFormat(new Date(), "MM/dd/yyyy")
		// });
		clearForm();
	};

	const clearForm = () => {
		clearCurrent();
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
		//onLoad();
		const input = dayPickerInput.getInput();
		//console.log(input);
		//console.log(input.value.trim());
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
		<LineChart width={800} height={350} data={sortByDate}>
			<Line type="monotone" dataKey="weight" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="date" />
			<YAxis />
		</LineChart>
	);

	return (
		<div>
			<div class="ui center aligned basic segment">
				<h2 className="text-primary">
					{current ? (
						<span style={{ color: "red" }}>Edit Record</span>
					) : (
						"Add Record"
					)}
				</h2>
				<div class="ui relaxed celled list">
					<div className="item ui">
						<form onSubmit={onSubmit} className="item ui four column row">
							<div className="ui right labeled input column">
								<input
									type="text"
									value={weight || ""}
									name="weight"
									onChange={onChange}
									placeholder="Enter Weight"
								/>
								<div class="ui basic label">lbs</div>{" "}
							</div>
							<div className="ui right labeled input column">
								<DayPickerInput
									name="date"
									value={
										date ||
										`${dateFnsFormat(new Date(), "MM/dd/yyyy")}`
									}
									formatDate={formatDate}
									placeholder={`${dateFnsFormat(
										new Date(),
										"MM/dd/yyyy"
									)}`}
									format="MM/dd/yyyy"
									onChange={onChange}
									onDayChange={handleDayChange}
									parseDate={parseDate}
									dayPickerProps={{
										month: new Date(),
										todayButton: "Today"
									}}
								/>
							</div>
							{/* <input
							type="submit"
							value={current ? "Edit Record" : "Add Record"}
							//onClick={clearForm}
						/> */}
							{current ? (
								<div className="ui animated fade button red  column">
									<div className="hidden content">Edit Record</div>
									<div className="visible content">
										<i className="edit icon"></i>
									</div>
								</div>
							) : (
								<div className="ui animated fade button green  column">
									<div className="hidden content">Add Record</div>
									<div className="visible content">
										<i className="plus icon"></i>
									</div>
								</div>
							)}
							{current && (
								<div
									className="ui button red  column"
									onClick={clearForm}
								>
									<div className="content">Cancel</div>
								</div>
							)}
						</form>
						{/* {weight} - {date} */}
						{renderLineChart}
					</div>
				</div>
			</div>

			<div class="ui relaxed celled animated list">
				{sortByDate &&
					sortByDate.map(stat => {
						return <Stat stat={stat} key={stat.id} />;
					})}
			</div>
		</div>
	);
}

export default RecordForm;
