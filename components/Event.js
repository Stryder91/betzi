import '../styles/Home.module.css'
export const Event = ({title}) => {
	return(
		<div className="card event-card primary">
			<h1>{title}</h1>
		</div>
	);
}