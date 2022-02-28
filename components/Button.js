export const Btn = ({ cb, text="Click here", p="py-1 px-3" }) => {
	return <button onClick={cb} className={`m-auto btn inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ${p}`}>{text}</button>    
}