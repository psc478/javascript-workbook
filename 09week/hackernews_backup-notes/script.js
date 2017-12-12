'use strict';

class List extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <section className="blog">
          <Article title="First article" />
          <Article title="Second article" />
          <Article title="Third passage" />
          <Article title="Fourth passage" />
        </section>
      </div>
    )
  }
}

class Article extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text = props.text
    }
  }

  render() {
    return {
      <div>
        <h3>{this.props.text}</h3>
        {!this.props.title.includes('article') &&
          <p><i>WARNiNG: This is not a valid article </i></p>}
        <p>Lorem ipsum dolor sit amet, consectutur adipsiscing elit, sed dolo eisusmod tempor dicidndunt ut ajdf tidkc lskd te.</p>
      </div>
    }
  }
}


ReactDOM.render(<List />, document.getElementById('hacker-news'))
