import { combineReducers } from 'redux';
import { userReducer } from '../../features/user/slice';
import { authReducer } from '../../features/authorization/slice';
import { postReducer } from '../../features/posts/slice';

const rootReducer = combineReducers({
	user: userReducer,
	authorization: authReducer,
	posts: postReducer,
});

export default rootReducer;
