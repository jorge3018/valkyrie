import React, { Component }  from 'react';

class FacebookLogin extends Component {
    componetDidMount(){
      window.fbAsyncInit = () => {
        window.FB.init({
            appId   : '574582110524963',
            xfbml   : true,
            version : 'v12.0'
      });

    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
}
    render() {
        return (
        <div>
            <h1> logueo Valkyrie! </h1>
               <div className="fb-login-button"
                    data-width=""
                    data-size="large" 
                    data-button-type="login_with"
                    data-layout="default"
                    data-auto-logout-link="true"
                    data-use-continue-as="true">
            </div>
        </div>
        );
    }
}

export default FacebookLogin;
