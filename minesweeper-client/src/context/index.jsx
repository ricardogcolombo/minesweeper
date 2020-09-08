import React, {useReducer} from "react";

const initialState = {tokenId:null,gameinfo:{id:null,size:null,mines:null,board:null}};

let reducer = (state, {type, payload}) => {
    console.log({payload,type});

	switch (type) {
		case 'SET_USER':
			return { ...state, tokenId: payload.tokenId};
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
