export const Btn = ({ cb, text="Click here", p="py-1 px-3" }) => {
	return(
		<div>
			<button onClick={cb} className={`btn inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${p}`}>{text}</button>
		</div>
	);    
}