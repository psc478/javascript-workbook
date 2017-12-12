'use strict';

class Hacker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    const articleList = [];
    for(let i=1; i<151; i++){
      const url = `https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`;

      const options = { //this is how we pass options to our fetch for future reference
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }

      /*
      *This function fetches the results of the API call
      *
      * @param url the url of the API
      * @param options This is something that the substitute teacher showed us, and I am unclear exactly what it does, but I want to keep it in my code for future reference
      */
      fetch(url, options).then((result) => {
        return result.json();
      }).then((response) => {
        //debugger;
        if (response.type == "story") {
          articleList.push(response);
        }
        this.setState({
          list: articleList
        })

          console.log("testing mount");

      });
    }
  }

  /*
  *This function allows the search bar to filter the results for only those that match the inputted string
  *
  *This was boiler plate code from W3 schools tweaked to fit here
  */
  mySearch(){
    let input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
         } else {
            li[i].style.display = "none";
       }
     }
  }

  render() {
    //debugger;
    return (
      <div>
        <header>
          <h1>Hacker News Clone</h1>
        </header>
        <div id="inputdiv">
          <input type="text" id="myInput" onKeyUp={this.mySearch} placeholder="Search for articles.."></input>
        </div>
        <div id="main">
            <ul id="myUL">{this.state.list.map((item, index) => {
              return <li className="articles" key={index}><a href={item.url}>{item.title}</a></li>;
            })
          }</ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Hacker />, document.getElementById('hacker-news'))
