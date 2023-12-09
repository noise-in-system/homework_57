import './App.css'
import {Header} from "./comp/Header";
import Body from "./comp/Body";
import Footer from "./comp/Footer";
import {Provider} from 'react-redux';
import store from './store/store';
import {OUTSIDE_MOUSE_UP} from "./actions/actions";


function App() {
    const onMouseUp = () => {
        if (store.getState().isSelecting &&
            store.getState().lastEnterRow !== -1 &&
            store.getState().lastEnterColumn !== -1
        ) {
            console.log('top up', store.getState().lastEnterRow, store.getState().lastEnterColumn)

            store.dispatch({type: OUTSIDE_MOUSE_UP})
        }
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
