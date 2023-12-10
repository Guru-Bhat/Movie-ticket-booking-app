import { useState, useEffect } from "react";
import SEAT from "../Constants/SeatOptions";
import Button from "../Components/button";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Label
} from "reactstrap";
import TAB_OPTIONS from "../Constants/tabOptions";
import "../styles/commonStyles.css"

export default function SelectSeatType({ onNext }) {
  const [seatCount, setSeatCount] = useState(0);
  const [seatType, setSeatType] = useState(null);
  const [isNextDisable, setNextDisable] = useState(true);

//   useEffect(() => {
//     if (seatCount > 0 && seatType) setNextDisable(false);
//   }, [seatCount, seatType]);

//   useEffect(() => {
//     if (seatCount > 0 && seatType) setNextDisable(false);
//   },[]);

 const updateSeatCount=(i)=>{
    if(seatType){
    setSeatCount(i)
    }
  }

  function RenderSeatCounts() {
    var rows = [];
    for (let i = 1; i <= SEAT.MAX_SEAT_ALLOWED; i++) {
        console.log("seatCount",seatCount);
    
      rows.push(
        <div>
        <PaginationItem key={i} active={(seatCount === i && seatType) ? true : false}>
          <PaginationLink active={(seatType) ? true : false} onClick={()=>updateSeatCount(i)}>{i}</PaginationLink>
        </PaginationItem>
        
        </div>
      );
      
   
    }
    return rows;
  }
  

  function handleNext() {
    onNext(TAB_OPTIONS.SEAT_SELECTION, {seatCount, seatType});
  }

  return (
    <Row>
      <Row className="rowStyle">
        <Col>
          <Label>Select Seat Type</Label>
          <ListGroup horizontal>
            {SEAT.SEAT_TYPE.map((item) => (
              <ListGroupItem
                key={item.type}
                active={seatType === item.type ? true : false}
                onClick={() => setSeatType(item.type)}
              >
                {item.title} (₹{SEAT.SEAT_PRICE[item.type]}.00/seat)
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      
      <Row className="rowStyle">
        <Col>
          <Label>Total Seats</Label>
          <Pagination aria-label="Page navigation example">
            <RenderSeatCounts />
          </Pagination>
          <p className={(seatCount && seatType) ? "showMessage" : "hideMessage"}>You selected {seatCount} seats</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>
            Total Price:{" "}
            <b>
              ₹
              {seatCount > 0 && seatType
                ? SEAT.SEAT_PRICE[seatType] * seatCount
                : 0}
              .00
            </b>
          </Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleNext} title="Next" disabled={(seatCount && seatType)? false : true} />
        </Col>
      </Row>
    </Row>
  );
}
