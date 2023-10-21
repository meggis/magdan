import { IPostModel } from './posts/post';

interface IRedux {
	user: IUserModel;
	authorization: IAuthorization;
	posts: IPostModel;
}
