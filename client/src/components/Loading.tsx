import ReactLoading from 'react-loading';
import { useEffect } from 'react';

const Loading = () => {
    useEffect(() => {
        window.scrollTo(0,0);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
    <div className='w-full h-full bg-opacity-60 bg-black top-0 scroll absolute z-10 flex items-center flex-col justify-center'>
        <ReactLoading type='cylon' color='#9cbbf2' height={150} width={150}/>
        <p className='text-white regular-font text-3xl loading text-center'>Loading...</p>
    </div>
    );
}

export default Loading;