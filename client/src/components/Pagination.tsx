import { useEffect, useState } from "react";
import "../styles/pagination.css";

const Pagination = () => {
    const nrPages = 4;
    const [rows, setRows] = useState<JSX.Element []>([]);
    const [activeIndex,setActiveIndex] = useState<number>(0);
    const [pages, setPages] = useState<HTMLElement[]>([]);

    const [leftArrow,setLeftArrow] = useState<HTMLElement|null>();
    const [firstArrow, setFirstArrow] = useState<HTMLElement|null>();

    useEffect(()=>{
        console.log("here");
        setPages(Array.from(document.querySelectorAll(".page")));
        const left = document.querySelector(".previous-arrow") as HTMLElement;
        const first = document.querySelector(".first-arrow") as HTMLElement;
        if(left)
        {
            setLeftArrow(left);
        }
        if(first)
        {
            setFirstArrow(first);
        }
        leftArrowsInactive();
    },[leftArrow,firstArrow]);


    function leftArrowsInactive()
    {
        if(leftArrow)
        {
            leftArrow.style.cursor = "not-allowed";
        }
        if(firstArrow)
        {
            firstArrow.style.cursor = "not-allowed";
        }
    }

    function leftArrowsActive()
    {  
        if(leftArrow)
        {
            leftArrow.style.cursor = "pointer";
        }
        if(firstArrow)
        {
            firstArrow.style.cursor = "pointer";
        } 
    }

    function rightArrowsInactive()
    {
        const nextArrow:HTMLElement|null = document.querySelector(".next-arrow");
        const lastArrow:HTMLElement|null = document.querySelector(".last-arrow");
        if(nextArrow)
        {
            nextArrow.style.cursor = "not-allowed";
        }
        if(lastArrow)
        {
            lastArrow.style.cursor = "not-allowed";
        }
    }

    function rightArrowsActive()
    {
        const nextArrow:HTMLElement|null = document.querySelector(".next-arrow");
        console.log(nextArrow);
        const lastArrow:HTMLElement|null = document.querySelector(".last-arrow");
        if(nextArrow)
        {
            nextArrow.style.cursor = "pointer";
        }
        if(lastArrow)
        {
            lastArrow.style.cursor = "pointer";
        }
    }

    function createPages()
    {
        if(nrPages>4)
        {
           rows.push(<div className="pagination-item page active" id="0"><p>{1}</p></div>)
           rows.push(<div className="pagination-item page" id="1"><p>{2}</p></div>)
           rows.push(<div className="pagination-item dots"><p>...</p></div>)
           rows.push(<div className="pagination-item page" id={(nrPages-2).toString()}><p>{nrPages-1}</p></div>)
           rows.push(<div className="pagination-item page" id={(nrPages-1).toString()}><p>{nrPages}</p></div>)
        }
        else
        {
            for(let i=0;i<nrPages;i++)
            {
                if(i==0)
                {
                    rows.push(<div className="pagination-item page active"><p>{i+1}</p></div>)   
                }
                else
                {
                    rows.push(<div className="pagination-item page"><p>{i+1}</p></div>)
                }
            }
        }
    }
    createPages();
 

    function movePage(direction : string):void
    {
        switch(direction)
        {
            case('right'):{
                if(activeIndex<nrPages-1)
                {
                pages[activeIndex].classList.remove("active");
                pages[activeIndex+1].classList.add("active");
                if(activeIndex==nrPages-2)
                {
                  rightArrowsInactive(); 
                }
                setActiveIndex(activeIndex+1);
                leftArrowsActive();
                }
                break;
            }
            case('last'):{
                pages[activeIndex].classList.remove("active");
                pages[nrPages-1].classList.add("active");
                setActiveIndex(nrPages-1);
                rightArrowsInactive();
                leftArrowsActive();
                break;
            }
            case("left"):
            {
                if(activeIndex > 0)
                {
                    pages[activeIndex].classList.remove("active");
                    pages[activeIndex-1].classList.add("active");
                    if((activeIndex-1)===0)
                    {
                        leftArrowsInactive();
                    }
                    rightArrowsActive();
                    setActiveIndex(activeIndex-1);
                }
                break;
            }
            case('first'):
            {
                pages[activeIndex].classList.remove("active");
                pages[0].classList.add("active");
                setActiveIndex(0);
                leftArrowsInactive();
                rightArrowsActive();
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
            {rows}
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