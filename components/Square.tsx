interface SquareProps {
  value: '❤️' | '😒'
  handleClick: Function
}

const Square = ({ value, handleClick }: SquareProps) => {
  return (
    <div
      className="w-20 h-20 flex justify-center items-center bg-slate-200 rounded-2xl hover:scale-105"
      onClick={() => { handleClick() }}
    >
      <p className="text-3xl">{value}</p>
    </div>
  );
}

export default Square