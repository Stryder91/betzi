export const Card = ({ title, children, date }) => {
	return(
		<div className="rounded overflow-hidden shadow-lg whitebg black flex flex-wrap justify-center text-center">
			{/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
			<div className="py-4 w-full">
				<div className="font-bold text-xl mb-2">{title}</div>
				<p>{date}</p>
				<div className="flex flex-wrap justify-center"> {children} </div>
			</div>
			<div className="px-6 pt-4 pb-2">
				<p>Match id :</p>
			</div>
		</div>
	);
}