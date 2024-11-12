package our_search.intro_project.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import our_search.intro_project.database.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
