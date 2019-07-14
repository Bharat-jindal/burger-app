import React ,{Component} from 'react';
import Aux from '../Auxe/Auxilliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

class Layout extends Component {
    state= {
        show: false
    }

    SideDrawerHide= () => {
        this.setState({show:false});
    }

    SideDrawerShown= () => {
        this.setState((prevState) => {
            return ({show: !prevState.show})
        });
    }

    render() {
        return (
        <Aux>
            <SideDrawer show={this.state.show}
            clicked={this.SideDrawerHide}
            isAuth={this.props.isAuthenticated}/>
            <Toolbar 
            clicked={this.SideDrawerShown}
            isAuth={this.props.isAuthenticated}/>
            <main className='container'>
                {this.props.children}
            </main>
            </Aux>

        )
    }   
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);
