export interface IPostsModel {
	posts: Array<{ author: string; content: string; display_name: string; header: string; post_id: string; created_at: Date }>;
	loadingPosts: boolean;
	loadingPost: boolean;
	post: {};
	success: boolean;
}
