interface SquareProps {
  value: '❤️' | '😒'
  handleClick: Function
}

const Square = ({ value, handleClick }: SquareProps) => {
  return (
    <div
      className="w-20 h-20 flex justify-center items-center bg-slate-400 rounded-2xl hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => { handleClick() }}
    >
      <p className="text-3xl">{value}</p>
    </div>
  );
}

export default Square