import useHasMounted from "@/hooks/useHasMounted";
import { Button } from "../ui/button";
import ConfirmDelete from "./confirm-delete";
import { FaPencilAlt } from "react-icons/fa";

interface BaseActionCellProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function BaseActionCell({
  handleEdit,
  handleDelete,
}: BaseActionCellProps) {
  const isMounted = useHasMounted();
  if (!isMounted) return null;
  return (
    <div className="flex flex-row items-center gap-1">
      <Button size="sm" variant="default" onClick={handleEdit}>
        <FaPencilAlt />
      </Button>
      <ConfirmDelete handleDelete={handleDelete} />
    </div>
  );
}
