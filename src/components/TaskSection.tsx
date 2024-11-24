import { useState } from "react";
import { convertToDateTime, shortenText } from "../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDrag, useDrop } from "react-dnd";
import { RxHamburgerMenu } from "react-icons/rx";

// Define the item type for react-dnd
const ITEM_TYPE = "COLUMN";

interface TaskSectionProps {
  loading: boolean;
  tasks: any;
}

const TaskSection: React.FC<TaskSectionProps> = ({ loading, tasks }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(10);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "Project Name",
    "Project Link",
    "Project Id",
    "Project Budget",
    "Bid Value",
    "Created",
    "Created By",
    "Bidding Delay Time",
    "Status",
    "Deal Status",
    "Website",
    "Address",
    "Action",
  ]);

  const availableColumns = [
    "Project Name",
    "Project Link",
    "Project Id",
    "Project Budget",
    "Bid Value",
    "Created",
    "Created By",
    "Bidding Delay Time",
    "Status",
    "Deal Status",
    "Website",
    "Address",
    // TODO: start
    "Mobile",
    "Email",
    "State",
    "Country",
    // end
    "Action",
  ];

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  
  const handleDrop = (draggedIndex: number, targetIndex: number) => {
    const newColumns = [...selectedColumns];
    const [removedColumn] = newColumns.splice(draggedIndex, 1); 
    newColumns.splice(targetIndex, 0, removedColumn); 
    setSelectedColumns(newColumns);
  };


  const ColumnHeader = ({
    column,
    index,
  }: {
    column: string;
    index: number;
  }) => {
    const [, drag] = useDrag(() => ({
      type: ITEM_TYPE,
      item: { index },
    }));

    const [, drop] = useDrop(() => ({
      accept: ITEM_TYPE,
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          handleDrop(item.index, index);
          item.index = index;
        }
      },
    }));

    return (
      <th
        ref={(node) => drag(drop(node))}
        className="px-4 py-4 cursor-pointer "
      >
        {column}
      </th>
    );
  };


  const handleColumnChange = (column: string) => {
    setSelectedColumns((prev) => {

      if (prev.includes(column)) {
        return prev.filter((item) => item !== column);
      } else {

        const newColumns = [...prev];
        const actionIndex = newColumns.indexOf("Action");

        if (actionIndex !== -1) {
          newColumns.splice(actionIndex, 0, column);
        } else {

          newColumns.push(column);
        }
        return newColumns;
      }
    });
  };

  return (
    <div className="w-full">
      <div className="my-4">
        <div className="flex flex-wrap justify-end items-center">

          <RxHamburgerMenu
            className="text-2xl cursor-pointer mr-4"
            onClick={() => setDropdownVisible(!dropdownVisible)} 
          />


          {dropdownVisible && (
            <div className="absolute right-20 top-10 mt-[10.2rem] bg-white border border-gray-300 rounded-md shadow-lg w-48 h-60 overflow-y-auto">
              {availableColumns.map((column) => (
                <label
                  key={column}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleColumnChange(column)}
                    className="form-checkbox"
                  />
                  <span>{column}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-full text-gray-500">
        <table className="min-w-max table-auto border-collapse text-left">
          <thead>
            <tr className="text-sm font-semibold text-gray-500">
              <th className="px-4 py-2 w-6">
                <input type="checkbox" />
              </th>
              <td className="px-4 py-4 w-6">#</td>
              {selectedColumns.map((column, index) => (
                <ColumnHeader key={index} column={column} index={index} />
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={selectedColumns.length}
                  className="text-center py-4"
                >
                  <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : (
              currentTasks?.map((task: any, index: any) => (
                <tr key={task?.id}>
                  <td className="px-4 py-4 border-b">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-4 border-b">
                    {startIndex + index + 1}
                  </td>
                  {selectedColumns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border-b">
                      {column === "Project Name" &&
                        (task?.project_name ?? "N/A")}
                      {column === "Project Link" &&
                        shortenText(task?.project_link, 25)}
                      {column === "Project Id" && (task?.project_id ?? "N/A")}
                      {column === "Project Budget" &&
                        (task?.project_budget ?? 0)}
                      {column === "Bid Value" && (task?.bid_value ?? 0)}
                      {column === "Created" &&
                        convertToDateTime(task?.created_at)}
                      {column === "Created By" &&
                        (task?.client_name
                          ? shortenText(task?.client_name, 25)
                          : "N/A")}
                      {column === "Bidding Delay Time" &&
                        (task?.bidding_minutes || task?.bidding_seconds
                          ? `${task?.bidding_minutes} mins ${task?.bidding_seconds} seconds`
                          : "N/A")}
                      {column === "Status" && (
                        <div
                          className={`text-center text-xs text-white rounded-md font-semibold px-2 ${
                            task?.deal_status === 1
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {task?.deal_status === 1
                            ? "Converted to Deal"
                            : "Not Converted to Deal"}
                        </div>
                      )}
                      {column === "Deal Status" && (
                        <div
                          className={`text-center ${
                            task?.deal_status === 1
                              ? "bg-yellow-500 text-gray-700 text-xs rounded-md font-semibold"
                              : ""
                          }`}
                        >
                          {task?.deal_status === 1
                            ? "No Activity Yet"
                            : "Not Applicable"}
                        </div>
                      )}
                      {column === "Website" && (task?.bid_value ?? "N/A")}
                      {column === "Address" && (task?.address ?? "N/A")}
                      {column === "Mobile" && (task?.mobile ?? "N/A")}
                      {column === "Email" && (task?.client_email ?? "N/A")}
                      {column === "State" && (task?.state ?? "N/A")}
                      {column === "Country" && (task?.country ?? "N/A")}
                      {column === "Action" && <BsThreeDotsVertical />}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={selectedColumns.length + 1} className=" py-4">
                <div className="flex justify-start items-center gap-12">
                  <span className="text-sm">
                    Showing {startIndex + 1} to{" "}
                    {startIndex + currentTasks.length} of {tasks.length} entries
                  </span>

                  {/* React Paginate */}
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"flex space-x-2 items-center"}
                    pageClassName={"px-4 py-2 bg-gray-300 rounded-md"}
                    activeClassName={"bg-blue-500 text-white"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TaskSection;
