import useArray from "../../../util/hooks/useArray";

import BeginBranch from "../../../assets/branches/beginBranch.svg";
import BeginBranchEnd from "../../../assets/branches/beginBranchEnd.svg";
import ContBranch from "../../../assets/branches/contBranch.svg";
import BranchEnd from "../../../assets/branches/branchEnd.svg";
import Straight from "../../../assets/branches/straight.svg";
import StraightEnd from "../../../assets/branches/StraightEnd.svg";

function useBranches() {
  const { array: branchArray, setArray: setBranchArray } = useArray<string>([]);

  const addStraightBranch = (
    directoryName: string,
    newBranchArray: string[]
  ) => {
    if (
      document.getElementById(directoryName) == null ||
      directoryName == null
    ) {
      return;
    }
    const children = document.getElementById(directoryName)!.children;
    for (let i = 0; i < children.length; i++) {
      // add straight branch for every file in the opened folder
      newBranchArray.push(Straight);
      // recursively add branches for opened folders
      if (
        children[i].classList.contains("directory") &&
        children[i].getAttribute("data-opened") == "true"
      ) {
        addStraightBranch(
          children[i].getAttribute("data-name")!,
          newBranchArray
        );
      }
    }
  };

  const updateBranches = (directoryName: string) => {
    // must use a non-state array because states take time to update and always propagate rerender
    const newBranchArray: string[] = [];
    if (document.getElementById(directoryName) == null) {
      return;
    }
    const children = document.getElementById(directoryName)!.children;
    for (let i = 0; i < children.length; i++) {
      // regular branch for direct children of folder
      newBranchArray.push(ContBranch);
      // straight branch for layered children of folder
      if (
        children[i].classList.contains("directory") &&
        children[i].getAttribute("data-opened") == "true"
      ) {
        addStraightBranch(
          children[i].getAttribute("data-name")!,
          newBranchArray
        );
      }
    }
    // folder with only one item
    if (newBranchArray.length == 1) {
      newBranchArray[0] = BeginBranchEnd;
    } else {
      // for first item in folder
      newBranchArray[0] = BeginBranch;
      // change last straight branch to smooth end
      if (newBranchArray[newBranchArray.length - 1] == Straight) {
        newBranchArray[newBranchArray.length - 1] = StraightEnd;
      }
      // change last regular branch to no tail
      else {
        newBranchArray[newBranchArray.length - 1] = BranchEnd;
      }
    }
    setBranchArray(newBranchArray);
  };

  return { branchArray, updateBranches };
}

export default useBranches;
