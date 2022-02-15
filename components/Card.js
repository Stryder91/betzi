import { Btn } from "./Button";

export const Card = ({ id, title, children, date, pool=0, share=0, cancel }) => {
	return(
		<div className="my-10 rounded overflow-hidden shadow-lg whitebg black flex flex-wrap justify-center text-center">
			{/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
			<div className="py-4 w-full">
				<div className="font-bold text-xl mb-2">{title}</div>
				<p>{date}</p>
				<div className="flex flex-wrap justify-center"> {children} </div>
			</div>
			<div className="px-6 pt-4 pb-2">
				<div className="my-3">
					<p>Pool : {pool}</p>
					<p>Share : {share}</p>
				</div>
				<div className='m-auto text-center'>
					<Btn text="Cancel my bet" color="green" cb={() => cancel(id)}/>
				</div>
			</div>
		</div>
	);
}