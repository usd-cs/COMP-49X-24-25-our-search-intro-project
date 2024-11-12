package our_search.intro_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import our_search.intro_project.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
