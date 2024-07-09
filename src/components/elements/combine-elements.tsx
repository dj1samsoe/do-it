import React from "react";
import { Badge } from "../ui/badge";

interface props {
  label: string;
  variant: "outline-danger" | "outline-info" | "outline-warning";
  description: string;
}

export default function CombineElements({
  label,
  description,
  variant,
}: props) {
  return (
    <div className="flex gap-1 items-center text-sm">
      <Badge variant={variant}>{label}</Badge>
      <p className="line-clamp-1 truncate">{description}</p>
    </div>
  );
}
