import React ,{Component} from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxe/Auxilliary'

const witherrorHandler =(WrappingComponent,axios) =>{
    return class extends Component {
        state={
            error:null
        };
        errorConfirmationHandler=()=> {
            this.setState({error:null})
        }
        componentWillMount(){
            this.reqInterceptor= axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            })
            this.resInterceptor=axios.interceptors.response.use(null,error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.response);
        }

        render(){
            return (
                <Aux>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmationHandler}>
                {this.state.error?this.state.error.message:null}</Modal>
                <WrappingComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default witherrorHandler