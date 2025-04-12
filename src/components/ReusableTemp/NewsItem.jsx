
function NewsItem({newsImage, newsTitle, newsContent}) {
    return (
        <>
            <img className="news-image" src={newsImage} alt="news image" />
            <div className="news-text">
                <h3>{newsTitle}</h3>
                <p>{newsContent.substr(0, 200)}</p>
            </div>
        </>
    )
}

export default NewsItem
