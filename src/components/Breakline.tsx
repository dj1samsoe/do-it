type BreaklineProps = {
  className?: string;
  [propName: string]: string | undefined;
};

export default function Breakline({
  className = "",
  ...others
}: BreaklineProps) {
  return <div className={`border-t-2 my-4 ${className}`} {...others}></div>;
}
