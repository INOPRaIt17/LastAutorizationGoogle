import React from 'react';
import s from '.././App.module.css';
import PersonList from '../api/Personlist';

class SignIn extends React.Component {
	componentDidMount() {
		window.gapi.load('auth2', function () {
			window.gapi.auth2
				.init({
					client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
				}).then(() => console.log('Initialization Ok'), () => console.log('init ERR'))
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
		const { name } = this.state
		return (
			<div>
				<div>
					{name && <h2>Привет, {name}!</h2>}
				</div>
				<div className={s.btnTwo}>
					{name && <button className="btn btn-primary" onClick={this.signOut}>Log out</button>}
				</div>
				<div className="container">
					<div className='row'>
						<div className="col">
							<div className={s.card}>
								<div className={s.container}>
									{name && <h4 className={s.textSignIn}>Это список пользователей</h4>}
									{name && <PersonList />}
									<div className={s.textSignIn}>
										{!name && <h4>Авторизируйтесь через Google</h4>}
									</div>
									<div className={s.btnOne}>
										{!name && <button className="btn btn-primary" onClick={this.signIn}>Log In</button>}
									</div>
								</div>
							</div>
						</div>
					</div>



				</div>
			</div>
		)
	}
}


export default SignIn;