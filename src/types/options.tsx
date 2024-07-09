import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
  FaRegCheckCircle,
  FaRegCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

export const statusOptions = [
  {
    icon: <FaRegCircle />,
    label: "Todo",
    value: "todo",
  },
  {
    icon: <MdOutlineTimer />,
    label: "In Progress",
    value: "in-progress",
  },
  {
    icon: <FaRegCheckCircle />,
    label: "Done",
    value: "done",
  },
  {
    icon: <FaRegTimesCircle />,
    label: "Cancelled",
    value: "cancelled",
  },
];

export const priorityOptions = [
  {
    icon: <FaArrowDown />,
    label: "Low",
    value: "low",
  },
  {
    icon: <FaArrowRight />,
    label: "Medium",
    value: "medium",
  },
  {
    icon: <FaArrowUp />,
    label: "High",
    value: "high",
  },
];

export const labelOptions = [
  {
    label: "Documentation",
    value: "documentation",
  },
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Feature",
    value: "feature",
  },
];
