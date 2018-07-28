import React from 'react';
import takiLogo from "../../server/takiImages/TAKI_logo.png";

export default class LoginContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            errMessage: null
        };

        this.login = this.login.bind(this);
        this.renderLoginErrorMessage = this.renderLoginErrorMessage.bind(this);
    }

    render() {
        const imgStyle = {
            width: 'fit-content',
            height: 'fit-content',
            alignSelf: 'center'
        };
        const loginFormStyle = {
            width: 'fit-content',
            alignSelf: 'center',
            marginTop: '15px'
        };
        return (
            <div id='login-screen-container'>
                <div id='login-screen-inner-container'>
                    <img src="/images/taki-logo" alt="Taki Logo" style={imgStyle}/>
                    <div style={loginFormStyle}>
                        <form onSubmit={this.login}>
                            <label htmlFor="playerName">Name: </label>
                            <input type="text" name="playerName"/>
                            <input type="submit" value="Login"/>
                        </form>
                        <p className='error'>{this.state.errMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    login(formEvent) {
        formEvent.preventDefault();
        let playerName = {"playerName": formEvent.target.elements.playerName.value};
        fetch('/users/addPlayer', {method: 'POST', body: JSON.stringify(playerName), credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 403) {
                        this.setState({errMessage: "User name already exist, please try another one"});
                    }
                    this.props.loginErrorHandler();
                    return null;
                }
            })
            .then(player => {
                if (player !== null) {
                    console.log("\"" + player._playerName + "\" has logged in and was added to the players list");
                    this.setState({errMessage: null});
                    this.props.loginSuccessHandler();
                }
            });
        return false;
    }

    renderLoginErrorMessage() {
        if (this.state.errMessage) {
            return (
                <div>
                    {this.state.errMessage}
                </div>
            );
        }
        return null;
    }

}
