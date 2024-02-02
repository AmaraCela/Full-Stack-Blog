const Home = () => {
    let name = 'mario';
    console.log("yes")
    const handleClick = ()=>{
        name = 'luigi'
        console.log(name)
    }

    return (  
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click me</button>
            <p>{name}</p>
        </div>
    );
}
 
export default Home;
