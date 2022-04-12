import { useState,useEffect } from 'react'
import axios from "axios";
//import logo from './logo.svg'
import Spinner from "./components/Spinner";
import './App.css'
import cloud_day from "../src/assets/svgs/cloud_day.svg";
import cloudy_night  from "../src/assets/svgs/cloudy_night.svg";
import  night  from "../src/assets/svgs/night.svg";
import  rainy from "../src/assets/svgs/rainy.svg";
import sunny  from "../src/assets/svgs/sunny.svg";
import  thunderstorm from "../src/assets/svgs/thunderstorm.svg";
import snow  from "../src/assets/svgs/snow.svg";
import mist  from "../src/assets/svgs/mist.svg";

function App() {
  const [nloader, setNLoader] = useState(false)
  const [wloader, setWLoader] = useState(false)
  const [newsError, setNewsError] = useState("")
  const [weatherError, setWeatherError] = useState("")
  const [newsList, setNewsList] = useState([])
  const [hours_, setHourly] = useState([]);
  const [weatherInfor, setWeatherInfor] = useState({})
  const [team, setTeam] = useState(false)

  const hours = new Date().getHours();
  const getWeatherNews = () => {
    setWLoader(true);
  axios.post("http://localhost:3000/weather", {
      lat: 0.34,
      lon: 32.58
    }).
     then((res) => {

       if(res.status==200){
        //console.log(res.data.data)
        setWeatherInfor(res.data.data);
        setHourly(res.data.data.hourly)
        setWLoader(false);
       }
     })
    .catch(function (error) {
      setWeatherError(error.message);
      setWLoader(false);
     });
    
  };
 
  const getGlobalNews = () => {
    setNLoader(true);
    axios
    .get("http://localhost:3000/global")
    .then((res) => {
       if(res.status==201){
        //console.log(res.data.data.value);
        setNewsList(res.data.data.value);
        setNLoader(false);
       }
     }).catch((error) => {
      //console.log(error.message);
      setNewsError(error.message);
      setNLoader(false);
     }); 
  };

  useEffect(() => {
    getGlobalNews();
    getWeatherNews();
  },[]);

  // React.useEffect(() => {
  //   if (data.length !== 0) {
  //     setIsLoading(false);
  //   }
  //   console.log(data);
  // }, [data]);

  return (
   
    <div className="App">
      <header className="Header">
        You Current news and Weather update.
      </header>
     <div className="Header2">
       <div className="Tabs">
     <a className="TeamHeader8" href="https://www.monitor.co.ug/"> Local news</a>
     <div className={team == true ? "TeamHeader9" :"TeamHeader8"} onClick = {()=>{
       setTeam(!team)
     }}>Team members</div>
     </div>
     </div>
     {team == true && <div className="Groupmates">
     <div>Muwonge Khalifan 1900700558 19/U/0558</div>
     <div>Kiberu  Nuhu 1900700119 19/U/0119</div>
     <div>Nuwagaba Raymond 1900717708 19/U/17708/PS</div>
     <div>Kabugo Daniel 1900716476  19/U/16476/PS </div>
     <div>Muhangi Adrone 1900716917 19/U/16917/EVE</div>
       </div>}
      <div className="Content">
      <div className="NewsHeader">WEATHER UPDATE</div>
      <div className="WeatherGrid">
          <div className="WeatherInfor">
            {wloader == true ?
          <div className="NoNewsMessage2">
            <div className="SpinnerWrapper">
              <Spinner size="big" />
            </div>
          </div>:weatherInfor == {}?
              <div>No current weather Information</div>:
              <div  className="WeatherContent">
                <div className="WeatherHeader">
                <div className="NewsHeader3">{weatherInfor.timezone}</div>
                <div className="NewsHeader2">Current condition</div>
                {weatherInfor?.current?.weather[2]?.main == "Rain"?
                 <img src={rainy} alt="rainfall" className='WeatherIcon'/> :
                weatherInfor?.current?.weather[0]?.main == "Clear"?
                <>
                {(hours > 6 && hours < 20) ? <div><img src={sunny} alt="sunny" className='WeatherIcon'/></div>: 
                <div><img src={night} alt="night" className='WeatherIcon'/></div>
                }
                </>
                :weatherInfor?.current?.weather[0]?.main== "Thunderstorm"? 
                <div><img src={thunderstorm} alt="thunder" className='WeatherIcon'/></div>:weatherInfor?.current?.weather[0]?.main== "Drizzle"? 
                <div><img src={rainy} alt="drizzle" className='WeatherIcon'/></div>:weatherInfor?.current?.weather[0]?.main== "Snow"? 
                <div><img src={snow} alt="snow" className='WeatherIcon'/></div>:weatherInfor?.current?.weather[0]?.main== "Clouds"?
                <div>     
                  {(hours > 6 && hours < 20) ? <div><img src={cloud_day} alt="cloudy" className='WeatherIcon'/></div>:
                  <div><img src={cloudy_night} alt="cloudy" className='WeatherIcon'/></div>}</div>
                  :<div>
                    <img src={mist} alt="windy" className='WeatherIcon'/>
                  </div>
                }
                <div className="NewsHeader2">{weatherInfor?.current?.weather[0]?.main}</div>
                </div>
                <div className="WeatherHeaderInfor">
                <div className="NewsHeader4">{parseInt(weatherInfor?.current?.temp-273.15)}°C</div>
                <div className="Smalldata">
                <div className="NewsHeader5">Pressure: {weatherInfor?.current?.pressure} hPa</div>
                <div className="NewsHeader5">Humidity: {weatherInfor?.current?.humidity}%</div>
                </div>
                </div>
                <div className="WeatherHeaderInfor2">
                <div className="NewsHeader3">Hour's forcast</div>
                {hours_[0]?.weather[0].main == "Rain"?
                 <img src={rainy} alt="rainfall" className='WeatherIcon'/> :
                 hours_[0]?.weather[0]?.main == "Clear"?
                <>
                {(hours > 6 && hours < 20) ? <div><img src={sunny} alt="sunny" className='WeatherIcon'/></div>: 
                <div><img src={night} alt="night" className='WeatherIcon'/></div>
                }
                </>
                :hours_[0]?.weather[0]?.main== "Thunderstorm"? 
                <div><img src={thunderstorm} alt="thunder" className='WeatherIcon'/></div>
                :hours_[0]?.weather[0]?.main== "Drizzle"? 
                <div><img src={rainy} alt="drizzle" className='WeatherIcon'/></div>
                :hours_[0]?.weather[0]?.main== "Snow"? 
                <div><img src={snow} alt="snow" className='WeatherIcon'/></div>
                :hours_[0]?.weather[0]?.main== "Clouds"?
                <div>     
                  {(hours > 6 && hours < 20) ? <div><img src={cloud_day} alt="cloudy" className='WeatherIcon'/></div>:
                  <div><img src={cloudy_night} alt="cloudy" className='WeatherIcon'/></div>}</div>
                  :<div>
                    <img src={mist} alt="windy" className='WeatherIcon'/>
                  </div>
              }
                <div className="NewsHeader7">
                {hours_ != [] ? hours_[0]?.weather[0]?.description:"no data"} </div>
                </div>
              
              </div>}
     
          

        </div>
        </div>
        <div className="NewsHeader">GLOBAL NEWS UPDATE</div>
        <div className="NewsList">
          {nloader == true && (
          <div className="NoNewsMessage">
            <div className="SpinnerWrapper">
              <Spinner size="big" />
            </div>
          </div>
          )}
          { (newsList?.length > 0 && nloader == false) &&
              newsList.map((item,index) => (
              <div key={index} className="Item"> 
              <div className="Uppersection">
                {item.image?.thumbnail.contentUrl
                &&<img 
                 src={item.image.thumbnail.contentUrl}
                 alt="thumbnail"
                 className="Image"
                />}
                <div className="UppersectionRight">
                  <div className="Headline">{item.name}</div>
                  <div className="providerSection">
                  {item.provider[0].image?.thumbnail.contentUrl && ( <img 
                   src={item.provider[0].image?.thumbnail.contentUrl}
                   className="Image2"
                  />)}
                    <div className="ProviderText">By: {item.provider[0].description}</div>
                    </div>
                    <div className="date">{Date(item.datePublished)}</div>
                  </div>
                </div >
                 <div className='description'>
                 {item.description}
                 </div>
                 <a className='p-link'  href={item.url}>
                Click here for More 
                 </a>
              </div>
              ))}       
        </div> 
        
       
      </div>
    
    </div>
  )
}

export default App
