import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = { onChangePage: (i: number) => void };

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);
