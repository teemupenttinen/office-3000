import firebase from 'Firebase'
import config from './config'

firebase.initializeApp(config)


const state = {
    user: null,
    input: 0,
    displayState: 0,
    ipAddress: null,
    port: null
}

const mutations = {
    SET_USER: function (state, user) {
        state.user = user;
        console.log(state.user)
    },
    SET_INPUT: function (state, input) {
        state.input = input;
    },
    SET_DISPLAYSTATE: function (state, displayState) {
        state.displayState = displayState;
    },
    SET_SETTINGS: function (state, settings) {
        state.ipAddress = settings.ipAddress;
        state.port = settings.port;
    }
}

const actions = {

    login({ commit }, loginDetails) {
        firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password).then(user => {
            console.log("Logged in")
        }).catch(error => {
            console.log(error);
        })
    },

    initialize({ commit }) {
        let roomRef = firebase.database().ref('users/' + state.user.uid + '/room');
        roomRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            commit("SET_INPUT", snapshot.val().input);
            commit("SET_DISPLAYSTATE", snapshot.val().displayState);
            commit("SET_SETTINGS", { ipAddress: snapshot.val().ipAddress, port: snapshot.val().port })
        });
    },
    changeInput({ commit }, input) {
        commit("SET_INPUT", input);
        firebase.database().ref('users/' + state.user.uid + "/room").update({
            input: input,
        }).then((data) => {
            console.log("Input changed");
        });
    },
    changeDisplayState({ commit }, displayState) {
        commit("SET_DISPLAYSTATE", displayState);
        firebase.database().ref('users/' + state.user.uid + "/room").update({
            displayState: displayState,
        }).then((data) => {
            console.log("displayState changed");
        });
    },
    saveSettings({ commit }, settings) {
        firebase.database().ref('users/' + state.user.uid + "/room").update({
            ipAddress: settings.ipAddress,
            port: parseInt(settings.port),
        }).then((data) => {
            console.log("Settings saved");
        });
    },
}

const getters = {
    getUser(state) {
        return state.user;
    },
    getInput(state) {
        return state.input;
    },
    getDisplayState(state) {
        return state.displayState;
    },
    getIpAddress(state) {
        return state.ipAddress;
    },
    getPort(state) {
        return state.port;
    }

}

export default {
    mutations,
    state,
    actions,
    getters
} 
