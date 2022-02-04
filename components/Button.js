export const Btn = ({ cb, text="Click here", p="py-1 px-3" }) => {
	return(
		<div>
			<button onClick={cb} className={`btn ${p}`}>{text}</button>
		</div>
	);    
}