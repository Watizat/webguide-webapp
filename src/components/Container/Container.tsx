interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div id="Container" className="flex flex-col w-full h-full px-4 my-auto">{children}</div>
  );
}
