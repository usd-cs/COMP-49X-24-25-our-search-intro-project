package our_search.intro_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import our_search.intro_project.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
