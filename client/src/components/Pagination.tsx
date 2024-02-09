import "../styles/pagination.css";
const Pagination = () => {
    return ( 
        <div className="flex regular-font mt-8 justify-center font-semibold">
            <div className="pagination-item">
                <p>&#10094;</p>
            </div>
            <div className="pagination-item"><p>1</p></div>
            <div className="pagination-item"><p>2</p></div>
            <div className="pagination-item"><p>...</p></div>
            <div className="pagination-item"><p>10</p></div>
            <div className="pagination-item">
                <p>&#10095;</p>
            </div>
        </div>
     );
}
 
export default Pagination;