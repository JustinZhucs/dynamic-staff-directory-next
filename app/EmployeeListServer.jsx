import EmployeeList from "./EmployeeList";
import employees from "./employees";

const initialCount = 20;

export default async function EmployeeListServer() {
  const getEmployees = async (startCursor, count) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const loadedEmployees = employees.slice(startCursor, startCursor + count);
    return loadedEmployees.map((employee) => ({
      ...employee,
      color: getRandomColor(),
    }));
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

  const initialEmployees = await getEmployees(0, initialCount);

  return (
    <EmployeeList
      initialEmployees={initialEmployees}
      initialCursor={initialCount}
    />
  );
}
