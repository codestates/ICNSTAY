import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Table = styled.div`
  display: table;
  width: 80%;
  border: 1px solid ${(props) => props.theme.black};
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableColumn = styled.div`
  display: table-cell;
  width: 200px;
  padding: 0.5rem 1rem;
  border-right: 1px solid ${(props) => props.theme.grey};
  border-bottom: 1px solid ${(props) => props.theme.grey};
`;

const StyledLink = styled(Link)`
  &:hover {
    font-weight: 700;
  }
`;

const List = ({ list }) => {
  return (
    <Table>
      <TableRow>
        <TableColumn style={{ fontWeight: '700' }}>호텔명</TableColumn>
        <TableColumn style={{ fontWeight: '700' }}>체크인</TableColumn>
        <TableColumn style={{ fontWeight: '700' }}>체크아웃</TableColumn>
        <TableColumn style={{ fontWeight: '700' }}>입찰가격</TableColumn>
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
