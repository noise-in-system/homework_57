import './App.css'
import {Header} from "./comp/Header";
import Body from "./comp/Body";
import Footer from "./comp/Footer";
import {Provider} from 'react-redux';
import store from './store/store';


function App() {
    const onMouseUp = () => {
        console.log('top up')
    }
    return (
        <Provider store={store}>
            <div className={'container'} onMouseUp={onMouseUp}>
                <div className={'table'}>
                    <Header/>
                    <Body></Body>
                    <Footer></Footer>
                </div>
            </div>
        </Provider>
    )
}

export default App
