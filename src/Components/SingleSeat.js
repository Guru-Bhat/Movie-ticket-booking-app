import { PaginationItem, PaginationLink } from "reactstrap";
import { useState } from "react";

export default function SingleSeat(
  seatNumber,
  row,
  blank,
  selected = false,
  updateSelected,
  available = true
) {
  const [active, setActive] = useState(selected);

  console.log("updateSelected",updateSelected)
  console.log("seatNumber",seatNumber)
  console.log("row",row)
  console.log("blank",blank)
  console.log("selected",selected)

  function handleSelected() {
    if (available) {
      setActive(!active);
      updateSelected(`${row}${seatNumber}`);
    }
  }
  const activeClass = active ? `active-single-seat` : `single-seat`;
  if (blank) {
    return <div className="blank-seat"></div>;
  } else {
    return (
      <PaginationItem>
        <PaginationLink
          onClick={handleSelected}
          className={available ? activeClass : "not-available"}
        >
           {`${row}${seatNumber}`}
        </PaginationLink>
      </PaginationItem>
    );
  }
}
