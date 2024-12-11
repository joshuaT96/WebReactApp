import './App.css';
import SiteFooter from './components/common/SiteFooter';
import SiteNav from './components/common/SiteNav';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from 'react-router-dom'; 
import HomePage from './components/home/HomePage';
import Contents from './components/contents/contents';

import { Authenticator , View, Image, useTheme, Text} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config);




function App() {

  const components = {
    Header() {
      const { tokens } = useTheme();
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Solareff Logo"
            src="/img/pv-panel.png"
          />
        </View>
      );
    },

    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; 2024 Solareff
          </Text>
        </View>
      );
    }
  }

  return (
    
      <Authenticator loginMechanisms={['email']} components={components} hideSignUp={true}>
      {({signOut, user}) => (
        <div>
          <SiteNav logOut={signOut}/>
            <Routes>
              <Route path='*' element={<HomePage/>}/>
              <Route path='/' exact={true} element={<HomePage/>}/>
              <Route path='/contents' element={<Contents/>}/>
           </Routes>
          <SiteFooter/>
        </div>
      )}
      </Authenticator>

  );
}

export default App;
