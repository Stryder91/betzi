export const Btn = ({text, cb=()=>{}, color, hvrColor="pink"}) => {
	return(
		<button 
			onClick={cb} 
			className={`bg-${color}-500 hover:bg-${hvrColor}-600 text-white font-bold py-1 px-5 rounded-full m-auto`}>
			{text}
		</button>
	);
}