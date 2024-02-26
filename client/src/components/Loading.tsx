import ReactLoading from 'react-loading';
import "../styles/loading.css";

const Loading = () => {
    return (<div className='w-full h-full bg-opacity-70 bg-black top-0 scroll absolute'>
        <ReactLoading type='cylon' color='#9cbbf2' height={100} width={100} className='absolute top-1/2 loading' />
        <p className='absolute top-2/3 text-white regular-font text-2xl loading text-center'>Loading...</p>
    </div>);
}

export default Loading;