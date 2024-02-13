import { useEffect, useState } from "react";
import "../styles/pagination.css";

const Pagination = () => {
    const nrPages = 10;
    const paginationSlots = 4;
    const [currentPage,setCurrentPage] = useState(1);

    const [displayingIndexes,setDisplayingIndexes] = useState<number[]>([])
   
    useEffect(()=>{
        let newIndexes = [];
        for (let i = currentPage; i < currentPage + paginationSlots; i++) {
            newIndexes.push(i);
        }
        setDisplayingIndexes(newIndexes);
    },[]);
    

    function movePage(direction:string):void{
        switch(direction)
        {
            case("first"):
            {
                setCurrentPage(1);
                let newIndexes = [];
                for(let i=0;i<paginationSlots;i++)
                {
                    newIndexes[i] = i+1;
                }
                setDisplayingIndexes(newIndexes);
                break;
            }
            case("left"):
            {
                if(currentPage>1)
                {
                    if(displayingIndexes[0]===currentPage)
                    {
                        let newIndexes = [];
                        for(let i=0;i<paginationSlots;i++)
                        {
                            newIndexes[i] = currentPage-1+i;
                        }
                        setDisplayingIndexes(newIndexes);
                    }
                    setCurrentPage(currentPage-1);
                }
                break;
            }
            case("last"):
            {
                setCurrentPage(nrPages-1);
                let newIndexes = [];
                let value = nrPages-paginationSlots;
                for(let i=0;i<paginationSlots;i++)
                {
                    newIndexes[i] = value;
                    value++;
                }
                setDisplayingIndexes(newIndexes);
                break;
            }
            case("right"):{
                if(currentPage<nrPages-1)
                {
                    if(displayingIndexes[paginationSlots-1]===currentPage)
                    {
                        let newIndexes = [];
                        for(let i=0;i<paginationSlots;i++)
                        {
                            newIndexes[i] = currentPage-paginationSlots+i+2;
                        }
                        setDisplayingIndexes(newIndexes);
                    }
                    setCurrentPage(currentPage+1);
                }
                break;
            }
        }
    }


    return (
        <div className="flex regular-font mt-8 justify-center font-semibold">
            <div className="pagination-item first-arrow" title="first" onClick={()=>movePage("first")}>
                <p>&#10094;&#10094;</p>
            </div> 
            <div className="pagination-item previous-arrow" title="previous" onClick={()=>movePage("left")}>
                <p>&#10094;</p>
            </div>           
            {displayingIndexes.map((item,i)=>(
                <div key={item} className={`pagination-item page ${item===currentPage?'active':''}`}>
                    <p>{item}</p>
                </div>
            ))}
            <div className="pagination-item next-arrow" title="next" onClick={()=>movePage("right")}>
                <p>&#10095;</p>
            </div>
            <div className="pagination-item last-arrow" title="last" onClick={()=>movePage("last")}>
                <p>&#10095;&#10095;</p>
            </div>
        </div>
     );
}
 
export default Pagination;