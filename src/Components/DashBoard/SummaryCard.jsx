// eslint-disable-next-line react/prop-types
export const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded flex bg-white">
      <div
        className={`text-3xl flex justify-center ${color} text-white px-4 py-3`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};
