import "./scss/main.scss"
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(() => {
            user.setIsAuth(true)
            user.setUser(user)

        }).catch(e => e.message).finally(() => setLoading(false))
    }, [localStorage]);

    if(loading) {
        return <Spinner animation={"border"} variant="light" style={{position: 'relative', right: '50%', left: '50%', marginTop: '250px'}}/>
    }
  return (
      <BrowserRouter>
          <NavBar/>
        <AppRouter/>
      </BrowserRouter>
  );
})

export default App;
