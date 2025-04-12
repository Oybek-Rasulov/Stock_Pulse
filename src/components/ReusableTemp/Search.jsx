import assets from '../assets';

function Search({sendSearch}) {
    return (
        <>
            <form className='search'>
                <input type="text" placeholder="Qidirish..." onChange={(e) => sendSearch(e.target.value)} />
                <img src={assets.search} alt="search icon" />
            </form>  
        </>
    )
}

export default Search
