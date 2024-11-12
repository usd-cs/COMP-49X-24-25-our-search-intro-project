package our_search.intro_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import our_search.intro_project.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
