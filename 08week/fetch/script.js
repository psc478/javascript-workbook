'use strict';

class ListUsers extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users: []
    }
    this.initialDraw = this.initialDraw.bind(this);
  }

  initialDraw(){
      fetch('https://reqres.in/api/users?page=2').then((response) =>{
        console.log("the status of my response ",response.status);
        console.log("is this undefined? ", this);
        return response.json();
      }).then((random) => {
        console.log("the data is ", random);
        console.log("list of users",  random.data)
        this.setState({
          users: random.data
        });
      });
  }

  renderUsers() {
    return this.state.users.map(function($user) {
      //return (<li key={$user.id}>{$user.first_name} {$user.last_name} {$user.avatar}</li>)
      return (<article key={$user.id}>
                <div className="title">
                  <h2>{$user.first_name} {$user.last_name}</h2>
                </div>
                <img className="pic" src={$user.avatar}></img>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </article>)
    });
  }

/*className="col-md-2 col-md-offset-5 col-lg-2 col-lg-offset-5 col-sm-2 col-sm-offset-5 col-xs-4 col-xs-offset-4"*/

  render(){
    if(this.state.users.length == 0) {
      this.initialDraw();
    }
    console.log("my state ", this.state)

    return(

      <div>
        <header>
          <h1>User List</h1>
        </header>
        <main>
          {this.renderUsers()}
          {/*}<button className="btn btn-success col-md-2 col-md-offset-5 col-lg-2 col-lg-offset-5 col-sm-2 col-sm-offset-5 col-xs-4 col-xs-offset-4">Do Nothing</button>*/}
        </main>
      </div>
    )
  }

}

ReactDOM.render(<ListUsers />, document.getElementById('fetch'));
