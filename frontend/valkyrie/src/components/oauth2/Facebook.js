import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        picture: ''
    };

    responseFacebook = response => {
        console.log(response);
        if(response.status !== 'unknown')
        this.setState({
            auth: true,
            name: response.name,
            picture: response.picture.data.url
        });
    }

    componentSalir = () => {
       console.log('Facebook btn salir');
      // alert('Evento on click')
        this.setState({
            auth: false,
            name: '',
            picture: ''
        });
    }



    componentClicked = () => {
       console.log('Facebook btn clicked');
      
    }
    render(){
        let facebookData;

        this.state.auth ?
        facebookData = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding: '20px',
                    color: '#000'
                }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Bienvenido {this.state.name}!</h2>
                    <a href="#" onClick={this.componentSalir}>
              Logout
            </a>
                </div>
            ) : 
            facebookData = (<FacebookLogin
                appId="574582110524963"
                autoLoad={false}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                textButton={"Iniciar Sesión con Facebook"}
                
                
                
                />);

        return (
            <>
                {facebookData}
            </>
        );
    }
}

    
