export interface IPostModel {
	posts: [] | [{ author: string; content: string; display_name: string; header: string; post_id: string }];
}
