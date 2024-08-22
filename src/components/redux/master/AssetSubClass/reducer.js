import { GET_ASSET_SUBCLASS } from '../../actionType';

const INIT_STATE = {
    AssetSubClass: []
};

    export default (state = INIT_STATE, action) => {
        switch (action.type) {
        case GET_ASSET_SUBCLASS:
            return { ...state, AssetSubClass: action.payload };
        default:
            return state;
        }
    };