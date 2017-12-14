'use strict';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }

    this.locationSearch = this.locationSearch.bind(this);
  }

  /*This function fetches appends the inputted latitude and longitude and appends them to the API url to fetch the data.
  */
  locationSearch() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const dataList = [];
      let url = `https://api.darksky.net/forecast/84e636b4f181398b4c799662fd1d9914/${this.myLatitude()},${this.myLongitude()}`;
      //console.log("URL: ",url);
    fetch(proxyurl+url).then((result) => {
      return result.json();
      //debugger;
    }).then((response) => {
      //debugger;
      dataList.push(response);
      this.setState({
        list: dataList
      })
      console.log("Post-fetch state: ",this.state);
      //debugger;
    });
}

/*This function renders the state info as an html element
*/
renderWeather() {
  return this.state.list.map(function($city) {
    return (<article>
              <div className="title">
                <h2>{$city.timezone}</h2>
              </div>
              <div>
                <p>Temperature: {$city.currently.temperature}</p>
                <p>Today: {$city.hourly.summary}</p>
                <p>This Week: {$city.daily.summary}</p>
              </div>
            </article>)
  });
}

/*This function takes the inputted latitude
*/
myLatitude () {
  let latInput, Lati;
  latInput = document.getElementById('myLatID');
  Lati = latInput.value;
  console.log("Lati: ",Lati);
  return Lati;
}

/*This function takes the inputted longitude
*/
myLongitude () {
  let longInput, Longi;
  longInput = document.getElementById('myLongID');
  Longi = longInput.value;
  console.log("Longi: ",Longi);
  return Longi;
}

render() {
  if (this.state.list.length !== 0) {
  willRender = 1;
  console.log("First things in list: ",this.state.list[0].latitude);
}

  return (
    <div>
      <header>
        <h1>Quick Weather</h1>
      </header>
      <div className="inputdiv">
        <input type="text" className="myInput" id="myLatID" onKeyUp={this.myLatitude} placeholder="Latitude: -90 (S) to 90 (N)"></input>
      </div>
      <div className="inputdiv">
        <input type="text" className="myInput" id="myLongID" onKeyUp={this.myLongitude} placeholder="Longitude: -180 (W) to 180 (E)"></input>
      </div>
      <div id="buttondiv">
        <button type="button" className="btn btn-info" onClick={this.locationSearch}>Search</button>
      </div>
      <div id="paragraphdiv">
          <p>(Examples --- New York: 42.3601,-71.0589, Los Angeles: 37.8267,-122.4233, Chicago: 41.8781,-87.6298)</p>
      </div>
      <main>
        {this.renderWeather()}
      </main>
    </div>
  );

}
}

ReactDOM.render(<Blog />, document.getElementById('blog'));
