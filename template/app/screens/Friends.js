import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Modal, TouchableWithoutFeedback } from 'react-native';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

import FriendList from '../containers/FriendList';
import AddFriendButton from '../components/AddFriendButton';
import AddFromContacts from '../components/AddFromContacts';
import AddGroupButton from '../components/AddGroupButton';

class Friends extends Component {

    constructor(){
        super();
        this.state = {
            isVisible:false
        }
    }

    toggleModal() {
        this.setState({isVisible:!this.state.isVisible})
    }

    render() {
        return (
            <View style={styles.main}>
                <FriendList  uid={this.props.user.uid}/>
                <AddFriendButton navigation={this.props.navigation} action={this.toggleModal.bind(this)}/>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType='fade'
                >
                    <TouchableWithoutFeedback onPress={() => this.toggleModal()}>
                        <View style={styles.modal}>
                        <AddGroupButton navigation={this.props.navigation} action={this.toggleModal.bind(this)}/>
                        <AddFromContacts />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}

export default connect(store => ({
    user: store.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
  )(Friends);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
    },
    modal: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'rgba(256,256,256,.9)'
    },
    groupButton: {
        bottom:100,
        right:20,
        position:'absolute'
    }
});