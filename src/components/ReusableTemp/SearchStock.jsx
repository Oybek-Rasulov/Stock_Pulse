import assets from '../assets';

function SearchStock({stockSearch}) {
    return (
        <>
            <form className='search'>
                <input type="text" placeholder="Qidirish..." onChange={(e) => stockSearch(e.target.value)} />
                <img src={assets.search} alt="search icon" />
            </form>  
        </>
    )
}

export default SearchStock
