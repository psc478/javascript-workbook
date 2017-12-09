/*

'use strict';

class ListUsers extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
    this.test = this.test.bind(this);
  }

  test(){
    let fetchedUsers = [];

    let p = fetch('https://reqres.in/api/users?page=2');
    let jsonPromise = p.then(function(response){
      console.log("status of my respons",(response.status));
      return response.json();
    });

    fetchedUsers = jsonPromise.then(function(data){
      console.log("the data is ", data);
      //this is where you update your state
      fetchedUsers.push(<div>QQQ</div>);
      fetchedUsers.push(<div>LLL</div>);
      return fetchedUsers;
    //  console.log("fetchedUsers: ", fetchedUsers);
    });
    this.setState({users: fetchedUsers});
  }

  render(){

    //console.log("result of my fetch",p);

    this.test();

    return(
      <div>
        {this.state.users}
      </div>
    )
  }


}

ReactDOM.render(<ListUsers />, document.getElementById('fetch'))

*/

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
      return (<li key={$user.id}>{$user.first_name} {$user.last_name} <img src={$user.avatar}></img></li>)
    });
  }

  render(){
    if(this.state.users.length == 0) {
      this.initialDraw();
    }
    console.log("my state ", this.state)


    return(

      <div>
        User List
        {this.renderUsers()}
      </div>
    )
  }

}

ReactDOM.render(<ListUsers />, document.getElementById('fetch'));
