import React, { useState, useEffect, useContext } from "react";
//import { nanoid } from "nanoid";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import Spinner from "./components/layout/Spinner";

//import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer
} from "recharts";

import Stat from "./Stat";
import PostContext from "./components/context/postContext";
import AuthContext from "./components/context/auth/authContext";
import Footer from "./components/layout/Footer";

function RecordForm() {
	const postContext = useContext(PostContext);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	const {
		stats,
		addPost,
		editPost,
		current,
		clearCurrent,
		loading,
		getPosts
	} = postContext;

	const { isAuthenticated } = authContext;

	// if (!isAuthenticated) {
	// 	//if authenticated then go to home page
	// 	return <h4>Register and login to save your progress!</h4>;
	// }

	//authContext.loadUser();
	// if (authContext.isAuthenticated !== null) {

	// }

	useEffect(() => {
		getPosts();
		//eslint-disable-next-line
	}, []);

	//console.log(stats);

	//setForm({ ...form, date: dateFnsFormat(new Date(), "MM/dd/yyyy") });

	useEffect(() => {
		setForm({ ...form, date: dateFnsFormat(new Date(), "MM/dd/yyyy") });

		console.log("useeffect " + current);

		if (current !== null) {
			setForm(current);
		} else {
			setForm({
				weight: "",
				date: dateFnsFormat(new Date(), "MM/dd/yyyy")
			});
		}
		//set initial date to today
		//console.log(form);
		// eslint-disable-next-line
	}, [postContext, current]);

	const [form, setForm] = useState({
		weight: "",
		date: dateFnsFormat(new Date(), "MM/dd/yyyy")
	});

	//console.log(form.stats);

	const { weight, date } = form;

	// if (stats.length === 0) {
	// 	return <h4>Please add weight</h4>;
	// }

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

	// const sortByDate = stats.sort((a, b) =>
	// 	a.date
	// 		.split("/")
	// 		.reverse()
	// 		.join()
	// 		.localeCompare(b.date.split("/").reverse().join())
	// );

	const sortByDate = stats.sort(function (a, b) {
		var dateA = new Date(a.date),
			dateB = new Date(b.date);
		return dateA - dateB;
	});

	const renderLineChart = (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={sortByDate}>
				<Line type="monotone" dataKey="weight" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="date" />
				<YAxis />
			</LineChart>
		</ResponsiveContainer>
	);

	return (
		<div className="record-form">
			{!isAuthenticated ? (
				<div>
					<div className="ui info message">
						<div className="header">
							<h4>
								Below is a sample graph, Register/Login to experience
								the features and save your progress!
							</h4>
						</div>
					</div>

					<div className="ui grid">
						<div className="four wide column">Age: 34</div>
						<div className="four wide column">Goal Weight: 105lbs</div>
						<div className="four wide column">Height: 5'2"</div>
						<div className="four wide column">Gender: F</div>
					</div>
				</div>
			) : (
				" "
			)}

			<div className="bg-color ui center aligned segment ">
				<h2 className="text-primary">
					{current ? (
						<span style={{ color: "#b81e1e" }}>Edit Record</span>
					) : (
						"Enter Record"
					)}
				</h2>
				<div className="ui hidden divider"></div>
				<div className="ui relaxed celled list">
					<div className="item ui">
						<form>
							<div className="b-margin item ui four column">
								<div className="r-margin ui right labeled input column">
									<input
										type="text"
										value={weight || ""}
										name="weight"
										onChange={onChange}
										placeholder="Enter Weight"
									/>
									<div className="ui basic label">lbs</div>{" "}
								</div>
								<div className="r-margin ui right input column">
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
								{current ? (
									<div
										onClick={onSubmit}
										className="fixed-m ui animated fade button purple column"
									>
										<div className="visible content">Save Edit</div>
										<div className="hidden content">
											<i className="edit icon"></i>
										</div>
									</div>
								) : (
									<div
										onClick={onSubmit}
										className="fixed-m ui animated fade button green column"
									>
										<div className="visible content">Add Record</div>
										<div className="hidden content">
											<i className="plus icon"></i>
										</div>
									</div>
								)}
								{current && (
									<div
										className="ui button red column"
										onClick={clearForm}
									>
										<div className="content">Cancel</div>
									</div>
								)}
							</div>
						</form>
						{/* {weight} - {date} */}
						<div className="four column centered row">
							<div className="column">{renderLineChart}</div>
						</div>
					</div>
				</div>
			</div>

			<div className=" ui relaxed celled animated list">
				<div className="flex-center-main-upper">
					<div className="flex-center-main border-bot">
						<div
							className="flex-center center-horizontal-align"
							style={{ marginRight: "30px" }}
						></div>
						<div className="flex-center center-horizontal-align">
							Date
						</div>
						<div className="flex-center center-horizontal-align">
							Weight{" "}
						</div>
						<div
							className="button-stack center-horizontal-align"
							style={{ marginRight: "30px" }}
						>
							Edit / Delete
						</div>
					</div>
				</div>

				{stats !== null && !loading ? (
					sortByDate &&
					sortByDate.map(stat => {
						return <Stat stat={stat} key={stat._id} />;
					})
				) : (
					<Spinner />
				)}
			</div>
			<Footer />
		</div>
	);
}

export default RecordForm;
