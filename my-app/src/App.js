import React from 'react';
import s from './App.module.css'

class App extends React.Component {
	componentDidMount() {
		window.gapi.load('auth2', function () {
			window.gapi.auth2
			.init({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
			}).then(() => console.log('Initialization Ok'), ()=>console.log('init ERR'))
		})
	}

	state = {
		name: null
	}

	signIn = () => {
		const _authOK = (googleuser) => {
			this.setState({
				name: googleuser.getBasicProfile().getName()
			})
			
		}

		const _authERR = () => {
			console.log('Error')
		}

		const GoogleAuth = window.gapi.auth2.getAuthInstance()
		GoogleAuth.signIn({
			scope: 'profile email'
		}).then(_authOK, _authERR)
	}

	signOut = () => {
		const GoogleAuth = window.gapi.auth2.getAuthInstance()
		GoogleAuth.signOut().then(
			() => {
			this.setState({
				name: null,
			})
		},
			() => console.log('signOut ERR')
		)
	}

	render() {
		const {name} = this.state

		return (
			<div className={s.textOne}>
				{name && <h2>Привет, {name}!</h2>}
				{!name && <button className="btn btn-primary" onClick={this.signIn}>Log In</button>}
				{name && <button className="btn btn-primary" onClick={this.signOut}>Log out</button>}
			</div>
		)
	}
}


export default App;