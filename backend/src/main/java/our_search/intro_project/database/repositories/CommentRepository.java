package our_search.intro_project.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import our_search.intro_project.database.entities.Comment;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPostId(Integer postId);
}
