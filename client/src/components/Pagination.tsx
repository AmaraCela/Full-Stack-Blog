import { useEffect, useState } from "react";
import "../styles/pagination.css";

const Pagination = () => {

    const nrPages = 10;
    const paginationSlots = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [displayingIndexes, setDisplayingIndexes] = useState<number[]>([])

    const [cursorLeft, setCursorLeft] = useState("not-allowed");
    const [cursorRight, setCursorRight] = useState("pointer");


    useEffect(() => {
        let newIndexes = [];

        for (let i = currentPage; i < currentPage + paginationSlots; i++) {
            newIndexes.push(i);
        }

        setDisplayingIndexes(newIndexes);
    }, []);

    useEffect(() => {

        if (currentPage === 1) {
            setCursorLeft("not-allowed");
        }

        if (currentPage === (nrPages - 1)) {
            setCursorRight("not-allowed");
        }

    }, [currentPage])


    function moveLeft() {
        if (currentPage > 1) {
            setCursorRight("pointer");

            if (displayingIndexes[0] === currentPage) {
                let newIndexes = [(currentPage - 1), ...displayingIndexes];
                newIndexes.pop();
                setDisplayingIndexes(newIndexes);
            }

            setCurrentPage((currentPage) => currentPage - 1);
        } else {
            setCursorLeft("not-allowed");
        }
    }

    function moveRight() {
        if (currentPage < nrPages - 1) {
            setCursorLeft("pointer");

            if (displayingIndexes[paginationSlots - 1] === currentPage) {
                
                let newIndexes = displayingIndexes.slice(1);
                newIndexes = [...newIndexes, (currentPage + 1)]
                setDisplayingIndexes(newIndexes);
            }

            setCurrentPage(currentPage + 1);
        } else {
            setCursorRight("not-allowed");
        }
    }

    function moveStart() {
        setCursorRight("pointer");
        setCursorLeft("not-allowed");
        setCurrentPage(1);

        let newIndexes = [];

        for (let i = 0; i < paginationSlots; i++) {
            newIndexes[i] = i + 1;
        }
        setDisplayingIndexes(newIndexes);
    }

    function moveEnd() {
        setCursorLeft("pointer");
        setCursorRight("not-allowed");
        setCurrentPage(nrPages - 1);
        let newIndexes = [];
        let value = nrPages - paginationSlots;
        for (let i = 0; i < paginationSlots; i++) {
            newIndexes[i] = value;
            value++;
        }

        setDisplayingIndexes(newIndexes);
    }

    function movePage(direction: string): void {
        switch (direction) {
            case ("first"):
                {
                    moveStart();
                    break;
                }
            case ("left"):
                {
                    moveLeft();
                    break;
                }
            case ("last"):
                {
                    moveEnd();
                    break;
                }
            case ("right"): {
                moveRight();
                break;
            }
        }
    }


    return (
        <div className="flex regular-font mt-8 justify-center font-semibold">
            <div style={{ cursor: cursorLeft }} className="pagination-item first-arrow" title="first" onClick={() => movePage("first")}>
                <p>&#10094;&#10094;</p>
            </div>
            <div style={{ cursor: cursorLeft }} className="pagination-item previous-arrow" title="previous" onClick={() => movePage("left")}>
                <p>&#10094;</p>
            </div>
            {displayingIndexes.map((item, i) => (
                <div key={item} className={`pagination-item page ${item === currentPage ? 'active' : ''}`}>
                    <p>{item}</p>
                </div>
            ))}
            <div style={{ cursor: cursorRight }} className="pagination-item next-arrow" title="next" onClick={() => movePage("right")}>
                <p>&#10095;</p>
            </div>
            <div style={{ cursor: cursorRight }} className="pagination-item last-arrow" title="last" onClick={() => movePage("last")}>
                <p>&#10095;&#10095;</p>
            </div>
        </div>
    );
}

export default Pagination;