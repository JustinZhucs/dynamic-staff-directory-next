"use client";

import { useState, useMemo } from "react";
import employees from "./employees";

const EmployeeList = ({ initialEmployees, initialCursor }) => {
  const [displayedEmployees, setDisplayedEmployees] =
    useState(initialEmployees); // []: empty array
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);

  const allLoaded = useMemo(() => cursor >= employees.length, [cursor]);

  const getEmployees = async (startCursor, count) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const loadedEmployees = employees.slice(startCursor, startCursor + count);
    return loadedEmployees.map((employee) => ({
      ...employee,
      color: getRandomColor(),
    }));
  };

  const loadMoreEmployees = async () => {
    setLoading(true);
    const newEmployees = await getEmployees(cursor, 12);
    setDisplayedEmployees((prevEmployees) => [
      ...prevEmployees,
      ...newEmployees,
    ]);
    setCursor((prevCursor) => prevCursor + 12);
    setLoading(false);
  };

  const getRandomColor = () => {
    const isBlue = Math.random() > 0.5;

    const hue = isBlue
      ? Math.floor(Math.random() * 60) + 180
      : Math.floor(Math.random() * 30);

    const saturation = Math.floor(Math.random() * 20) + 30;
    const lightness = Math.floor(Math.random() * 20) + 70;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="p-6">
      <h1
        className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500
       uppercase tracking-wider my-6 mb-12 text-center"
      >
        {"{Employee List}"}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedEmployees.map((employee) => (
          <div
            key={employee.id}
            style={{ backgroundColor: employee.color }}
            className="p-4 rounded-xl shadow-lg hover:shadow-xl scale-[1] hover:scale-[1.03] transition duration-300 ease-in-out"
          >
            <p className="text-lg font-bold">{employee.name}</p>
            <p className="text-sm">{employee.position}</p>
          </div>
        ))}
      </div>

      {!allLoaded ? (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              loadMoreEmployees();
            }}
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white mr-2"></span>
                Processing...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      ) : (
        <p className="mt-4 text-gray-500 flex justify-center">
          All employees loaded
        </p>
      )}
    </div>
  );
};

export default EmployeeList;
