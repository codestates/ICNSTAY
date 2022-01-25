import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Table = styled.div`
  display: table;
  width: 800px;
  margin: 1rem;
  border: 1px solid gray;
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableColumn = styled.div`
  display: table-cell;
  width: 200px;
  padding: 0.5rem 1rem;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  &:hover {
    font-weight: 700;
    color: pink;
  }
`;

const List = ({ list }) => {
  return (
    <Table>
      <TableRow>
        <TableColumn>호텔명</TableColumn>
        <TableColumn>체크인</TableColumn>
        <TableColumn>체크아웃</TableColumn>
        <TableColumn>입찰가격</TableColumn>
      </TableRow>
      {list.map(
        ({ accommodationId, checkInDate, checkOutDate, biddingPrice, accommodation }, index) => {
          return (
            <TableRow key={index}>
              <TableColumn>
                <StyledLink to={`/accommodation/${accommodationId}`}>
                  {accommodation.name}
                </StyledLink>
              </TableColumn>
              <TableColumn>{checkInDate}</TableColumn>
              <TableColumn>{checkOutDate}</TableColumn>
              <TableColumn>{biddingPrice}</TableColumn>
            </TableRow>
          );
        }
      )}
    </Table>
  );
};

export default List;
