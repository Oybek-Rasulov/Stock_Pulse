import { useState, useEffect } from "react"; 
import axios from 'axios';
import NewsItem from "./NewsItem";
import assets from "../assets";
import NewsDetails from "./NewsDetails";

// const apiKey = "7987dd19f16346448be62d81d126af3e";
// const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`;

function News({searchData}) {
    const [ news, setNews ] = useState([]);
    const [ apiNews, setApiNews ] = useState([]);
    const [ isSave, setIsSave ] = useState({save: false, title: ""});

    function saveContent(title) {
        setIsSave((current) => {
            return {...current, save: !current.save, title: title}
        })
    }

    useEffect(() => {
        async function fetchNews() {
          try {
            const res = await axios.get('https://stockpulsebackend.onrender.com/api/news');
      
            // Sort by newest date
            const sorted = res.data.articles.sort((a, b) => {
              return new Date(b.publishedAt) - new Date(a.publishedAt);
            });
      
            setApiNews(sorted);
            setNews(sorted);
          } catch (error) {
            console.error("Failed to fetch news from backend:", error);
          }
        }
      
        fetchNews();
      }, []);
      
      

    useEffect(() => {
        if(searchData.length < 2) {
            setNews(apiNews);
        }else {
            const filteredData = news.filter(item => item.title.toLowerCase().includes(searchData.toLowerCase()))
            setNews(filteredData)
        }
    }, [searchData])

    async function saveNews(data) {
        try {
            await axios.post("https://stockpulsebackend.onrender.com/saveNews", {newsData: data});
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="news-container">
            {
                news.map((content, i) => <div key={i}>
                    <div className="news-content mb1">
                        <NewsItem newsImage={content.urlToImage? content.urlToImage : assets.noImage} newsTitle={content.title} newsContent={content.content} />
                    </div>
                    <NewsDetails date={content.publishedAt} />
                </div>)
            }
        </div>
    )
}

export default News
