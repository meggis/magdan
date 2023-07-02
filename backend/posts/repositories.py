
from posts.models import PostModel

class PostsRepository:
    def get_post_by_id(self, post_id: str):
        return (
            PostModel.objects.get(
                post_id=post_id
            )
        )
    
    def get_all_posts(self):
        return PostModel.objects.all()