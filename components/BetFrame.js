import { Btn } from "./Button";

export const BetFrame = ({m, onChangeCb, onSubmitCb}) => {
	return(
		<div className='bet-frame'>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					{m.team1.name}
				</label>
				<input
					onChange={onChangeCb}
					className="shadow appearance-none border rounded w-1/4 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1" 
					type="number" 
					placeholder="0"
				/>
				<Btn text="Bet" color="green" cb={onSubmitCb}/>
			</div>
		</div>
	);
}