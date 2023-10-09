import { combineEpics } from 'redux-observable';
import { authEpics } from '../../features/authorization/epics';
import { postsEpics } from '../../features/posts/epics';

export default combineEpics(authEpics, postsEpics);
