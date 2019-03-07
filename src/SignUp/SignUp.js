import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Notifications, {notify} from 'react-notify-toast';
import { connect } from 'react-redux';
import classes from './SignUp.module.css';
import firebase from '../firebase';
import Modal from '../UI/Modal/Modal';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.user = firebase.firestore()
        this.userName = '';
        this.password = '';
        this.Confirmpassword = '';
        this.unsubscribe = null;
        this.state = {
            email: '',
            searchUser: false,
            userNames: [],
            showMessage: false,
            confrmpassword : '',
            password : ''
        };
    }

    componentDidMount() {
        console.log(this.props.email, 'email');
        let singleUser = []
        this.user.collection('Users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let items = doc.data();
                singleUser.push(items);
            });
            this.setState({
                userNames: singleUser
            })
        });
    }



    checkUserNamehandler = () => {
        this.setState({
            searchUser: true
        })
    }

    closeUserNamePopUp = () => {
        this.setState({
            searchUser: false
        })
    }

    getUserName = (event) => {
        const userNames = this.state.userNames;
        const filteredUserNames = userNames.filter((userName) => {
            if(userName.Username){
                if ( userName.Username.includes(event.target.value)) {
                    return userName;
                }
            }
            
        });
        if (filteredUserNames && filteredUserNames.length == 0) {
            this.userName = event.target.value;
            this.setState({
                showMessage: true
            })
        }
        else {
            this.setState({
                showMessage: false
            })
        }
    }

    setUserName = () => {
        if (this.userName !== '') {
            this.setState({
                email: this.userName

            })
            this.closeUserNamePopUp()
        }

    }
    setPassword = (event) => {
        this.password = event.target.value;
        this.setState({
            password : event.target.value
        })

    }

    setConfirmPassword = (event) => {
        this.Confirmpassword = event.target.value;
        this.setState({
            confrmpassword : event.target.value
        })
    }
    onSubmitHandler = () => {
        
        if(this.userName !== '' && this.password !== '' &&  this.Confirmpassword !== ''){

       const userSaved = this.user.collection('Users').add({
                Password : this.password,
                 Username : this.userName
            });
            userSaved.then(() => {
                console.log('saved');
                const myColor = { backgroundColor: 'red', color: "#FFFFFF" };
                notify.show('User Account has been created succesfully', myColor);
                this.onCancelHandler()
            })
        }
        else{
            notify.show('USer name password and confirm password can not be empty'); 
        }

        // if(this.password !== this.confrmpassword){
        //     notify.show('Password does not match'); 
        // }
        
    }

    onCancelHandler = () =>{
        this.setState({
            email: '',
            confrmpassword : '',
            password : ''
        })
    }
    render() {

        const singleuser = this.state.userNames.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.Username}</td>

                </tr>
            )
        })

        return (
            <div>
                <form>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" disabled={'disabled'} value={this.state.email} placeholder="User Name" />
                            <span className={"input-group-addon" + ' ' + classes.searchIcon} onClick={this.checkUserNamehandler}>
                                <i className="fa fa-search" ></i>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="pwd" placeholder="Password" value={this.state.password} onChange={this.setPassword} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="confrmpwd" placeholder="Confirm Password"  value={this.state.confrmpassword} onChange={this.setConfirmPassword} />
                    </div>
                    
                    <div>
                        <button type="button" className={'btn' + ' ' + classes.submitbutton + ' ' + classes.marginButton} onClick={this.onSubmitHandler}>Submit</button>
                        <button type="button" className={'btn' + ' ' + classes.submitbutton} onClick={this.onCancelHandler}>Cancel</button>
                    </div>
                </form>
                <Modal show={this.state.searchUser}>
                    <i className={"fa fa-times" + ' ' + classes.closeIcon} aria-hidden="true" onClick={this.closeUserNamePopUp}></i>
                    <div className={classes.searhctxtBox}>
                        <label htmlFor="search">UserName</label>
                        <input type="text" className="form-control" id="search" onChange={this.getUserName} />
                    </div>
                    {this.state.showMessage ? <p className={classes.userNameMessage}>this is valid username</p> : ''}
                    <table className = {classes.tableHeight}>
                        <thead>
                            <tr>
                                <td>S No</td>
                                <td>User Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            {singleuser}
                        </tbody>


                    </table>
                    <button type="button" className={'btn' + ' ' + classes.submitbutton + ' ' + classes.marginButton} onClick={this.closeUserNamePopUp}>Cancel</button>
                    <button type="button" className={'btn' + ' ' + classes.submitbutton + ' ' + classes.marginButton} onClick={this.setUserName}>Ok</button>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { email: state.email }
}

const mapDispatchToProps = (dispatch) => {
    return {

        incrementSample: () => dispatch({ type: 'INCREMENT', payload: { value: 'Ayush' } })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);