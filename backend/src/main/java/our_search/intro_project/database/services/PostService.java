package our_search.intro_project.database.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.repositories.CommentRepository;
import our_search.intro_project.database.repositories.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Optional<Post> updatePost(Integer id, Post updatedPost) {
        return postRepository.findById(id).map(post -> {
            post.setContents(updatedPost.getContents());
            post.setUser(updatedPost.getUser());
            return postRepository.save(post);
        });
    }

    @Transactional
    public boolean deletePost(Integer id) {
        if (postRepository.existsById(id)) {
            commentRepository.deleteByPostId(id);
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
