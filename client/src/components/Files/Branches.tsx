interface Props {
  branchArray: string[];
  depth: number;
}

function Branches({ branchArray, depth }: Props) {
  return (
    <div className="branch" style={{ left: depth * 24 + "px" }}>
      {branchArray.map((value, index) => (
        <img src={value} alt="" key={index} />
      ))}
    </div>
  );
}

export default Branches;
