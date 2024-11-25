import { showFormattedDate } from "../utils/index";

const Card = ({ data, children }) => {
  return (
    <>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 truncate">
            {data.title}
          </h3>
          <p className="text-slate-400">{showFormattedDate(data.createdAt)}</p>
          <p className="font-normal text-gray-700">{data.body}</p>
        </div>
        <div className="flex gap-1">{children}</div>
      </div>
    </>
  );
};

export default Card;
