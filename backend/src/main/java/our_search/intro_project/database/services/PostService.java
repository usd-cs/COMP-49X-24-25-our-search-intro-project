package our_search.intro_project.database.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.repositories.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
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

    public boolean deletePost(Integer id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
