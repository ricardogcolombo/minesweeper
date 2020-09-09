import React, {useReducer} from "react";

const initialState = {userData:null,startTimer:false,gameinfo:{id:null,time:0,size:null,mines:null,board:null}};

let reducer = (state, {type, payload}) => {
	switch (type) {
		case 'SET_USER':
			return { ...state, userData: payload.userData};
		case 'START_TIMER':
			return { ...state, startTimer: payload.startTimer};
        case 'SET_TIME':
			return { ...state, gameinfo: {...state.gameinfo,...payload.gameinfo}};
        case 'SET_GAMEINFO':
			return { ...state, gameinfo: payload.gameinfo};
		default:
			return;
	}
};

const StateContext = React.createContext(initialState);

function StateProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{props.children}
		</StateContext.Provider>
	);
}
export { StateContext, StateProvider };
