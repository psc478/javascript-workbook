'use strict';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allofit: []
    }

    this.markComplete = this.Remove.bind(this);
  }

  componentDidMount() {
    fetch('https://api.openaq.org/v1/cities').then((result) => {
      return result.json();
    }).then((numbers) => {
      this.setState({
        allofit: numbers.results
      })
    });
  }

Remove(currentNumber) {
  let list = this.state.results;
  list.splice(currentNumber, 1);
  this.setState({
    allofit: list
  })
}

render() {
  const list = [];
  //debugger;
  this.state.allofit.forEach((item, index) => {
    list.push(
      <div key={index}>
        <p key={index}>{item.city}</p>
        <p>{item.city}</p>
        <p>{item.locations}</p>
        <button onClick={ () => {this.Remove(index)} }>Remove</button>
      </div>
    );
  });
  return (
    <div>
      {list}
    </div>
  )
}
}

ReactDOM.render(<Blog />, document.getElementById('blog'));
