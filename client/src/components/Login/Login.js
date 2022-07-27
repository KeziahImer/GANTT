import React from 'react'
import './Login.css'

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name
    }

    render() {
        return (
            <form action="http://localhost:3000/" method="post">
                <div>
                    <label for="name">Username :</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label for="mail">Password :</label>
                    <input type="text" id="password" name="password" />
                </div>
                <button type="submit">{this.name}</button>
            </form>
        );
    }
}

export default function Login() {
  return (
    <div id='Login'>
        <h1>Login</h1>
        <Form name='Connexion'/>
    </div>
  );
}
