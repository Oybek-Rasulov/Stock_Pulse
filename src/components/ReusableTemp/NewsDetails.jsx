
function NewsDetails({date}) {

    const time = new Date(date);
    const formattedDate = time.toLocaleString("uz-UZ", {
        timeZone: "Asia/Tashkent",
      });

    return (
        <div className="news-details">
            <div>
                <p className="news-date">{formattedDate} UZ</p>
            </div>
        </div>
    )
}

export default NewsDetails
