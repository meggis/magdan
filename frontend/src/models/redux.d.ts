import { IPostModel } from './posts/post';

interface IRedux {
	success: boolean;
	user: IUserModel;
	authorization: IAuthorization;
	posts: IPostModel;
	post: IPostModel;
}
